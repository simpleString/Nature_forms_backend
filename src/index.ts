import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { postRouter, authRouter } from './controllers';
import { PrismaClient } from '@prisma/client';
import authenticateToken from './middlewares/auth.middleware';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

const port = 5000;

app.use('/posts', authenticateToken, postRouter.default);
app.use('/auth', authRouter.default);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
