const Contact = require("../../models/contact");
const { updateFavoriteSchema } = require("../../schemas/contacts");

async function updateFavorite(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const response = updateFavoriteSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "Validation Error" });
  }
  const { contactId } = req.params;
  const contact = {
    favorite: req.body.favorite,
  };
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {
      new: true,
    }).exec();
    console.log(result);
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateFavorite;