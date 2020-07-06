const multer = require("multer");
const path = require("path");

exports.avatarUploader = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "Tmp");
    },
    filename: (req, file, cb) => {
      const contactId = req.contact._id;
      const ext = path.parse(file.originalname).ext;
      cb(null, contactId + ext);
    },
  });

  return multer({ storage });
};
