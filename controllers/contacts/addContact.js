const Contact = require("../../models/contact");
const { addSchema } = require("../../schemas/contacts");

async function create(req, res, next) {
  const response = addSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "Validation Error" });
  }

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user._id,
  };

  try {
    const doc = await Contact.create(contact);
    return res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
}

module.exports = create;