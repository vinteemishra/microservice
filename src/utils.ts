import * as Koa from "koa";
import { Url } from "url";

// Function to check for the missing paramaters in the Requuest Body Parameter

export const missingParameter = (ctx: Koa.Context, url: Url) => {
  // check for missing name
  if (!("name" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter name";
    return true;
  }
  // check for missing jobTitle
  if (!("jobTitle" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter jobTitle";
    return true;
  }
  // check for missing certHeader
  if (!("certHeader" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certHeader";
    return true;
  }
  // check for missing certBody
  if (!("certBody" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certBody";
    return true;
  }
  // check for missing certBody1
  if (!("certBody1" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certBody1";
    return true;
  }
  // check for missing certBody2
  if (!("certBody2" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certBody2";
    return true;
  }
  // check for missing certDates
  if (!("certDates" in ctx.request.body)) {
    ctx.status = 400;
    ctx.body = "Missing parameter certDates";
    return true;
  }
  // check if the certDates is an array
  if (
    Object.prototype.toString.call(ctx.request.body.certDates) !==
    "[object Array]"
  ) {
    ctx.status = 400;
    ctx.body = "certDates is not an array";
    return true;
  }

  return false;
};
