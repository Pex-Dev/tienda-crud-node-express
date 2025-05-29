class Product {
  constructor(args = { name: "", description: "", image: "", price: 0 }) {
    this.id = args.id || null; // id puede ser null si es un nuevo producto
    this.name = args.name;
    this.description = args.description;
    this.image = args.image;
    this.price = args.price;
    this.created_at = args.created_at || null;
    this.updated_at = args.updated_at || null;
  }

  static count = async () => {
    const db = require("../config/db");
    const sql = "SELECT COUNT(*) AS total FROM products";

    return new Promise((resolve, reject) => {
      db.query(sql, (err, results) => {
        if (err) {
          console.error("Error al contar los productos:", err);
          return reject(0);
        }
        if (results.length === 0) {
          return resolve(0);
        }
        return resolve(results[0].total);
      });
    });
  };

  static all = async (itemsPerPage, offset = 0) => {
    const db = require("../config/db");
    const sql = "SELECT * FROM products LIMIT ? OFFSET ?";

    return new Promise((resolve, reject) => {
      db.query(sql, [itemsPerPage, offset], (err, results) => {
        if (err) {
          console.error("Error al obtener los productos:", err);
          return reject([]);
        }
        if (results.length === 0) {
          return resolve([]);
        }
        const products = results.map((product) => {
          return new Product({
            id: product.id,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            created_at: product.created_at,
            updated_at: product.updated_at,
          });
        });
        return resolve(products);
      });
    });
  };

  static find = async (id) => {
    const db = require("../config/db");
    const sql = "SELECT * FROM products WHERE id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) {
          return null;
        }
        if (results.length === 0) {
          return null;
        }
        return resolve(new Product(results[0]));
      });
    });
  };

  create = async () => {
    const db = require("../config/db");
    const sql =
      "INSERT INTO products (name, description, image, price) VALUES (?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [this.name, this.description, this.image, this.price],
        (err, result) => {
          if (err) {
            return reject({
              success: false,
              message: "Error al registrar el producto",
            });
          }
          return resolve({
            success: true,
            message: "Producto registrado correctamente",
          });
        }
      );
    });
  };

  update = async () => {
    const db = require("../config/db");
    const sql =
      "UPDATE products SET name = ?, description = ?, image = ?, price = ? WHERE id = ?";

    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [this.name, this.description, this.image, this.price, this.id],
        (err, result) => {
          if (err) {
            console.log("error", err);

            return reject({
              success: false,
              message: "Error al actualizar el producto",
            });
          }
          return resolve({
            success: true,
            message: "Producto actualizado correctamente",
          });
        }
      );
    });
  };

  delete = async () => {
    const db = require("../config/db");
    const sql = "DELETE FROM products WHERE id = ?";

    return new Promise((resolve, reject) => {
      db.query(sql, [this.id], (err, result) => {
        if (err) {
          return reject({
            success: false,
            message: "Error al eliminar el producto",
          });
        }
        return resolve({
          success: true,
          message: "Producto eliminado correctamente",
        });
      });
    });
  };
}

module.exports = Product; // Exportar el modelo para usarlo en los controladores
