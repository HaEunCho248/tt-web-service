const multer = require("multer");
const path = require("path");
const fs = require("fs");

function addImage(imgPath) {
  fs.readdir(imgPath, (error) => {
    if (error) {
      console.error("fail to make uploads folder.");
    }
  });
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "-" + Date.now() + ext);
    },
    limits: { fileSize: 10 * 1024 * 1024 },
  });

  return multer({ storage: storage });
  // return storage;
}

export { addImage };
