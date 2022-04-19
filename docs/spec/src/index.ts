import { IntegrationSpecConfig } from '@jupiterone/integration-sdk-core';

import { IntegrationConfig } from '../../../src/config';
import { accountSpec } from './account';
import { applicationSpec } from './application';
import { groupSpec } from './group';
import { roleSpec } from './role';
import { userSpec } from './user';

export const invocationConfig: IntegrationSpecConfig<IntegrationConfig> = {
  integrationSteps: [
    ...accountSpec,
    ...applicationSpec,
    ...groupSpec,
    ...roleSpec,
    ...userSpec,
  ],
};
