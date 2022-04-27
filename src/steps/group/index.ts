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
import { createUserKey } from '../user/converter';
import { createGroupEntity, createGroupKey } from './converter';

export async function fetchGroups({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  const accountEntity = (await jobState.getData(ACCOUNT_ENTITY_KEY)) as Entity;

  await apiClient.iterateGroups(async (group) => {
    const groupEntity = await jobState.addEntity(createGroupEntity(group));

    await jobState.addRelationship(
      createDirectRelationship({
        _class: RelationshipClass.HAS,
        from: accountEntity,
        to: groupEntity,
      }),
    );
  });
}

export async function buildGroupUserRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.GROUP._type },
    async (groupEntity) => {
      await apiClient.iterateUsers(async (user) => {
        const userEntity = await jobState.findEntity(createUserKey(user.id));

        if (userEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: groupEntity,
              to: userEntity,
            }),
          );
        }
      }, `filter=memberOfGroups[id eq "${groupEntity.id}" and type eq "DIRECT"]`);
    },
  );
}

export async function buildGroupGroupRelationship({
  instance,
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const apiClient = createAPIClient(instance.config);

  await jobState.iterateEntities(
    { _type: Entities.GROUP._type },
    async (parentGroupEntity) => {
      await apiClient.iterateGroups(async (group) => {
        const childGroupEntity = await jobState.findEntity(
          createGroupKey(group.id),
        );

        if (childGroupEntity) {
          await jobState.addRelationship(
            createDirectRelationship({
              _class: RelationshipClass.HAS,
              from: parentGroupEntity,
              to: childGroupEntity,
            }),
          );
        }
      }, `filter=memberOfGroups[id eq "${parentGroupEntity.id}" and type eq "DIRECT"]`);
    },
  );
}

export const groupSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.GROUPS,
    name: 'Fetch Groups',
    entities: [Entities.GROUP],
    relationships: [Relationships.ACCOUNT_HAS_GROUP],
    dependsOn: [Steps.ACCOUNT],
    executionHandler: fetchGroups,
  },
  {
    id: Steps.GROUP_USER_RELATIONSHIPS,
    name: 'Build Group and User Relationships',
    entities: [],
    relationships: [Relationships.GROUP_HAS_USER],
    dependsOn: [Steps.GROUPS, Steps.USERS],
    executionHandler: buildGroupUserRelationship,
  },
  {
    id: Steps.GROUP_GROUP_RELATIONSHIPS,
    name: 'Build Group and Group Relationships',
    entities: [],
    relationships: [Relationships.GROUP_HAS_GROUP],
    dependsOn: [Steps.GROUPS],
    executionHandler: buildGroupGroupRelationship,
  },
];
