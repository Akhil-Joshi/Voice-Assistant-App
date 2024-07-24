import { body, validationResult } from "express-validator";
import { ErrorHandler } from "../middlewares/error.js";

// Middleware to handle validation errors
const validatorHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const errorMessages = errors.array().map((error) => error.msg).join(", ");
  next(new ErrorHandler(errorMessages, 400));
};

// Validator for user registration
const registerValidator = () => [
  body("email", "Please enter a valid email").notEmpty().isEmail(),
  body("password")
    .notEmpty().withMessage("Please enter a password")
    .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]/).withMessage("Password must include at least one letter, one number, and one special character"),
  body("name", "Please enter your name").notEmpty(),
  body("confirmPassword")
    .notEmpty().withMessage("Please confirm your password")
    .custom((value, { req }) => value === req.body.password).withMessage("Passwords do not match"),
];

// Validator for user login
const loginValidator = () => [
  body("email", "Please enter your email").notEmpty().isEmail(),
  body("password", "Please enter your password").notEmpty(),
];

// Validator for admin login
const adminLoginValidator = () => [
  body("secretKey", "Please provide the secret key").notEmpty(),
];

export {
  registerValidator,
  validatorHandler,
  loginValidator,
  adminLoginValidator,
};
