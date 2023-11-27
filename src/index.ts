import dotenv from 'dotenv';
import express from 'express';
import { PrismaClient } from '@prisma/client';
import AuthMiddleware from './middleware/authMiddle';
import adminRouter from '../src/controllers/adminControllers';
import userRouter from '../src/controllers/userControllers';
import mailRouter from '../src/controllers/mailControllers';
import UserRepo from './repositories/userRepo';

dotenv.config();


const userRepo = new UserRepo();
const authMid = new AuthMiddleware(userRepo);

const testing = process.env.NODE_ENV === 'test';

const PORT = process.env.PORT || 3000;
const app = express();

const prisma = new PrismaClient({datasources:{db:{url:testing ? process.env.DATABASE_URL_TEST:process.env.DATABASE__URL}}})

app.use(express.json());
app.use('/',userRouter);
app.use('/', authMid.userAuth, mailRouter);
app.use('/', authMid.adminAuth, adminRouter);

const server = app
    .listen(PORT, ()=>{
        console.log(`Server is running on ${PORT}`);
    })

    .on('error', (err)=>{
        console.error(err);
    })

export {app,server,prisma};

