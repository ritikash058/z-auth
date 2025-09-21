import { body } from "express-validator";

export const createRoleValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name must be a string"),
    body("name")
      .trim()
      .customSanitizer((value) => {
        return value.toLowerCase().replace(/\s+/g, "-");
      }),
    body("name")
      .isLength({ min: 3, max: 16 })
      .withMessage("Name must be between 3 and 16 characters"),
    body("description").optional().isString().withMessage("Description must be a string"),
];
export const updateRoleValidator = [
    body("name")
      .optional()
      .isString()
      .trim()
      .isLength({ min: 3, max: 16 })
      .withMessage("Name must be between 3 and 16 characters")
      .customSanitizer((value) => {
        return value.toLowerCase().replace(/\s+/g, "-");
      }),
    body("description").optional().isString().withMessage("Description must be a string"),
];
