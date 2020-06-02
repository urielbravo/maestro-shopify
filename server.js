const Koa = require("koa");
var Router = require("koa-router");
const render = require('koa-ejs');
const path = require('path');

const app = new Koa();
var router = new Router();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: false
})

router.get('/test', ctx => {
    ctx.body = "hello from test"
})

app.use(router.routes()).use(router.allowedMethods());

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
