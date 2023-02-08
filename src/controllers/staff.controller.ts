import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import StaffSchema from "../models/staff";
var CryptoJS = require("crypto-js");
const signIn = async (req: Request, res: Response): Promise<void> => {
  const { username, password }: any = req.body;

  StaffSchema.findOne({ username: username }, (error: any, user: any) => {
    if (!user) {
      return res.status(400).json({
        message: "User does not exist!",
      });
    }

    const KEY = process.env.PWDKEY;

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(String(user?.password), KEY);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    if (originalText !== password) {
      return res.status(400).json({
        message: "Invalid password!",
      });
    } else {
      //create token
      const secret = process.env.SECRET;
      const token = jwt.sign({ _id: user._id }, secret!);

      //put token in cookie
      const date = new Date(Date.now() + 3600 * 1000 * 24);
      res.cookie("token", token, { expires: date });

      //send response to front end
      const { _id, username } = user;
      return res.json({ token, user: { _id, username } });
    }
  });
};

const getAllStaff = async (req: Request, res: Response) => {
  StaffSchema.find().then((data: any) => res.send(data));
};

export { signIn, getAllStaff };
