import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import { post } from 'superagent';


describe('demo routes', () => {

  let user = {}; 
  let agent;
  
  beforeEach(async() => {
    await setup(pool);
    agent = await request.agent(app);
    user = await UserService.create({
      username: 'Billy',
      password: 'password',
      profilePhotoUrl: 'a'
    });
    await agent.post('/api/v1/auth/login')
      .send({
        username: 'Billy',
        password:'password'
      });
      
  });

  it('creates a comment via POST', async() => {

    const res = await agent
      .post('/api/v1/comments')
      .send({
        commentBy: user.id,
        post: post.id,
        comment: 'Wow!',
      });

    expect(res.body).toEqual({
      id: '1',
      commentBy: user.id,
      post: post.id,
      comment: 'Wow!',
    });
  });

});
