import { Router } from 'express';
import UserService from '../services/UserServices';

export default Router()
  .post('/api/v1/auth/signup', (req, res, next), {
    UserService.create(req.body)
      .then(user => res.send(user))
      .catch(next);
  });
