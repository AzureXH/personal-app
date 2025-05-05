import Koa from "koa";
import Router from "./routes";
import BodyParser from "koa-bodyparser";
const app = new Koa();

app.use(BodyParser());
app.use(Router.routes()).use(Router.allowedMethods());
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
