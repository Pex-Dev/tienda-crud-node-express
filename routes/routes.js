const express = require("express");
const router = express.Router(); // obtener una instancia de Router
const multer = require("multer");

// Usamos multer con memoria para procesar la imagen antes de guardarla
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Importar controladores
const authController = require("../controllers/authController");
const pagesController = require("../controllers/pagesController");
const productController = require("../controllers/productController");
const { validateProduct } = require("../middlewares/productValidator");

//Importar middlewares
const auth = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.get("/", pagesController.index);
router.get("/about", pagesController.about);

//Auth
router.get("/login", authController.index); // manejar la vista de inicio de sesión
router.post("/login", authController.autenticar); // manejar el inicio de sesión
router.get("/logout", authController.logout); // manejar el cierre de sesión

//Productos
router.get("/products", productController.index);
router.get("/products/create", auth, admin, productController.create);
router.get("/products/:id", productController.show);
router.post(
  "/products",
  auth,
  admin,
  upload.single("image"),
  validateProduct,
  productController.store
);
router.get("/products/:id/edit", auth, admin, productController.edit);
router.put(
  "/products/:id",
  auth,
  admin,
  upload.single("image"),
  validateProduct,
  productController.update
);
router.delete("/products/:id", auth, admin, productController.destroy);

//Admin
router.get("/admin", auth, admin, productController.adminIndex);

module.exports = router; // exportar el router para usarlo en el servidor principal
