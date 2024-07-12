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
  body("email", "Please Enter a Valid Email").notEmpty().isEmail(),
  body("password")
    .notEmpty().withMessage("Please Enter Password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]/).withMessage("Password must include at least one letter, one number, and one special character"),
  body("name", "Please Enter Name").notEmpty(),
  body("confirmPassword")
    .notEmpty().withMessage("Please Confirm Your Password")
    .custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match"),
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
