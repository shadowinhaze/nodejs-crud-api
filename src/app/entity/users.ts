import { randomUUID } from 'crypto';

import { StatusCode } from '../constants';
import { Router } from '../router';

import { USERS } from './store';
import { User } from './users.model';

const usersRouter = new Router();

usersRouter.get('users', (req, res) => {
  res.writeHead(StatusCode.success, { 'Content-type': 'application/json' });
  res.end(JSON.stringify(USERS));
});

usersRouter.post('users', (req, res) => {
  if (req.headers.transferData) {
    try {
      const { username, age, hobbies } = JSON.parse(
        req.headers.transferData as string,
      );

      if (!username || !age || !hobbies) {
        res.writeHead(
          StatusCode.invalid,
          'Request body does not contain required fields',
        );
        res.end();
      }

      const newUser = { id: randomUUID(), username, age, hobbies } as User;

      USERS.push(newUser);

      res.writeHead(StatusCode.created, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (err) {
      console.log(err);
    }
  }
});

export { usersRouter };
