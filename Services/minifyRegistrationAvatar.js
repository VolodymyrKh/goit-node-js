const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const { promises: fsPromises } = require("fs");

exports.minifyRegistrationAvatar = async () => {
  const file = await imagemin(["Tmp/*.{jpg,png}"], {
    destination: "Public/Images",
    plugins: [
      imageminJpegtran({
        quality: [0.6, 0.8],
      }),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  fsPromises.unlink(file[0].sourcePath);

  return path.basename(file[0].sourcePath);
};
