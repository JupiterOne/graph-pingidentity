import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { PingOneApplication } from '../../types';

import { Entities } from '../constants';

export function createApplicationKey(id: string): string {
  return `pingone_application:${id}`;
}

export function createApplicationEntity(
  application: PingOneApplication,
): Entity {
  return createIntegrationEntity({
    entityData: {
      source: application,
      assign: {
        _type: Entities.APPLICATION._type,
        _class: Entities.APPLICATION._class,
        _key: createApplicationKey(application.id),
        id: application.id,
        name: application.name,
        environmentId: application.environment.id,
        active: application.enabled,
        enabled: application.enabled,
        type: application.type,
        accessControlRoleType: application?.accessControl?.role.type,
        protocol: application.protocol,
        createdOn: parseTimePropertyValue(application.createdAt),
        updatedOn: parseTimePropertyValue(application.updatedAt),
        grantTypes: application.grantTypes,
        tokenEndpointAuthMethod: application.tokenEndpointAuthMethod,
        pkceEnforcement: application.pkceEnforcement,
        webLink: application._links.self.href,
      },
    },
  });
}
