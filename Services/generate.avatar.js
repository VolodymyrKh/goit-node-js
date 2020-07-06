const AvatarGenerator = require("avatar-generator");
const { v4: uuidv4 } = require("uuid");

exports.createAvatar = async (email) => {
  const avatar = new AvatarGenerator();

  const image = await avatar.generate(email, "male");
  const name = uuidv4();
  return image.png().toFile(`./Tmp/${name}.png`);
};
