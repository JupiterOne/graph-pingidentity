import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const groupSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/groups
     * PATTERN: Fetch Entities
     */
    id: 'fetch-groups',
    name: 'Fetch Groups',
    entities: [
      {
        resourceName: 'UserGroup',
        _type: 'pingone_group',
        _class: ['UserGroup'],
      },
    ],
    relationships: [
      {
        _type: 'pingone_account_has_group',
        sourceType: 'pingone_account',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_group',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/users
     * PATTERN: Build Child Relationships
     */
    id: 'build-user-group-relationships',
    name: 'Build Group and User Relationships',
    entities: [],
    relationships: [
      {
        _type: 'pingone_group_has_user',
        sourceType: 'pingone_group',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_user',
      },
    ],
    dependsOn: ['fetch-groups', 'fetch-users'],
    implemented: true,
  },

  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/users
     * PATTERN: Build Child Relationships
     */
    id: 'build-group-group-relationships',
    name: 'Build Group and Group Relationships',
    entities: [],
    relationships: [
      {
        _type: 'pingone_group_has_group',
        sourceType: 'pingone_group',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_group',
      },
    ],
    dependsOn: ['fetch-groups'],
    implemented: true,
  },
];
