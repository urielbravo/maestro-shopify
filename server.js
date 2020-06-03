const Koa = require("koa");
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const json = require('koa-json');

app.use(bodyParser());

app.use(json());

require('./server/index')(app);

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
