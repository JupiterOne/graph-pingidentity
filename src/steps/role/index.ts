import {
  createDirectRelationship,
  Entity,
  IntegrationStep,
  IntegrationStepExecutionContext,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { createAPIClient } from '../../client';
import { IntegrationConfig } from '../../config';
import { ACCOUNT_ENTITY_KEY } from '../account';
import { Entities, Steps, Relationships } from '../constants';
import { createRoleEntity, createRoleKey } from './converter';

export async function fetchRoles({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateRoles(async (role) => {
    const roleEntity = await jobState.addEntity(createRoleEntity(role));

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: roleEntity,
      }),
    );
  });
}

export async function buildUserRoleRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.USER._type },
    async (userEntity) => {
      const roleAssignmentResponse = await apiClient.getUserRoleAssignment(
        userEntity.id as string,
      );

      for (const roleAssignment of roleAssignmentResponse._embedded
        .roleAssignments) {
        const roleEntity = await jobState.findEntity(
          createRoleKey(roleAssignment.role.id),
        );

        if (roleEntity) {
          const relationship = createDirectRelationship({
            _class: RelationshipClass.ASSIGNED,
            from: userEntity,
            to: roleEntity,
          });

          // Check for duplicates
          if (!jobState.hasKey(relationship._key)) {
            await jobState.addRelationship(relationship);
          }
        }
      }
    },
  );
}

export async function buildApplicationRoleRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.APPLICATION._type },
    async (applicationEntity) => {
      if (
        ![
          'PING_ONE_ADMIN_CONSOLE',
          'PING_ONE_PORTAL',
          'PING_ONE_SELF_SERVICE',
        ].includes(applicationEntity.type as string)
      ) {
        const roleAssignmentResponse =
          await apiClient.getApplicationRoleAssignment(
            applicationEntity.id as string,
          );

        for (const roleAssignment of roleAssignmentResponse._embedded
          .roleAssignments) {
          const roleEntity = await jobState.findEntity(
            createRoleKey(roleAssignment.role.id),
          );

          if (roleEntity) {
            const relationship = createDirectRelationship({
              _class: RelationshipClass.ASSIGNED,
              from: applicationEntity,
              to: roleEntity,
            });

            // Check for duplicates
            if (!jobState.hasKey(relationship._key)) {
              await jobState.addRelationship(relationship);
            }
          }
        }
      }
    },
  );
}

export const roleSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.ROLES,
    name: 'Fetch Roles',
    entities: [Entities.ROLE],
    relationships: [Relationships.ACCOUNT_HAS_ROLE],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchRoles,
  },
  {
    id: Steps.USER_ROLE_RELATIONSHIPS,
    name: 'Build User and Roles Relationships',
    entities: [],
    relationships: [Relationships.USER_ASSIGNED_ROLE],
    dependsOn: [Steps.USERS, Steps.ROLES],
    executionHandler: buildUserRoleRelationship,
  },
  {
    id: Steps.APPLICATION_ROLE_RELATIONSHIPS,
    name: 'Build Application and Roles Relationships',
    entities: [],
    relationships: [Relationships.APPLICATION_ASSIGNED_ROLE],
    dependsOn: [Steps.APPLICATIONS, Steps.ROLES],
    executionHandler: buildApplicationRoleRelationship,
  },
];
