import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { postRouter, authRouter } from './controllers';
import authenticateToken from './middlewares/auth.middleware';
import cookieParser from 'cookie-parser';

const app = express();

app.use('/uploads',express.static('uploads'))


app.use(
  cors({
    origin: true,
    // origin: [
    //   'http://localhost:3000',
    //   'http://192.168.0.251:3000',
    //   'http://172.29.80.1:3000',
    // ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use('/posts', authenticateToken, postRouter.default);
app.use('/auth', authRouter.default);

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
