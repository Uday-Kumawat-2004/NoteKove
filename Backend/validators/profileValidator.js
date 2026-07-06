import { body } from "express-validator";


export const updateProfileValidation = [

  body("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage(
      "Name cannot be empty"
    ),


  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage(
      "Enter valid email"
    ),

];


export const changePasswordValidation = [

  body("currentPassword")
    .notEmpty()
    .withMessage(
      "Current password required"
    ),


  body("newPassword")
    .isLength({
      min: 8,
    })
    .withMessage(
      "New password must be at least 8 characters"
    ),

];