// ----------------------
// IMPORTACIONES
// ----------------------
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const path = require("path");
const indexRouter = require("./routes/routes");

// ----------------------
// CONFIGURACIÓN INICIAL
// ----------------------
const app = express();
const PORT = 3000;

// ----------------------
// MIDDLEWARES GLOBALES
// ----------------------

// Procesar datos enviados por formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para permitir métodos como PUT o DELETE desde formularios
app.use(methodOverride("_method"));

// Configuración de sesiones
app.use(
  session({
    secret: "tu_clave_secreta", // Cámbiala por una clave más segura en producción
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hora
    },
  })
);

// Middleware para variables globales en vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  res.locals.errors = null;
  res.locals.appName = process.env.APP_NAME;
  next();
});

// ----------------------
// CONFIGURACIÓN DE VISTAS
// ----------------------
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// ----------------------
// ARCHIVOS ESTÁTICOS
// ----------------------
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "public")));

// ----------------------
// RUTAS
// ----------------------
app.use("/", indexRouter);

// ----------------------
// INICIAR SERVIDOR
// ----------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
