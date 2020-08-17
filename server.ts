import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import { createRouter } from './server/router'

const app = new Koa();
const port = 5000;

app.use(cors());

app.use(bodyParser());

app.use(json());

app.use(createRouter().routes());

app.listen(port, () => console.log(`Server started on port ${port}`));
