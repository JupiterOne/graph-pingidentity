import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const applicationSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/applications
     * PATTERN: Fetch Entities
     */
    id: 'fetch-applications',
    name: 'Fetch Applications',
    entities: [
      {
        resourceName: 'Application',
        _type: 'pingone_application',
        _class: ['Application'],
      },
    ],
    relationships: [
      {
        _type: 'pingone_account_has_application',
        sourceType: 'pingone_account',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_application',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
];
