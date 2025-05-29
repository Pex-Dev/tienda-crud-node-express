const uploadImage = async (file) => {
  const sharp = require("sharp");
  const path = require("path");
  try {
    fileName = `img-${Date.now()}.png`;
    const rutaSalida = path.join(__dirname, "../public/uploads", fileName);

    await sharp(file.buffer)
      .resize(700, 700)
      .toFormat("png")
      .png({ quality: 80 })
      .toFile(rutaSalida);
    return {
      success: true,
      fileName,
      message: "Imagen procesada correctamente",
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      fileName: null,
      message: "Error al procesar la imagen",
    };
  }
};

const deleteFile = (fileName) => {
  const fs = require("fs");
  const path = require("path");

  const filePath = path.join(__dirname, "../public/uploads/", fileName);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
      return false;
    }

    return true;
  });
};

module.exports = { uploadImage, deleteFile };
