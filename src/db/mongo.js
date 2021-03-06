import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();


const client = new MongoClient(process.env.MONGO_URI);
let db = null;
client.connect().then(() => {
    db = client.db('mywallet_db');
});

const objectId = ObjectId;

export {db, objectId};