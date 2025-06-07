const admin = (req, res, next) => {
  // Verificar que el usuario esté autenticado
  if (!req.session || !req.session.user) {
    return res.redirect("/login");
  }
  // Verificar que el usuario sea administrador
  if (req.session.user.admin) {
    return next();
  } else {
    return res.redirect("/");
  }
};

module.exports = admin; // Exportar el middleware para usarlo en las rutas
