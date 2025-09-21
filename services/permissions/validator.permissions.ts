import { body } from "express-validator";
export const createPermissionValidator = [
  body("module").notEmpty().withMessage("Module is required"),
  body("module").isString().withMessage("Module must be a string"),
  body("module")
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("module")
    .isLength({ min: 3, max: 16 })
    .withMessage("Module must be between 3 and 16 characters"),
  body("access").notEmpty().withMessage("Access is required"),
  body("access").isString().withMessage("Access must be a string"),
  body("access")
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("access")
    .isIn(["create", "read", "update", "delete"])
    .withMessage("Access is must be create, read, update, delete"),
  body("description").optional().isString().withMessage("Description must be a string"),
];
export const updatePermissionValidator = [
  body("module")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3, max: 16 })
    .withMessage("Module must be between 3 and 16 characters")
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    }),
  body("access")
    .optional()
    .isString()
    .trim()
    .customSanitizer((value) => {
      return value.toLowerCase().replace(/\s+/g, "-");
    })
    .isIn(["create", "read", "update", "delete"]),
  body("description").optional().isString().withMessage("Description must be a string"),
];
export const setPermissionValidator = [
  body("permissionId")
    .notEmpty()
    .withMessage("Permission ID is required"),
  body("permissionId").isArray({ min: 1 }).withMessage("Atleast one permission ID is required"),
  body("permissionId")
    .custom((value) => {
      if (!Array.isArray(value)) return false;
      return value.every((item) => typeof item === "number" && !isNaN(item));
    })
    .withMessage("Each permission ID must be a number"),
];