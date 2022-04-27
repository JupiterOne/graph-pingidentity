export type PingOneUser = {
  _links: {
    self: {
      href: string;
    };
    password: {
      href: string;
    };
    'password.set': {
      href: string;
    };
    'password.reset': {
      href: string;
    };
    'password.check': {
      href: string;
    };
    'password.recover': {
      href: string;
    };
    'account.sendVerificationCode': {
      href: string;
    };
    linkedAccounts: {
      href: string;
    };
  };
  id: string;
  environment: {
    id: string;
  };
  account: {
    canAuthenticate: boolean;
    status: string;
  };
  createdAt: string;
  email: string;
  enabled: boolean;
  identityProvider: {
    type: string;
  };
  lastSignOn: {
    at: string;
    remoteIp: string;
  };
  lifecycle: {
    status: string;
  };
  mfaEnabled: boolean;
  name: {
    given: string;
    family: string;
  };
  population: {
    id: string;
  };
  updatedAt: string;
  username: string;
  verifyStatus: string;
};

export type PingOneEnvironment = {
  _links: {
    self: {
      href: string;
    };
    organization: {
      href: string;
    };
    license: {
      href: string;
    };
    populations: {
      href: string;
    };
    users: {
      href: string;
    };
    applications: {
      href: string;
    };
    activities: {
      href: string;
    };
    branding: {
      href: string;
    };
    resources: {
      href: string;
    };
    passwordPolicies: {
      href: string;
    };
    userActivities: {
      href: string;
    };
    signOnPolicies: {
      href: string;
    };
    keys: {
      href: string;
    };
    templates: {
      href: string;
    };
    notificationsSettings: {
      href: string;
    };
    schemas: {
      href: string;
    };
    gateways: {
      href: string;
    };
    capabilities: {
      href: string;
    };
    activeIdentityCounts: {
      href: string;
    };
    'propagation/plans': {
      href: string;
    };
    'propagation/stores': {
      href: string;
    };
    'propagation/revisions/id:latest': {
      href: string;
    };
    billOfMaterials: {
      href: string;
    };
  };
  id: string;
  name: string;
  description: string;
  organization: {
    id: string;
  };
  type: string;
  region: string;
  createdAt: string;
  updatedAt: string;
  license: {
    id: string;
  };
};

export type PingOneApplication = {
  _links: {
    grants: {
      href: string;
    };
    environment: {
      href: string;
    };
    self: {
      href: string;
    };
    attributes: {
      href: string;
    };
    secret: {
      href: string;
    };
    roleAssignments: {
      href: string;
    };
  };
  environment: {
    id: string;
  };
  id: string;
  name: string;
  enabled: boolean;
  type: string;
  accessControl: {
    role: {
      type: string;
    };
  };
  protocol: string;
  createdAt: string;
  updatedAt: string;
  grantTypes: string[];
  tokenEndpointAuthMethod: string;
  pkceEnforcement: string;
};

export type PingOneGroup = {
  _links: {
    self: {
      href: string;
    };
  };
  id: string;
  environment: {
    id: string;
  };
  name: string;
  directMemberCounts: {
    users: number;
    groups: number;
  };
  createdAt: string;
  updatedAt: string;
  checkSum: string;
};

export type PingOneRole = {
  _links: {
    self: {
      href: string;
    };
  };
  id: string;
  name: string;
  description: string;
  applicableTo: string[];
  permissions: { classifier: string; description: string }[];
};

export type PingOneRoleAssignments = {
  _links: {
    self: {
      href: string;
    };
    user: {
      href: string;
    };
    environment: {
      href: string;
    };
  };
  _embedded: {
    roleAssignments: {
      _links: {
        self: {
          href: string;
        };
        user: {
          href: string;
        };
        environment: {
          href: string;
        };
      };
      id: string;
      scope: {
        id: string;
        type: string;
      };
      role: {
        id: string;
      };
      environment: {
        id: string;
      };
      readOnly: boolean;
      user: {
        id: string;
      };
    }[];
  };
  count: 8;
  size: 8;
};
