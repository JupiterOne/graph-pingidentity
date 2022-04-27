import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { PingOneRole } from '../../types';

import { Entities } from '../constants';

export function createRoleKey(id: string): string {
  return `pingone_role:${id}`;
}

export function createRoleEntity(role: PingOneRole): Entity {
  return createIntegrationEntity({
    entityData: {
      source: role,
      assign: {
        _type: Entities.ROLE._type,
        _class: Entities.ROLE._class,
        _key: createRoleKey(role.id),
        id: role.id,
        name: role.name,
        description: role.description,
        applicableTo: role.applicableTo,
        webLink: role._links.self.href,
      },
    },
  });
}
