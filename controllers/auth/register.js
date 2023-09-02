const bcrypt = require("bcrypt");
const User = require('../../models/user');
const { authSchema } = require("../../schemas/auth");

async function register(req, res, next) {
    const response = authSchema.validate(req.body);
    if (typeof response.error !== "undefined") {
      return res.status(400).json({
        message: response.error.details[0].message,
      });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).exec();
        if (user !== null) {
            return res.status(409).json({message: "Email in use"})
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: passwordHash });
        res.status(201).json({
          user: {
            email: newUser.email,
            subscription: newUser.subscription,
          },
        });
    } catch (error) {
        next(error);
    }
}

module.exports = register;