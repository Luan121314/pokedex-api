import 'reflect-metadata';
import {  createConnection } from 'typeorm';

async function connection() {
    return await createConnection()
}

export default  connection();
