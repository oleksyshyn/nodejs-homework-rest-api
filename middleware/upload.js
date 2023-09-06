const multer = require("multer");
const path = require("node:path");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "tmp"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
    storage: multerConfig
})

module.exports = upload;