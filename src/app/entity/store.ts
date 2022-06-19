import { randomUUID } from 'crypto';

import { User } from './users.model';

export const USERS: User[] = [
  { id: randomUUID(), username: 'John', age: 15, hobbies: ['books', 'sport'] },
];
