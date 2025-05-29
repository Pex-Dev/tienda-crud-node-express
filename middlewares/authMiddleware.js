const auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // Usuario autenticado, sigue a la siguiente función
  } else {
    return res.redirect("/login");
  }
};

module.exports = auth;
