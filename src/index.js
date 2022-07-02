import express from 'express';
import cors from 'cors';
import { getUser } from './controllers/userController.js';
import authRouter from './routes/authRouter.js';
import registerRouter from './routes/registerRouter.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());

app.use(authRouter);
app.use(registerRouter);
app.get('/user', getUser);


const PORT = process.env.PORT;

app.listen(PORT || 5000, () => console.log("server running"));