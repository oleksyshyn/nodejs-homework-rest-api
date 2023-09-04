const Contact = require("../../models/contact");
const { addSchema } = require("../../schemas/contacts");

async function update(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing fields" });
  }

  const response = addSchema.validate(req.body);

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "Validation Error" });
  }

  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    owner: req.user._id,
  };

  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, { new: true }).exec();
    
    if (result === null || result.owner !== req.user._id) {
      return res.status(404).json({ message: "Not found" });
    }
    
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = update;
