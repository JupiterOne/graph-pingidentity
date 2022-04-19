import fetch, { Response } from 'node-fetch';

import {
  IntegrationProviderAPIError,
  IntegrationProviderAuthenticationError,
} from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from './config';

import { retry } from '@lifeomic/attempt';
import {
  PingOneApplication,
  PingOneEnvironment,
  PingOneGroup,
  PingOneRole,
  PingOneRoleAssignments,
  PingOneUser,
} from './types';

export type ResourceIteratee<T> = (each: T) => Promise<void> | void;

/**
 * An APIClient maintains authentication state and provides an interface to
 * third party data APIs.
 *
 * It is recommended that integrations wrap provider data APIs to provide a
 * place to handle error responses and implement common patterns for iterating
 * resources.
 */
export class APIClient {
  constructor(readonly config: IntegrationConfig) {}
  private limit = '100';
  private baseUri = `https://api.pingone.${this.config.location}/v1/`;
  private withBaseUri = (path: string) => `${this.baseUri}${path}`;
  private withEnvId = (path: string) =>
    `${this.baseUri}environments/${this.config.envId}/${path}`;

  private checkStatus = (response: Response) => {
    if (response.ok) {
      return response;
    } else {
      throw new IntegrationProviderAPIError(response);
    }
  };

  private async request(
    uri: string,
    method: 'GET' | 'HEAD' = 'GET',
  ): Promise<Response> {
    try {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${this.config.accessToken}`,
        },
      };

      // Handle rate-limiting
      const response = await retry(
        async () => {
          const res: Response = await fetch(uri, options);
          this.checkStatus(res);
          return res;
        },
        {
          delay: 5000,
          maxAttempts: 10,
          handleError: (err, context) => {
            if (
              err.statusCode !== 429 ||
              ([500, 502, 503].includes(err.statusCode) &&
                context.attemptNum > 1)
            )
              context.abort();
          },
        },
      );
      return response.json();
    } catch (err) {
      throw new IntegrationProviderAPIError({
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  private async paginatedRequest<T>(
    uri: string,
    resourceName: string,
    iteratee: ResourceIteratee<T>,
  ): Promise<void> {
    try {
      let next = null;
      do {
        const response = await this.request(next || uri, 'GET');

        for (const resource of response._embedded[resourceName])
          await iteratee(resource);
        next = response._links.next?.href;
      } while (next);
    } catch (err) {
      throw new IntegrationProviderAPIError({
        cause: new Error(err.message),
        endpoint: uri,
        status: err.statusCode,
        statusText: err.message,
      });
    }
  }

  public async verifyAuthentication(): Promise<void> {
    const uri = this.withBaseUri('environments/');
    try {
      await this.request(uri);
    } catch (err) {
      throw new IntegrationProviderAuthenticationError({
        cause: err,
        endpoint: uri,
        status: err.status,
        statusText: err.statusText,
      });
    }
  }

  /**
   * Fetches the environment resource in the provider.
   */
  public async getEnvironment(): Promise<PingOneEnvironment> {
    return this.request(this.withBaseUri(`environments/${this.config.envId}`));
  }

  /**
   * Iterates each user resource in the provider.
   *
   * @param iteratee receives each user to produce entities/relationships
   */
  public async iterateUsers(
    iteratee: ResourceIteratee<PingOneUser>,
    filter?: string,
  ): Promise<void> {
    await this.paginatedRequest(
      this.withEnvId(`users?limit=${this.limit}${filter ? `&${filter}` : ''}`),
      'users',
      iteratee,
    );
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each group to produce entities/relationships
   */
  public async iterateGroups(
    iteratee: ResourceIteratee<PingOneGroup>,
    filter?: string,
  ): Promise<void> {
    await this.paginatedRequest(
      this.withEnvId(`groups?limit=${this.limit}${filter ? `&${filter}` : ''}`),
      'groups',
      iteratee,
    );
  }

  /**
   * Iterates each role resource in the provider.
   *
   * @param iteratee receives each role to produce entities/relationships
   */
  public async iterateRoles(
    iteratee: ResourceIteratee<PingOneRole>,
  ): Promise<void> {
    await this.paginatedRequest(
      this.withBaseUri(`roles?limit=${this.limit}`),
      'roles',
      iteratee,
    );
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async getUserRoleAssignment(
    userId: string,
  ): Promise<PingOneRoleAssignments> {
    return this.request(this.withEnvId(`users/${userId}/roleAssignments`));
  }

  /**
   * Iterates each group resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async getApplicationRoleAssignment(
    applicationId: string,
  ): Promise<PingOneRoleAssignments> {
    return this.request(
      this.withEnvId(`applications/${applicationId}/roleAssignments`),
    );
  }

  /**
   * Iterates each application resource in the provider.
   *
   * @param iteratee receives each resource to produce entities/relationships
   */
  public async iterateApplications(
    iteratee: ResourceIteratee<PingOneApplication>,
  ): Promise<void> {
    await this.paginatedRequest(
      this.withEnvId(`applications?limit=${this.limit}`),
      'applications',
      iteratee,
    );
  }
}

export function createAPIClient(config: IntegrationConfig): APIClient {
  return new APIClient(config);
}
