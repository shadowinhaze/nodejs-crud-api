import { ServerResponse } from 'http';

import { StatusCode } from '../constants';
import { Router } from '../router';

import { USERS } from './store';
import { User } from './users.model';

const userRouter = new Router();

const checkIfValidUUID = (id: string, res: ServerResponse): void => {
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  if (!regexExp.test(id)) {
    res.writeHead(
      StatusCode.invalid,
      'Provided user ID is incorrect (not UUID)',
    );
    res.end();
  }
};

const checkIfUserExist = (id: string, res: ServerResponse): User => {
  const properUser = USERS.filter((user) => user.id === id)[0];
  if (!properUser) {
    res.writeHead(StatusCode.notFound, 'User with provided ID doest not exist');
    res.end();
  }

  return properUser;
};

userRouter.get('user', (req, res) => {
  const { userId } = req.headers;

  checkIfValidUUID(userId as string, res);

  const user = checkIfUserExist(userId as string, res);

  res.writeHead(StatusCode.success, {
    'Content-type': 'application/json',
  });
  res.end(JSON.stringify(user));
});

userRouter.put('user', (req, res) => {
  const { userId } = req.headers;

  checkIfValidUUID(userId as string, res);

  checkIfUserExist(userId as string, res);

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

      const newUser = { id: userId, username, age, hobbies } as User;

      USERS.forEach((user) => {
        if (user.id === userId) {
          Object.assign(user, newUser);
        }
      });

      res.writeHead(StatusCode.success, { 'Content-type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch (err) {
      console.log(err);
    }
  }
});

userRouter.delete('user', (req, res) => {
  const { userId } = req.headers;
  checkIfValidUUID(userId as string, res);
  checkIfUserExist(userId as string, res);

  const userIndex = USERS.findIndex((user) => user.id === userId);
  USERS.splice(userIndex, 1);

  res.writeHead(StatusCode.deleted, 'User deleted', {
    'Content-type': 'application/json',
  });
  res.end();
});

export { userRouter };
