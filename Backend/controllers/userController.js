import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { cookieOption, sendToken } from "../utils/cookie.js";
import { ErrorHandler, TryCatch } from "../middlewares/error.js";
import {uploadFilesToCloudinary } from "../utils/feature.js";
const newUser = TryCatch(async (req, res, next) => {
  const { name, email, password } = req.body;
  const file = req.file
  if(!file) return next(new ErrorHandler("Pleasae Upload Avatar",400))
  const result = await uploadFilesToCloudinary([file])
  const avatar = {
    public_id: result[0].public_id,
    url: result[0].url,
  };
  const user = await User.create({
    name,
    email,
    password,
    avatar,
  });
  sendToken(res, user, 201, "User Created");
});
const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new ErrorHandler("Invalid Credentials", 400));
  const isMatching = await bcrypt.compare(password, user.password);

  if (!isMatching) return next(new ErrorHandler("Invalid Credentials", 400));

  sendToken(res, user, 201, `Wow welcome back, ${user.name}`);
});
const getProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.userId);
  res.status(200).json({
    sucess: true,
    user: user,
  });
});
const logout = TryCatch(async (req, res, next) => {
  res
    .status(200)
    .cookie("wollo-token", "", { ...cookieOption, maxAge: 0 })
    .json({
      sucess: true,
      message: "Logged out sucessfully",
    });
});

export {
  login,
  newUser,
  getProfile,
  logout,
};
