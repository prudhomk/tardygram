import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import UserService from '../lib/services/UserService.js';
import Post from '../lib/models/Post.js';



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

  it('creates a post via POST', async() => {

    const res = await agent
      .post('/api/v1/posts')
      .send({
        userId: user.id,
        photoUrl: 'picture',
        caption: 'Look at this!',
        tags: ['selfie', 'summer']
      });

    expect(res.body).toEqual({
      id: '1',
      userId: user.id,
      photoUrl: 'picture',
      caption: 'Look at this!',
      tags: ['selfie', 'summer']
    });
  });

  it('gets all posts', async() => {
    const post1 = await Post.insert({
      userId: user.id,
      photoUrl: 'picture',
      caption: 'Look at this!',
      tags: ['selfie', 'summer']
    });

    const post2 = await Post.insert({
      userId: user.id,
      photoUrl: 'picture2',
      caption: 'Haha funny',
      tags: ['silly', 'meme']
    });

    const res = await agent
      .get('/api/v1/posts');

    expect(res.body).toEqual([post1, post2]);
  });

  it('gets a post by id', async() => {
    const post = await Post.insert({
      userId: user.id,
      photoUrl: 'picture',
      caption: 'Look at this!',
      tags: ['selfie', 'summer']
    });
      
    const res = await agent
      .get('/api/v1/posts/:id');

    expect(res.body).toEqual(post);
  });
});


