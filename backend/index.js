import express from 'express';
const app = express();
app.use(express.json());
import cors from 'cors'
app.use(cors())
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './db/connect.js';
import postsRouter from './routes/posts.js';
import authRouter from './routes/auth.js'
import authMiddleware from './middlewares/auth.js';



const dbName = 'blog-app';



app.use('/api/v1/auth', authRouter);
app.use('/api/v1/posts',authMiddleware, postsRouter);

connectDB(process.env.MONGO_URI+`/${dbName}`).then(() => {
  app.listen(8000, () => {
    console.log(`App is listening on port 8000`);
  });
});




