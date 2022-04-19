import {
  createIntegrationEntity,
  Entity,
} from '@jupiterone/integration-sdk-core';
import { PingOneUser } from '../../types';

import { Entities } from '../constants';

export function createUserKey(id: string): string {
  return `pingone_user:${id}`;
}

export function createUserEntity(user: PingOneUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        _key: createUserKey(user.id),
        id: user.id,
        environmentId: user.environment.id,
        accountCanAuthenticate: user.account.canAuthenticate,
        accountStatus: user.account.status,
        createdAt: user.createdAt,
        email: user.email,
        enabled: user.enabled,
        identityProviderType: user.identityProvider.type,
        lastSignOnAt: user.lastSignOn?.at,
        lastSignOnRemoteIp: user.lastSignOn?.remoteIp,
        lifecycleStatus: user.lifecycle.status,
        mfaEnabled: user.mfaEnabled,
        nameGiven: user.name.given,
        nameFamily: user.name.family,
        populationId: user.population.id,
        updatedAt: user.updatedAt,
        username: user.username,
        verifyStatus: user.verifyStatus,
        active: user.enabled,
        name: `${user.name.given} ${user.name.family}`,
        webLink: user._links.self.href,
      },
    },
  });
}
