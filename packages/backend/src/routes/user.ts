import Router from "koa-router";
import redis from "../redis";
import bcrypt from "bcrypt";

const router = new Router();

router.post("/user/register", async (ctx) => {
  if (!ctx.request.body) {
    return (ctx.status = 400);
  }
  const { username, password } = ctx.request.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return (ctx.status = 400);
  }
  try {
    // 检查用户名是否已存在
    const userExists = await redis.hexists("users", username);

    if (userExists) {
      ctx.status = 409; // Conflict
      ctx.body = { error: "用户名已存在" };
    } else {
      // 生成盐值并哈希密码（bcrypt自动处理盐的生成和存储）
      const saltRounds = 10; // 盐的复杂度，越高越安全但也越耗时
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // 存储用户信息（使用Hash结构）
      await redis.hset("users", {
        username,
        password: hashedPassword,
        createdAt: Date.now(),
      });

      ctx.status = 201; // Created
      ctx.body = { message: "注册成功" };
    }
  } catch (error) {
    console.error("注册错误:", error);
    ctx.status = 500;
    ctx.body = { error: "服务器错误" };
  }
});

router.post("/user/login", async (ctx) => {
  const { username, password } = ctx.request.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return (ctx.status = 400);
  }

  try {
    // 获取用户信息
    const user = (await redis.hgetall("users")) as {
      username: string;
      password: string;
      createdAt: string;
    };

    if (!user) {
      ctx.status = 401; // Unauthorized
      ctx.body = { error: "用户名或密码错误" };
      return;
    }

    // 验证密码
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // 登录成功，可以在这里生成JWT令牌或会话
      ctx.status = 200;
      ctx.body = {
        message: "登录成功",
        user: {
          username: user.username,
          createdAt: user.createdAt,
        },
      };
    } else {
      ctx.status = 401; // Unauthorized
      ctx.body = { error: "用户名或密码错误" };
    }
  } catch (error) {
    console.error("登录错误:", error);
    ctx.status = 500;
    ctx.body = { error: "服务器错误" };
  }
});

export default router;
