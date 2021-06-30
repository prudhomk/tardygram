import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import authController from './controller/auth.js';
import postsController from './controller/posts.js';
import commentsController from './controller/comments.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authController);
app.use(postsController);
app.use(commentsController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
