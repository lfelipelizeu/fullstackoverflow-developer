/* eslint-disable import/no-unresolved */
import express from 'express';
import cors from 'cors';
import * as userController from './controllers/userController';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/users', userController.createUser);

export default app;
