const { uploadImage, deleteFile } = require("../helpers/fileManager");
const Product = require("../model/product");
const Pagination = require("../helpers/pagination");

const { validationResult } = require("express-validator");

exports.index = async (req, res) => {
  //Obtener la pagina actual
  const currentPage = parseInt(req.query.page) || 1;
  const totalItems = await Product.count();
  const itemsPerPage = 15; //Items por pagina

  if (currentPage < 1) {
    currentPage = 1;
  }

  const pagination = new Pagination(totalItems, itemsPerPage, currentPage);

  const products = await Product.all(itemsPerPage, pagination.offset());

  res.render("products/index", {
    products,
    pagination: pagination.pagination(),
  });
};

exports.show = async (req, res) => {
  //Obtener id
  const id = req.params.id;

  //Buscar producto
  const product = await Product.find(id);

  if (!product) {
    return res.redirect("/products");
  }

  res.render("products/producto", { product });
};

exports.create = (req, res) => {
  res.render("admin/productos/create", { product: null, oldData: null });
};

exports.store = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render("admin/productos/create", {
      errors: errores.array(),
      oldData: req.body,
    });
  }

  //Verificar que se subio una imagen
  if (!req.file) {
    return res.render("admin/productos/create", {
      oldData: req.body,
      errors: [{ msg: "Debes subir una imagen" }],
    });
  }

  //Procesar imagen
  const uploadResult = await uploadImage(req.file);

  //Si hubo un error al procesar la imagen
  if (!uploadResult.success) {
    res.render("admin/productos/create", {
      oldData: req.body,
      errors: [{ msg: uploadResult.message }],
    });
  }

  //Insertar en base de datos
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: uploadResult.fileName,
    price: req.body.price,
  });

  console.log(product);

  const { success, message } = await product.create();

  if (!success) {
    return res.render("admin/productos/create", {
      oldData: req.body,
      errors: [{ msg: message }],
    });
  }

  res.redirect("/admin");
};

exports.edit = async (req, res) => {
  const id = req.params.id;

  //Verificar si el producto existe
  const product = await Product.find(id);

  if (!product) {
    return res.redirect("/admin");
  }

  res.render("admin/productos/edit", { product, oldData: product });
};

exports.update = async (req, res) => {
  const id = req.params.id;

  //Verificar si el producto existe
  let product = await Product.find(id);
  if (!product) {
    return res.redirect("/admin");
  }

  //Validar el formulario
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render("admin/productos/edit", {
      product,
      errors: errores.array(),
      oldData: req.body,
    });
  }

  let imageName = product.image;

  //Verificar si se subio una imagen
  if (req.file) {
    //Procesar la nueva imagen
    const uploadResult = await uploadImage(req.file);

    //Si hubo un error al procesar la imagen
    if (!uploadResult.success) {
      return res.render("admin/productos/edit", {
        id: product.id,
        oldData: product,
        errors: [{ msg: uploadResult.message }],
      });
    }
    //Eliminar la imagen anterior
    deleteFile(product.image);

    //Asignar el nuevo nombre de imagen
    imageName = uploadResult.fileName;
  }

  //Actualizar producto
  product = new Product({
    id: product.id,
    name: req.body.name,
    image: imageName,
    description: req.body.description,
    price: req.body.price,
  });

  //Actualizar en la base de datos
  const { success, message } = await product.update();

  if (!success) {
    return res.render("admin/productos/edit", {
      id: product.id,
      errors: [{ msg: message }],
      oldData: req.body,
    });
  }

  return res.redirect("/admin");
};

exports.destroy = async (req, res) => {
  const id = req.params.id;

  //Verificar si el producto existe
  const product = await Product.find(id);
  if (!product) {
    return res.redirect("/admin");
  }

  //Eliminar la imagen
  deleteFile(product.image);

  //Eliminar el producto
  const { success, message } = product.delete();

  return res.redirect("/admin");
};

exports.adminIndex = async (req, res) => {
  //Obtener la pagina actual
  const currentPage = parseInt(req.query.page) || 1;
  const totalItems = await Product.count();
  const itemsPerPage = 15; //Items por pagina

  if (currentPage < 1) {
    currentPage = 1;
  }

  const pagination = new Pagination(totalItems, itemsPerPage, currentPage);

  const products = await Product.all(itemsPerPage, pagination.offset());

  res.render("admin/index", { products, pagination: pagination.pagination() });
};
