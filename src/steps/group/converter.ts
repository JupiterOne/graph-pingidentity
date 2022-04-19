import {
  createIntegrationEntity,
  Entity,
  parseTimePropertyValue,
} from '@jupiterone/integration-sdk-core';
import { PingOneGroup } from '../../types';

import { Entities } from '../constants';

export function createGroupKey(id: string): string {
  return `pingone_group:${id}`;
}

export function createGroupEntity(group: PingOneGroup): Entity {
  return createIntegrationEntity({
    entityData: {
      source: group,
      assign: {
        _type: Entities.GROUP._type,
        _class: Entities.GROUP._class,
        _key: createGroupKey(group.id),
        id: group.id,
        environmentId: group.environment.id,
        name: group.name,
        directMemberCountsUsers: group.directMemberCounts.users,
        directMemberCountsGroups: group.directMemberCounts.groups,
        createdOn: parseTimePropertyValue(group.createdAt),
        updatedOn: parseTimePropertyValue(group.updatedAt),
        checkSum: group.checkSum,
        webLink: group._links.self.href,
      },
    },
  });
}
