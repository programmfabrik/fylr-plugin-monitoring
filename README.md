> This Plugin / Repo is being maintained by a community of developers.
There is no warranty given or bug fixing guarantee; especially not by
Programmfabrik GmbH. Please use the github issue tracking to report bugs
and self organize bug fixing. Feel free to directly contact the committing
developers.

# fylr-plugin-monitoring
Custom monitoring-endpoint for fylr-API

The plugin provides a new API endpoint under "GET /api/v1/plugin/base/monitoring/monitoring".

You have to call this endpoint with a user that has been assigned the associated "Allow Monitoring-Endpoint" system right.

The user token has to be passed in the "X-Fylr-Authorization" header as usual.

Hint: The "validation"-section checks configuration of https://github.com/programmfabrik/fylr-plugin-custom-vzg-validationhub

## installation

The latest version of this plugin can be found [here](https://github.com/programmfabrik/fylr-plugin-monitoring/releases/latest/download/monitoringEndpoint.zip).

The ZIP can be downloaded and installed using the plugin manager, or used directly (recommended).

Github has an overview page to get a list of [all release](https://github.com/programmfabrik/fylr-plugin-monitoring/releases/).

## configuration

* baseconfig
  * enable (true|false)
  * sensibility: Show license-dates in response? (true|false)
  * weeks before escalation (int). Configures how many weeks before the license expires, "response.license.escalate" should be set to "true".
* systemright
  * assign new systemright "monitoring_endpoint" to user and allow thereby usage of this custom endpoint

# example

```
X-Fylr-Authorization: Bearer ory_at__koe72_qYqjqi2C6AHYhiDLFjpWl4Cf_EbDVq399eCU.XtkKitMB3o7U1dhebX6WuK9123EkQ3W77zQeFTKPTAc

GET https://example.fylr.io/api/v1/plugin/base/monitoring-endpoint/monitoring"
```

Result is as usual "application/json" and has the following structure
```
{
  "email": {
    "notifications": "true",
    "email_server": "mailer.example.de:25",
    "adminEmails": [
      "r*a*a*.*e*m*@*c*.*a",
      "a*d*e*@*.*d"
    ]
  },
  "janitorActive": "false",
  "logLevel": "debug",
  "purge": {
    "allowPurge": "false",
    "allowPurgeStorage": "false"
  },
  "objectstore": "-",
  "license": {
    "licenseActive": "false",
    "licenseCreatedAt": "2023-06-15T12:45:13+02:00",
    "licenseValidTo": "2024-06-15T12:45:13+02:00",
    "escalate": false
  },
  "plugins": [
    "custom-data-type-example",
    "custom-favicon",
    "custom-vzg-validationhub",
    "default-values-from-pool",
    "easydb-wordpress-plugin",
    "find-duplicate-field-values",
    "fylr_example",
    "monitoring-endpoint",
    "pdf-creator"
  ],
  "pendingSchemaCommits": false,
  "validation": {
    "validationEnabled": true,
    "tagFilterValid": true,
    "objecttypeFilterValid": true
  },
  "name": "8aa5f869-1111-41bc-aaaa-74a4b34616ef",
  "config_name": "fylr",
  "startup_time": "2023-06-26T12:57:55Z",
  "version": "v6.5.0",
  "build_commit": "46af7253a58c79244ee48145eb4f7e0f26880c61",
  "build_commit_time": "2023-06-20T18:58:36Z",
  "statistics": {
    "user": 8,
    "group": 12,
    "pool": 6,
    "objecttypes": {
      "test": 1,
      "hello": 1,
      "defaultvalues": 5,
      "bounce": 10,
      "here": 10,
      "object": 1,
      "wordpress": 10
    }
  }
}

```

## sources

The source code of this plugin is managed in a git repository at <https://github.com/programmfabrik/fylr-plugin-monitoring-endpoint>.
