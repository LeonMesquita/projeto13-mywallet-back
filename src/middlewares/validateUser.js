import {db, objectId} from '../db/mongo.js'
import joi from 'joi';





export async function validateUser(req, res, next){

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    const session = await db.collection('sessions').findOne({token});

    if(!session) return res.sendStatus(401);
    res.locals.session = session;

    next();
}

export async function validateCredentials(req, res, next){
    
}

//export default validateUser;