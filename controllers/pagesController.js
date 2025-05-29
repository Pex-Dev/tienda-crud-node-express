const Product = require("../model/product");

exports.index = async (req, res) => {
  //Obtener 6 ultimos productos
  const products = await Product.all(6);
  res.render("index", { products });
};

exports.about = async (req, res) => {
  res.render("about");
};
