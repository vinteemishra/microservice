import * as Koa from "koa";
import * as URL from "url";
import { handleGeneration } from "./genCert";

interface IRoutes {
  [key: string]: (ctx: Koa.Context, url: URL.Url) => void;
}

const handleRoot = (ctx: Koa.Context) =>
  (ctx.body = "SDA certification generation service\n");

// Function executed when a route is not found.
const notFound = (ctx: Koa.Context) => {
  ctx.body = "Not found - ¯\\_(ツ)_/¯\n";
  ctx.status = 404;
};

const routes: IRoutes = {
  "/": handleRoot,
  "/cert": handleGeneration,
};

const router = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const url = URL.parse(ctx.request.url, true);

  // If the URL triggered is found in the routes object,
  // then return the handler else return undefined

  const handler = url.pathname ? routes[url.pathname] : undefined;
  if (handler) {
    await handler(ctx, url);
  } else {
    // Throw 404 if handler is undefined
    notFound(ctx);
  }
  await next();
};

export default router;
