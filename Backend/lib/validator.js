import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../middlewares/error.js";
const validatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMassage = errors
    .array()
    .map((error) => error.msg)
    .join(",");
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMassage, 400));
};
const registerValidator = () => [
  body("email", "Please Enter Email").notEmpty().isEmail(),
  body("password", "Please Enter Password").notEmpty(),
  body("name", "Please Enter Name").notEmpty(),
];
const loginValidator = () => [
  body("email", "Please Enter Email").notEmpty().isEmail(),
  body("password", "Please Enter Password").notEmpty(),
];
const adminLoginValidator = () => [
    body("sceretKey", "Please Provide Sceret Key").notEmpty(),
];

export {
  registerValidator,
  validatorHandler,
  loginValidator,
  adminLoginValidator,
};
