import * as request from 'supertest';

import { App } from '..';
import { StatusCode } from '../constants';
import { userRouter } from '../entity/user';
import { usersRouter } from '../entity/users';

const app = new App();
app.addRouter(usersRouter);
app.addRouter(userRouter);
const server = app.testServer;

describe('Direct user:', () => {
  it('should return proper user by requested ID', async () => {
    const usersRes = await request(server).get('/users');
    const user = usersRes.body[0];
    const directUserRes = await request(server).get(`/users/${user.id}`);

    expect(directUserRes.body).toBeTruthy();
  });
  it('should update proper user with sended data', async () => {
    const newUser = {
      username: 'Marcel',
      age: 25,
      hobbies: ['swimming', 'running'],
    };
    const newUserRes = await request(server).post('/users').send(newUser);

    const newUserId = newUserRes.body.id;

    newUser.username = 'XY';
    newUser.age = 1;

    const updateUserRes = await request(server)
      .put(`/users/${newUserId}`)
      .send(newUser);

    expect(updateUserRes.statusCode).toEqual(StatusCode.success);
    expect(updateUserRes.body.age).toEqual(1);
    expect(updateUserRes.body.username).toEqual('XY');
  });
  it('should delete proper user by requested ID', async () => {
    const newUser = {
      username: 'Andrew',
      age: 75,
      hobbies: ['swimming', 'running'],
    };
    const newUserRes = await request(server).post('/users').send(newUser);

    const newUserId = newUserRes.body.id;

    const updateUserRes = await request(server).delete(`/users/${newUserId}`);
    const allUserRes = await request(server).get('/users');
    const checkDeleted = await request(server).get(`/users/${newUserId}`);

    expect(updateUserRes.statusCode).toEqual(StatusCode.deleted);
    expect(checkDeleted.statusCode).toEqual(StatusCode.notFound);
    expect(allUserRes.body.length).toEqual(2);
  });
});
