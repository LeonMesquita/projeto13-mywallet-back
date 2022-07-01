import express from 'express';
import cors from 'cors';
import { createUser, loginUser } from './controllers/userController.js';

import dotenv from 'dotenv';
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());


app.post('/sign-in', createUser);
app.post('/login', loginUser);


app.get("/", (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT;

app.listen(PORT || 5000, () => console.log("server running"));