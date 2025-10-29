import { body } from "express-validator";

export const createUserValidator = [
  body("email").optional().isEmail().withMessage("Must be valid email address."),
  body("contactNumber").optional().isLength({ min: 6 }).withMessage("Contact number must be at least 6 characters long"),
  body("password").notEmpty().isString().withMessage("Password is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("password")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),
  body("password")
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
    .withMessage("Password must contain at least one symbol"),
  body("roleId").notEmpty().withMessage("Role ID is required"),
  body("roleId").isArray({ min: 1 }).withMessage("Atleast one role ID is required"),
  body("roleId")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((item) => typeof item === "number" && !isNaN(item));
    })
    .withMessage("Each role ID must be a number"),
  body().custom((body) => {
    if (!body.email && !body.contactNumber) {
      throw new Error("Either email or contact number is required");
    }
    return true;
  }),
];

export const resetPasswordValidator = [
  body("password").notEmpty().withMessage("Password is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("password")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),
  body("password")
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
    .withMessage("Password must contain at least one symbol"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Confirm Password must match Password"),
];

export const changePasswordValidator = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current Password is required"),
  body("currentPassword")
    .isString()
    .withMessage("Current Password must be a string"),
  body("newPassword")
    .notEmpty()
    .withMessage("New Password is required"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New Password must be at least 8 characters long"),
  body("newPassword")
    .matches(/[A-Z]/)
    .withMessage("New Password must contain at least one uppercase letter"),
  body("newPassword")
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
    .withMessage("New Password must contain at least one symbol"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required"),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage("Confirm Password must match New Password"),
];

export const forgotPasswordValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("contactNumber")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Contact number must be at least 6 characters long"),
  body().custom((body) => {
    if (!body.email && !body.contactNumber) {
      throw new Error("Either email or contact number is required");
    }
    return true;
  }),
];

export const updateUserRoleValidator = [
  body("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address"),
  body("contactNumber")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Contact number must be at least 6 characters long"),
  body("roleId").notEmpty().withMessage("Role ID is required"),
  body("roleId").isArray({ min: 1 }).withMessage("Atleast one role ID is required"),
  body("roleId")
      .custom((value) => {
        if (!Array.isArray(value)) return false;
        return value.every((item) => typeof item === "number" && !isNaN(item));
      })
      .withMessage("Each role ID must be a number"),
];
