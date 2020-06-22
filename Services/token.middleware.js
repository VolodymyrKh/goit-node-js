const jwt = require("jsonwebtoken");
const Contact = require("../Contacts/contact.model");

exports.tokenMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;
  if (!token) {
    res.status(401).send("Token was not provided, please authorize");
    return;
  }

  try {
    const { id } = await jwt.verify(token, process.env.PRIVATE_KEY);
    const contact = await Contact.getContactById(id);
    if (!contact || contact.token !== token) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    req.contact = contact;

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
    console.log(error);
  }
};
