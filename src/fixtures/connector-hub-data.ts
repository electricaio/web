import { ConnectorModal } from '../redux/connector-hub/types';

export const CONNECTOR_HUB_DATA: ConnectorModal[] = [
  {
    id: '1',
    name: 'Salesforce Customer API 2.0',
    image: 'salesforce.png',
    ern: 'ern://salesforce:customer:2.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo',
    keys: ['key1', 'key2'],
    type: 'Talent',
  },
  {
    id: '2',
    name: 'MySQL 5.0',
    ern: 'ern://mysql:5.0:users',
    image: 'mysql.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam molestie',
    keys: [],
    type: 'Foundation',
  },
  {
    id: '3',
    name: 'Hackerrank User API 3.0',
    image: 'hackerrank.png',
    ern: 'ern://hackerrank:user:3.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor.',
    keys: ['key1', 'key2', 'key3', 'key4'],
    type: 'Talent',
  },
  {
    id: '4',
    name: 'Hackerrank Recruiter API 3.0',
    image: 'hackerrank.png',
    ern: 'ern://hackerrank:recruiter:3.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor.',
    keys: ['key1', 'key2'],
    type: 'Talent',
  },
  {
    id: '5',
    name: 'Lever Company API 2.0',
    image: 'lever.png',
    ern: 'ern://lever:company:2.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor.',
    keys: ['key1', 'key2', 'key3', 'key4'],
    type: 'Talent',
  },
  {
    id: '6',
    name: 'Smart Recruiters Candidate API 3.0',
    image: 'smartrecruiters.png',
    ern: 'ern://smartrecruiters:recruiter:3.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor.',
    keys: ['key1', 'key2'],
    type: 'Talent',
  },
  {
    id: '7',
    name: 'Lever Interviews API 2.0',
    image: 'lever.png',
    ern: 'ern://lever:interviews:2.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus auctor.',
    keys: ['key1'],
    type: 'Talent',
  },
];