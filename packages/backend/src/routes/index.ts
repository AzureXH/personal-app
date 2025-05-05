import Router from "koa-router";
import User from "./user";
import Expense from "./expense";
const router = new Router({
  prefix: "/api",
});
router.use(User.routes(), User.allowedMethods());
router.use(Expense.routes(), Expense.allowedMethods());
export default router;
