import { ConnectorModal } from '../redux/connector-hub/types';

export const CONNECTOR_HUB_DATA: ConnectorModal[] = [
  {
    typeId: 1,
    authorizationType: "None",
    name: "SalesForce CRM API 2.0",
    resource: "customer",
    version: "2.0",
    namespace: "salesforce",
    properties: {
      url: "https://www.salesforce.com",
      sdk_url: "url_to_sdk",
      image_url: "string",
      description: "This connector allows you to connect to SalesForce CRM system."
    },
    id: 4,
    ern: "ern://salesforce:customer:2_0",
    revisionVersion: 0,
  },
  {
    typeId: 1,
    authorizationType: "None",
    name: "Slack Channel",
    resource: "channel",
    version: "1.0",
    namespace: "slack",
    properties: {
      url: "https://www.slack.com",
      sdk_url: "url_to_sdk",
      image_url: "string",
      description: "This connector allows you to send a message to a Slack Channel"
    },
    id: 2,
    ern: "ern://slack:channel:1_0",
    revisionVersion: 0,
  },
  {
    typeId: 1,
    authorizationType: "None",
    name: "Slack Channel",
    resource: "channel",
    version: "2.0",
    namespace: "slack",
    properties: {
      url: "https://www.slack.com",
      sdk_url: "url_to_sdk",
      image_url: "string",
      description: "This connector allows you to send a message to a Slack Channel"
    },
    id: 3,
    ern: "ern://slack:channel:2_0",
    revisionVersion: 0,
  },
  {
    typeId: 1,
    authorizationType: "None",
    name: "ZendDesk Support 3.0",
    resource: "support",
    version: "3.0",
    namespace: "zendesk",
    properties: {
      url: "https://www.salesforce.com",
      sdk_url: "url_to_sdk",
      image_url: "string",
      description: "This connector allows you to connect to ZenDesk support."
    },
    id: 5,
    ern: "ern://zendesk:support:3_0",
    revisionVersion: 0,
  },
];
