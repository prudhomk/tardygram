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

    const res = await request(app)
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
      
    const res = await request(app)
      .get(`/api/v1/posts/${post.id}`);

    expect(res.body).toEqual(post);
  });

  it('updates a post', async() => {
    const post = await Post.insert({
      userId: user.id,
      photoUrl: 'picture',
      caption: 'placeholder',
      tags: ['oops', 'sorry']
    });

    post.caption = 'new headshot';
    
    const res = await agent
      .patch(`/api/v1/posts/${post.id}`)
      .send({ caption: 'new headshot' });

    expect(res.body).toEqual(post);
  });

  it('deletes a post', async() => {
    const post = await Post.insert({
      userId: user.id,
      photoUrl: 'x',
      caption: 'ugh',
      tags: ['mistake', 'never again']
    });

    const res = await agent
      .delete(`/api/v1/posts/${post.id}`)
      .send(post);

    expect(res.body).toEqual(post);
  });

  //   it('gets top 10 posts', async() => {
  //     const post1 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'ugh',
  //       tags: ['mistake', 'never again']
  //     });

  //     const post2 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'no',
  //       tags: ['stop', 'never again']
  //     });

  //     const post3 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'oh no',
  //       tags: ['please', 'never again']
  //     });

  //     const post4 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'oh my',
  //       tags: ['oops', 'never again']
  //     });

  //     const post5 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'tee hee',
  //       tags: ['whoops', 'never again']
  //     });

  //     const post6 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'no more',
  //       tags: ['CRUD', 'never again']
  //     });

  //     const post7 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'oog',
  //       tags: ['oof', 'never again']
  //     });

  //     const post8 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'ugh',
  //       tags: ['mistake', 'never again']
  //     });

  //     const post9 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'whatever',
  //       tags: ['tag', 'never again']
  //     });

  //     const post10 = await Post.insert({
  //       userId: user.id,
  //       photoUrl: 'x',
  //       caption: 'no more please',
  //       tags: ['not', 'never again']
  //     });

  //     const res = await request(app)
  //       .get('/api/v1/posts/popular');

  //     expect(res.body).toEqual([post1, post2, post3, post4, post5, post6, post7, post8, post9, post10]);

//   });
});


