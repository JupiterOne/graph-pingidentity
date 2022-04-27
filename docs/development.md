# Development

This integration focuses on [PingIdentity](https://www.pingidentity.com/en.html)
and is using
[PingOne API](https://apidocs.pingidentity.com/pingone/devguide/v1/api/) for
interacting with the PingIdentity resources.

## Provider account setup

### In Ping Identity

1. [Create an application connection](https://apidocs.pingidentity.com/pingone/devguide/v1/api/#create-an-application-connection)
   1. Click Connections.
   2. Click + Add Application.
   3. Select the Worker application type.
   4. Click Configure.
   5. Create the application profile by entering the following information:
      - Application name. A unique identifier for the application.
      - Description (optional). A brief characterization of the application.
      - Icon (optional). A pictorial representation of the application. Use a
        file up to 1MB in JPG, JPEG, GIF, or PNG format.
   6. Click Save and Close.
   7. The Applications page shows the new application. To view the application's
      access token, you must enable the new application:
   8. Click the Enable toggle switch at the right. The toggle switch shows green
      to indicate that the new application is enabled.
2. [Get an access token](https://apidocs.pingidentity.com/pingone/devguide/v1/api/#create-an-application-connection)
   1. Click the application's details icon (located to the right of the
      enable/disable button).
   2. Click the Configuration tab.
   3. Click Get Access Token.
   4. From the Access Token window, click Copy Access Token to copy the access
      token.
3. [Get your environment ID from the Admin Console](https://apidocs.pingidentity.com/pingone/devguide/v1/api/#:~:text=get%20your%20environment%20ID%20from%20the%20Admin%20Console)
   1. Click Settings.
   2. Click Environment.
   3. Click Properties.

## Permissions

The worker application must have READ permissions of the ingested resources
namely: USER, ROLES, GROUP, APPLICATION, and ENVIRONMENT.

## Authentication

Provide the `LOCATION`, `ACCESS_TOKEN`, and `ENV_ID` to the `.env`. You can use
[`.env.example`](../.env.example) as a reference.

The Access token will be used to authorize requests.
