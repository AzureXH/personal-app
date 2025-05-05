import Router from "koa-router";
import redis from "../redis";

const router = new Router();

router.post("/expense", async (ctx) => {
  if (!ctx.request.body) {
    return (ctx.status = 400);
  }
  const { amount, description, category } = ctx.request.body as {
    amount: number;
    description: string;
    category: string;
  };

  if (!amount || !description || !category) {
    return (ctx.status = 400);
  }

  if (
    typeof amount !== "number" ||
    typeof description !== "string" ||
    typeof category !== "string"
  ) {
    return (ctx.status = 400);
  }
  try {
    ctx.status = 200;
  } catch (error) {
    console.error(error);
  }
});

router.get("/expense", async (ctx) => {
  const res = await redis.get("expense");
  if (!res) {
    ctx.body = { data: [] };
    return;
  }
  ctx.body = res;
});

export default router;
