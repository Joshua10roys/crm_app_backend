import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import startServer from './config/config.js';
import { usersRouter } from './routes/users.js';
import { serviceRouter } from './routes/service.js';
import { contactRouter } from './routes/contacts.js';
import { leadsRouter } from './routes/leads.js';
import { otherRouter } from './routes/others.js';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.use(cookieParser());

app.use('/users', usersRouter);
app.use('/service', serviceRouter);
app.use('/contact', contactRouter);
app.use('/lead', leadsRouter);
app.use('/get', otherRouter);

app.listen(process.env.PORT, startServer)