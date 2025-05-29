document.addEventListener("DOMContentLoaded", () => {
  menu();
  selectedImage();
});

const menu = () => {
  const _header = document.querySelector("header");
  const _menu = document.querySelector("#menuButton");

  _menu.addEventListener("click", () => {
    //192px
    _header.classList.toggle("max-h-[192px]");
  });
};

const selectedImage = () => {
  const _buttonImage = document.querySelector("#image");
  const _previewImage = document.querySelector("#imagePreview");

  if (!_buttonImage) return;
  _buttonImage.addEventListener("change", (e) => {
    const selectedFile = _buttonImage.files[0]; // Access the first selected file

    if (!selectedFile) retrun;

    if (!validExtension(selectedFile)) return;

    const preview = (window.URL || window.webkitURL).createObjectURL(
      selectedFile
    );

    _previewImage.src = preview;
    _previewImage.classList.remove("hidden");
  });
};

const validExtension = (file) => {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const fileExtension = file.name.split(".").pop().toLowerCase();
  return allowedExtensions.includes(fileExtension);
};
