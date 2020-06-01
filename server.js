const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`));
