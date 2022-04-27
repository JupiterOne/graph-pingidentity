import { RelationshipClass, StepSpec } from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../../../src/config';

export const roleSpec: StepSpec<IntegrationConfig>[] = [
  {
    /**
     * ENDPOINT: {{apiPath}}/roles
     * PATTERN: Fetch Entities
     */
    id: 'fetch-roles',
    name: 'Fetch Roles',
    entities: [
      {
        resourceName: 'Role',
        _type: 'pingone_role',
        _class: ['AccessRole'],
      },
    ],
    relationships: [
      {
        _type: 'pingone_account_has_role',
        sourceType: 'pingone_account',
        _class: RelationshipClass.HAS,
        targetType: 'pingone_role',
      },
    ],
    dependsOn: ['fetch-account'],
    implemented: true,
  },
  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/users/{{userId}}/roleAssignments
     * PATTERN: Build Child Relationships
     */
    id: 'build-user-role-relationships',
    name: 'Build User and Roles Relationships',
    entities: [],
    relationships: [
      {
        _type: 'pingone_user_assigned_role',
        sourceType: 'pingone_user',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'pingone_role',
      },
    ],
    dependsOn: ['fetch-users', 'fetch-roles'],
    implemented: true,
  },

  {
    /**
     * ENDPOINT: {{apiPath}}/environments/{{envId}}/applications/{{applicationId}}/roleAssignments
     * PATTERN: Build Child Relationships
     */
    id: 'build-application-role-relationships',
    name: 'Build Application and Roles Relationships',
    entities: [],
    relationships: [
      {
        _type: 'pingone_application_assigned_role',
        sourceType: 'pingone_application',
        _class: RelationshipClass.ASSIGNED,
        targetType: 'pingone_role',
      },
    ],
    dependsOn: ['fetch-applications', 'fetch-roles'],
    implemented: true,
  },
];
