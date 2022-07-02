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
    const user = await db.collection('users').findOne({_id: new ObjectId(session.userId)});

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

    return res.send(registers);
}