import cookie from "cookie";
import { NextApiRequest } from "next";

export const parseCookie = (req: any) => {
  return cookie.parse(req ? req.headers.cookie || "" : "");
};
