import {
  RelationshipClass,
  StepEntityMetadata,
  StepRelationshipMetadata,
} from '@jupiterone/integration-sdk-core';

export const Steps = {
  ACCOUNT: 'fetch-account',
  USERS: 'fetch-users',
  APPLICATIONS: 'fetch-applications',
  GROUPS: 'fetch-groups',
  ROLES: 'fetch-roles',
  USER_ROLE_RELATIONSHIPS: 'build-user-role-relationships',
  APPLICATION_ROLE_RELATIONSHIPS: 'build-application-role-relationships',
  GROUP_USER_RELATIONSHIPS: 'build-user-group-relationships',
  GROUP_GROUP_RELATIONSHIPS: 'build-group-group-relationships',
};

export const Entities: Record<
  'ACCOUNT' | 'GROUP' | 'USER' | 'APPLICATION' | 'ROLE',
  StepEntityMetadata
> = {
  ACCOUNT: {
    resourceName: 'Account',
    _type: 'pingone_account',
    _class: ['Account'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        organizationId: { type: 'string' },
        type: { type: 'string' },
        region: { type: 'string' },
        createdOn: { type: 'number' },
        updatedOn: { type: 'number' },
        licenseId: { type: 'string' },
        webLink: { type: 'string' },
      },
    },
  },
  GROUP: {
    resourceName: 'UserGroup',
    _type: 'pingone_group',
    _class: ['UserGroup'],
    schema: {
      properties: {
        id: { type: 'string' },
        environmentId: { type: 'string' },
        name: { type: 'string' },
        directMemberCountsUsers: { type: 'number' },
        directMemberCountsGroups: { type: 'number' },
        createdOn: { type: 'number' },
        updatedOn: { type: 'number' },
        checkSum: { type: 'string' },
        webLink: { type: 'string' },
      },
    },
  },
  ROLE: {
    resourceName: 'Role',
    _type: 'pingone_role',
    _class: ['AccessRole'],
    schema: {
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        description: { type: 'string' },
        applicableTo: { type: 'array', items: { type: 'string' } },
        webLink: { type: 'string' },
      },
    },
  },
  USER: {
    resourceName: 'User',
    _type: 'pingone_user',
    _class: ['User'],
    schema: {
      properties: {
        id: { type: 'string' },
        environmentId: { type: 'string' },
        accountCanAuthenticate: { type: 'boolean' },
        accountStatus: { type: 'string' },
        createdAt: { type: 'string' },
        email: { type: 'string' },
        enabled: { type: 'boolean' },
        identityProviderType: { type: 'string' },
        lastSignOnAt: { type: 'string' },
        lastSignOnRemoteIp: { type: 'string' },
        lifecycleStatus: { type: 'string' },
        mfaEnabled: { type: 'boolean' },
        nameGiven: { type: 'string' },
        nameFamily: { type: 'string' },
        populationId: { type: 'string' },
        updatedAt: { type: 'string' },
        username: { type: 'string' },
        verifyStatus: { type: 'string' },
        active: { type: 'boolean' },
        name: { type: 'string' },
        webLink: { type: 'string' },
      },
      required: ['username', 'active', 'name'],
    },
  },
  APPLICATION: {
    resourceName: 'Application',
    _type: 'pingone_application',
    _class: ['Application'],
    schema: {
      properties: {
        id: { type: 'string' },
        environmentId: { type: 'string' },
        enabled: { type: 'boolean' },
        active: { type: 'boolean' },
        type: { type: 'string' },
        accessControlRoleType: { type: 'string' },
        protocol: { type: 'string' },
        createdOn: { type: 'number' },
        updatedOn: { type: 'number' },
        grantTypes: { type: 'array', items: { type: 'string' } },
        tokenEndpointAuthMethod: { type: 'string' },
        pkceEnforcement: { type: 'string' },
        webLink: { type: 'string' },
      },
    },
  },
};

export const Relationships: Record<
  | 'ACCOUNT_HAS_USER'
  | 'ACCOUNT_HAS_GROUP'
  | 'ACCOUNT_HAS_ROLE'
  | 'USER_ASSIGNED_ROLE'
  | 'APPLICATION_ASSIGNED_ROLE'
  | 'GROUP_HAS_USER'
  | 'GROUP_HAS_GROUP'
  | 'ACCOUNT_HAS_APPLICATION',
  StepRelationshipMetadata
> = {
  ACCOUNT_HAS_USER: {
    _type: 'pingone_account_has_user',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  ACCOUNT_HAS_GROUP: {
    _type: 'pingone_account_has_group',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  ACCOUNT_HAS_ROLE: {
    _type: 'pingone_account_has_role',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.ROLE._type,
  },
  ACCOUNT_HAS_APPLICATION: {
    _type: 'pingone_account_has_application',
    sourceType: Entities.ACCOUNT._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.APPLICATION._type,
  },
  GROUP_HAS_USER: {
    _type: 'pingone_group_has_user',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.USER._type,
  },
  GROUP_HAS_GROUP: {
    _type: 'pingone_group_has_group',
    sourceType: Entities.GROUP._type,
    _class: RelationshipClass.HAS,
    targetType: Entities.GROUP._type,
  },
  USER_ASSIGNED_ROLE: {
    _type: 'pingone_user_assigned_role',
    sourceType: Entities.USER._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ROLE._type,
  },
  APPLICATION_ASSIGNED_ROLE: {
    _type: 'pingone_application_assigned_role',
    sourceType: Entities.APPLICATION._type,
    _class: RelationshipClass.ASSIGNED,
    targetType: Entities.ROLE._type,
  },
};
