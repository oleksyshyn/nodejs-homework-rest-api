const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");
const contactSchema = require("../schemas/contacts");

async function getAll(req, res, next) {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
}

async function getById (req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function create (req, res, next) {
  try {
    const response = contactSchema.validate(req.body);
    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: "Validation Error" });
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

async function remove (req, res, next) {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId);
    if (deletedContact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "missing fields" });
    }
    const response = contactSchema.validate(req.body);
    if (typeof response.error !== "undefined") {
      return res.status(400).json({ message: "Validation Error" });
    }
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
