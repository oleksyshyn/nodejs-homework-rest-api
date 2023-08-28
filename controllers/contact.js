// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../models/contacts");
const { addSchema, updateFavoriteSchema } = require("../schemas/contacts");

const Contact = require('../models/contact')

// async function getAll(req, res, next) {
//   try {
//     const contacts = await listContacts();
//     res.json(contacts);
//   } catch (error) {
//     next(error);
//   }
// }

async function getAll(req, res, next) {
  try {
    const docs = await Contact.find().exec();
    return res.json(docs);
  } catch (error) {
    next(error);
  }
}

// async function getById (req, res, next) {
//   try {
//     const { contactId } = req.params;
//     const contact = await getContactById(contactId);
//     if (contact) {
//       res.json(contact);
//     } else {
//       res.status(404).json({ message: "Not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

async function getById(req, res, next) {
  const { contactId } = req.params;
  try {
    const doc = await Contact.findById(contactId).exec();
    if (doc === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(doc);
  } catch (error) {
    next(error);
  }
}

// async function create (req, res, next) {
//   try {
//     const response = contactSchema.validate(req.body);
//     if (typeof response.error !== "undefined") {
//       return res.status(400).json({ message: "Validation Error" });
//     }
//     const newContact = await addContact(req.body);
//     res.status(201).json(newContact);
//   } catch (error) {
//     next(error);
//   }
// }

async function create(req, res, next) {
  const response = addSchema.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "Validation Error" });
  }
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  try {
    const doc = await Contact.create(contact);
    return res.status(201).json(doc);
  } catch (error) {
    next(error);
  }
} 

// async function remove (req, res, next) {
//   try {
//     const { contactId } = req.params;
//     const deletedContact = await removeContact(contactId);
//     if (deletedContact) {
//       res.status(200).json({ message: "contact deleted" });
//     } else {
//       res.status(404).json({ message: "Not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

async function remove(req, res, next) {
  const { contactId } = req.params;
  try {
    const result = await Contact.findByIdAndRemove(contactId).exec();
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

// async function update(req, res, next) {
//   try {
//     if (Object.keys(req.body).length === 0) {
//       return res.status(400).json({ message: "missing fields" });
//     }
//     const response = contactSchema.validate(req.body);
//     if (typeof response.error !== "undefined") {
//       return res.status(400).json({ message: "Validation Error" });
//     }
//     const { contactId } = req.params;
//     const updatedContact = await updateContact(contactId, req.body);
//     if (updatedContact) {
//       res.json(updatedContact);
//     } else {
//       res.status(404).json({ message: "Not found" });
//     }
//   } catch (error) {
//     next(error);
//   }
// }

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
  };
  try {
    const result = await Contact.findByIdAndUpdate(contactId, contact, {new: true}).exec();
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
}

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
    const result = await Contact.findByIdAndUpdate(contactId, contact, {new: true,}).exec();
    console.log(result);
    if (result === null) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(result);
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
  updateFavorite,
};
