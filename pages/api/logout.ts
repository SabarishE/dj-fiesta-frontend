import { API_URL } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ message: "logged out successfully" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};
