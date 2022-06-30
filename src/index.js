import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

const client = new MongoClient('mongodb://127.0.0.1:27017');
let db = null;
client.connect().then(() => {
    db = client.db('mywallet_db');
});

const app = express();
app.use(express.json());
app.use(cors());


app.post('/sign-in', async (req, res) => {
    if (!req.body){
        res.sendStatus(422);
    }
    const token = uuid();
    const user = req.body;
    const userExists = await db.collection('users').findOne({email: user.email});
    if(userExists){
        res.status(400).send('Este email já está em uso.');
        return;
    }
    const encryptedPassword = bcrypt.hashSync(user.password, 10);
    await db.collection('users').insertOne({...user, password: encryptedPassword});
    await db.collection('sessions').insertOne({
        token,
        userId: user._id
    });
    
    res.status(200).send(token);

});

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log("server running"));