//Validar campos en las rutas
import { body } from "express-validator" //Capturar todo el body de la solicitud
import { validateErrors, validateErrorWithoutImg } from "./validate.error.js"
import { existUsername } from "./db.validators.js"
import { objectIdValid } from "./db.validators.js"


export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty or is not a valid email')
        .notEmpty()
        .isEmail(),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
    body('phone', 'Phone cannot be empty or is not a valid phone')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

export const loginValidator = [
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('The password must be strong')
        .isLength({min: 8}),
        validateErrors
]

export const saveAnimalValidator = [
    body('name', 'Name cannot be empty')
        .isLength({max:  35})
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .notEmpty(),
    body('age', 'Age cannot be empty')
        .isLength({max: 10})
        .notEmpty(),
    body('type', 'Type can not be empty')
        .notEmpty()
        .toUpperCase(),
    body('keeper', 'keeper can not be empty')
        .notEmpty()
        .custom(objectIdValid),
    validateErrorWithoutImg
]

export const saveAppointmentValidator = [
    body('date', 'Date cannot be empty')
        .notEmpty(),
    body('time', 'Time cannot be empty')
        .notEmpty(),
    body('pet', 'Pet cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('status', 'Status cannot be empty')
        .notEmpty()
        .toUpperCase(),
    validateErrorWithoutImg
]

