import { body } from "express-validator";

export const createRoleValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name must be a string"),
    body("description").optional().isString(),
];  

export const updateRoleValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("name").isString().withMessage("Name must be a string"),
    body("description").optional().isString(),
];
