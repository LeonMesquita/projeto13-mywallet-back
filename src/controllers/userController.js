import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import joi from 'joi';
import {db} from '../db/mongo.js'



export async function createUser(req, res){
    const user = req.body;
    const userSchema = joi.object({
        name: joi.string().required(),
        email:joi.string().email().required(),
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
}




export async function loginUser(req, res){
    const user = req.body;
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const validate = userSchema.validate(user);
    if(validate.error){
        res.status(422).send('Erro ao validar os dados');
        return;
    }

    const findUser = await db.collection('users').findOne({email: user.email});

    if(!findUser || !bcrypt.compareSync(user.password, findUser.password)){
        return res.status(401).send("Email ou senha incorretos");
    }
    const token = uuid();
    await db.collection('sessions').insertOne({
        token,
        userId: findUser._id,
        userEmail: findUser.email
    });
    return res.status(201).send(token);
}


export async function getUser(req, res){

}