import { ApiKeyModal } from '../redux/api-keys/types';

export const API_KEYS_TABLE_DATA: ApiKeyModal[] = [
  {
    id: 1,
    name: 'Development',
    key: '14f4a1c0-e3sd5-5842-c7b3-162db8b95wex',
    createdAt: new Date('02/03/2018'),
  },
  {
    id: 2,
    name: 'Staging',
    key: '14f4a1c0-e6csd-5842-c7b3-162db8b95cc3',
    createdAt: new Date('01/02/2018'),
  },
  {
    id: 3,
    name: 'Production',
    key: '14s4a1c0-e365-5ds42-c7b3-162db8b95cc3',
    createdAt: new Date('01/04/2018'),
  },
];
