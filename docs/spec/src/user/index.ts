import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const userSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/users
     * PATTERN: Fetch Entities
     */
    id: 'fetch-users',
    name: 'Fetch Users',
    entities: [
      {
        resourceName: 'User',
        _type: 'pingone_user',
        _class: ['User'],
      },
    ],
    relationships: [
      {
        _type: 'pingone_account_has_user',
        sourceType: 'pingone_account',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_user',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
