const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const { promises: fsPromises } = require("fs");

exports.minifyPatchAvatar = async (req, res, next) => {
  try {
    const AVATARS_DIR = "Public/Images";
    await imagemin([`Tmp/${req.file.filename}`], {
      destination: AVATARS_DIR,
      plugins: [
        imageminJpegtran({
          quality: [0.6, 0.8],
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    });

    fsPromises.unlink(req.file.path);
    const { filename } = req.file;
    req.file = {
      ...req.file,
      destination: AVATARS_DIR,
      path: path.join(AVATARS_DIR, filename),
    };
    req.body = { avatarURL: `http://localhost:3000/images/${filename}` };
    next();
  } catch (error) {
    console.log(error);
  }
};
