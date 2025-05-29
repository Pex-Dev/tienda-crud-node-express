const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.index = (req, res) => {
  res.render("auth/login", { oldData: null });
};

exports.autenticar = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) throw err;

    //Si no se encontraron resultados
    if (results.length === 0) {
      return res.render("auth/login", {
        error: "Usuario o contraseña incorrectos",
      });
    }

    //Obtener el primer usuario encontrado
    const usuario = results[0];

    // Comparar contraseña ingresada con el hash guardado
    bcrypt.compare(password, usuario.password, (err, esValido) => {
      if (err) throw err;

      if (esValido) {
        //Almacenar datos del usuario en la sesión
        req.session.user = {
          id: usuario.id,
          name: usuario.name,
          email: usuario.email,
          admin: usuario.admin,
        };

        //Si el usuario es admin redrigir a pagina de admin
        if (usuario.admin) {
          return res.redirect("/admin?page=1");
        }

        return res.redirect("/"); // Redirigir al usuario a la página de inicio
      } else {
        // Contraseña incorrecta
        res.render("auth/login", {
          errors: "Usuario o contraseña incorrectos",
          oldData: { email, password },
        });
      }
    });
  });
};

exports.logout = (req, res) => {
  // Destruir la sesión y redirigir al usuario a la página de inicio de sesión
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
