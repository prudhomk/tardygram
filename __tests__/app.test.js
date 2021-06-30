import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';

const agent = request.agent(app);

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Billy',
        password: 'password',
        profilePhotoUrl: expect.any(String)
      });

    expect(res.body).toEqual({
      id: '1',
      username: 'Billy',
      profilePhotoUrl: expect.any(String)
    });
  });

  it.only('login a user via POST', async() => {
    const user = await UserService.create({
      username: 'Billy',
      password: 'password',
      profilePhotoUrl: 'a'
    });
    const res = await agent
      .post('/api/v1/auth/login')
      .send({
        username: 'Billy',
        password:'password'
      });

    expect(res.body).toEqual({
      id: user.id,
      username: user.username,
      profilePhotoUrl: 'a'
    });
  });
});
