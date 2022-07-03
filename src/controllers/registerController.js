import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import joi from 'joi';
import {db, objectId} from '../db/mongo.js'
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
dayjs().format()

export async function addRegister(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const registerBody = req.body;

    const session = await db.collection('sessions').findOne({token});
    if(!session) return res.sendStatus(401);
    

    await db.collection("registers").insertOne({
        ...registerBody,
        userId: session.userId,
        date: dayjs().format("DD/MM")
    });

   res.sendStatus(200);
}


export async function getRegisters(req, res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    const session = await db.collection('sessions').findOne({token});
    if(!session) return res.sendStatus(401);

    const registers = await db.collection('registers').find({
        userId: new objectId(session.userId)
    }).toArray();

    const user = await db.collection('users').findOne({_id: new ObjectId(session.userId)});



    return res.send({registers: registers, userName: 'user.name'});
}

export async function deleteRegister(req, res){
    console.log('entrou')
    const { authorization } = req.headers;
    console.log(authorization);
    const token = authorization?.replace("Bearer ", "");

    const session = await db.collection('sessions').findOne({token});
    if(!session) return res.sendStatus(401);

    const { registerId } = req.body;
    console.log(registerId);

    try{
        await db.collection('registers').deleteOne({_id: new objectId(registerId)});
        return res.sendStatus(200);

    }catch(error){
        console.log(error);
        return res.sendStatus(400);

    }
    

}