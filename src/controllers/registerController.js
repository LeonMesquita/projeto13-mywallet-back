import dotenv from 'dotenv';
dotenv.config();
import joi from 'joi';
import {db, objectId} from '../db/mongo.js'
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
dayjs().format()


export async function addRegister(req, res){
    const session = res.locals.session;
    const registerBody = req.body;

    const registerSchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required()
    });
    const validate = registerSchema.validate(registerBody);
    if(validate.error){
        res.status(422).send('Erro ao validar os dados');
        return;
    }
    await db.collection("registers").insertOne({
        ...registerBody,
        userId: session.userId,
        date: dayjs().format("DD/MM")
    });

   res.sendStatus(200);
}


export async function getRegisters(req, res){
    const session = res.locals.session;
    const registers = await db.collection('registers').find({
        userId: new objectId(session.userId)
    }).toArray();

    const user = await db.collection('users').findOne({_id: new ObjectId(session.userId)});
    return res.send({registers: registers, userName: user.name});
}

export async function deleteRegister(req, res){
    try{
        await db.collection('registers').deleteOne({_id: new objectId(registerId)});
        return res.sendStatus(200);

    }catch(error){
        return res.sendStatus(400);

    }
}