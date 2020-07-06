const sgMail = require("@sendgrid/mail");

exports.sendVerivicationMail = async (token, email) => {
  sgMail.setApiKey(process.env.API_KEY);

  const msg = {
    to: email,
    from: "volodymyr_kh@hotmail.com",
    subject: "Email verification",
    text: "Follow the link to complete registration",
    html: `<a href="http://localhost:3000/auth/verify/${token}">Please confirm your email</a>`,
  };

  return await sgMail.send(msg);
};
