import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';
import registerRouter from './routes/registerRouter.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();

app.use(cors());
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});




app.use(express.json());





app.use(authRouter);
app.use(registerRouter);



app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});