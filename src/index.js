import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import joi from 'joi';

const client = new MongoClient('mongodb://127.0.0.1:27017');
let db = null;
client.connect().then(() => {
    db = client.db('mywallet_db');
});

const app = express();
app.use(express.json());
app.use(cors());


app.post('/sign-in', async (req, res) => {
    
    
    const user = req.body;
    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    });
    const validate = userSchema.validate(user);
    if(validate.error){
        res.status(422).send('Erro ao validar os dados')
    }


    const token = uuid();
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


app.post('/login', async (req, res) => {
    console.log(req.body);
    const user = req.body;
    const userSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    });
    const validate = userSchema.validate(user);
    if(validate.error){
        res.status(422).send('Erro ao validar os dados');
        return;
    }

    const findUser = await db.collection('users').findOne({email: user.email});
    const isValidPassword = bcrypt.compareSync(user.password, findUser.password);

    if(!findUser || !isValidPassword){
        res.status(401).send("Email ou senha incorretos");
    }
    const token = uuid();
    await db.collection('sessions').insertOne({
        token,
        userId: findUser._id
    });
    return res.status(201).send(token);
});

app.get("/", (req, res) => {
    res.send('Hello World');
});

app.listen(5000, () => console.log("server running"));