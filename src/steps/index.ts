import { accountSteps } from './account';
import { userSteps } from './user';
import { groupSteps } from './group';
import { roleSteps } from './role';
import { applicationSteps } from './application';

const integrationSteps = [
  ...accountSteps,
  ...userSteps,
  ...groupSteps,
  ...roleSteps,
  ...applicationSteps,
];

export { integrationSteps };
