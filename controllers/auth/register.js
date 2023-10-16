const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { v4: uuid } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
