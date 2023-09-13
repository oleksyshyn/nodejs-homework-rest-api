const User = require("../../models/user");
const { emailSchema } = require("../../schemas/auth");
const sendEmail = require("../../helpers/sendEmail");
const { BASE_URL } = process.env;

async function resendVerifyEmail(req, res, next) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing required field email" });
  }

  const response = emailSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: response.error.details[0].message });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error);
  }
}

module.exports = resendVerifyEmail;
