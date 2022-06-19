import * as request from 'supertest';

import { App } from '..';
import { StatusCode } from '../constants';
import { usersRouter } from '../entity/users';

const app = new App();
app.addRouter(usersRouter);
const server = app.testServer;

describe('All users:', () => {
  it('should return all users in store', async () => {
    const res = await request(server).get('/users');

    expect(res.statusCode).toEqual(StatusCode.success);
    expect(res.body).toBeTruthy();
  });

  it(`should add new User to user's collection`, async () => {
    const newUser = {
      username: 'Marcel',
      age: 25,
      hobbies: ['swimming', 'running'],
    };
    const res = await request(server).post('/users').send(newUser);
    const allUsers = await request(server).get('/users');

    expect(res.statusCode).toEqual(StatusCode.created);
    expect(res.body).toHaveProperty('age');

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(allUsers.body.length).toBe(2);
  });
});
