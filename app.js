import express from 'express';
import path from "node:path";
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import {fileURLToPath} from "node:url";
import {errorHandler} from "./src/middleware/errorHandler";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.WF_PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(errorHandler)

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;