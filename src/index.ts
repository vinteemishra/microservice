import * as Koa from "koa";
import Config from "./config";
import { logger } from "./logger";
import router from "./router";
import * as koaBody from "koa-body";

const port = process.env.PORT || 3010;
const app = new Koa();

// body
app.use(koaBody());

// Middleware to check for Authorization
// Check for correct header
app.use(async (ctx, next) => {
  if (
    !("x-sda-auth" in ctx.header) ||
    ctx.header["x-sda-auth"] !== Config.apiKey
  ) {
    ctx.status = 403;
    ctx.body = "No thank";
    return;
  }
  await next();
});

// Middleware to add a logger
// Logger Format
// "HTTP_METHOD URL RESPONSE_CODE TIME"
// Add logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  logger.info(`${ctx.method} ${ctx.url} - ${ctx.status} - ${ms} ms`);
});

// Middleware to add routes
app.use(router);

app.listen(port, () => logger.info(`server is listening on ${port}`));
