import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { PingOneEnvironment } from '../../types';

import { Entities } from '../constants';

export function createAccountEntity(environment: PingOneEnvironment): Entity {
  return createIntegrationEntity({
    entityData: {
      source: environment,
      assign: {
        _key: `pingone_account:${environment.id}`,
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        id: environment.id,
        name: environment.name,
        description: environment.description,
        organizationId: environment.organization.id,
        type: environment.type,
        region: environment.region,
        createdOn: parseTimePropertyValue(environment.createdAt),
        updatedOn: parseTimePropertyValue(environment.updatedAt),
        licenseId: environment.license.id,
        webLink: environment._links.self.href,
      },
    },
  });
}
