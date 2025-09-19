import { body } from "express-validator";

export const createPermissionValidator = [
  body("module").notEmpty().isString().withMessage("Module is required"),
  body("module")
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("access").notEmpty().isString().withMessage("Access is required"),
  body("access")
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("description").optional().isString(),
];

export const updatePermissionValidator = [
  body("module")
    .optional()
    .isString()
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("access")
    .optional()
    .isString()
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("description").optional().isString(),
];

export const setPermissionValidator = [
  body("permissionId")
    .notEmpty()
    .withMessage("Permission ID is required"),
  body("permissionId")
    .isArray({ min: 1 })
    .withMessage("Permission ID must be an array"),
  body("permissionId")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((item) => typeof item === "number" && !isNaN(item));
    })
    .withMessage("Each permission ID must be a number"),
];
