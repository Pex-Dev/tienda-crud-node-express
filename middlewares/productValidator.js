const { body } = require("express-validator");

exports.validateProduct = [
  body("name")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre debe tener máximo 100 caracteres"),

  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres")
    .isLength({ max: 700 })
    .withMessage("La descripción debe tener máximo 700 caracteres"),

  body("price")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser un número mayor a 0"),
];
