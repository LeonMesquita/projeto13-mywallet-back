import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import registerRouter from './routes/registerRouter.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();



app.use(cors());



app.use(express.json());





app.use(authRouter);
app.use(registerRouter);



app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});