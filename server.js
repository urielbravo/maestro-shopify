const Koa = require("koa");
const app = new Koa();

const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

app.use(cors());

app.use(bodyParser());

app.use(json());

app.keys = ['maestro secret key', 'maestro secret key 2'];

require('./server/index')(app);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
