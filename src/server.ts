import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import './database';
import routes from './Routes';
import handlerErrors from './error/handlerErrors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(handlerErrors);

const port = process.env.PORT || 3333;
app.listen(port, ()=>{
    console.log(`Server running in port ${port} `);
});

