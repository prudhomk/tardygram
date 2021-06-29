import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('signs up a user via POST', async() => {
    const res = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        enauk: 'test@test.com',
        password: 'password'
      });

    expect(res.body).toEqual({
      id: '1',
      email: 'test@test.com'
    });
  });
});
