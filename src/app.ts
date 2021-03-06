/* eslint-disable import/no-unresolved */
import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController';
import * as questionController from './controllers/questionController';
import authenticate from './middlewares/authenticate';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', userController.createUser);

app.post('/questions', authenticate, questionController.createQuestion);

app.get('/questions/:id', questionController.getQuestion);

app.post('/questions/:id', authenticate, questionController.answerQuestion);

app.get('/questions', questionController.getNotAnsweredQuestions);

export default app;
