const express = require('express');
const jsonParse = express.json();
const router = express.Router();
const ContactController = require('../../controllers/contacts');
const auth = require("../../middleware/auth")

router.get("/", auth, ContactController.getAll);

router.get("/:contactId", auth, ContactController.getById);

router.post("/", auth, jsonParse, ContactController.create);

router.delete("/:contactId", auth, ContactController.remove);

router.put("/:contactId", auth, jsonParse, ContactController.update);

router.patch("/:contactId/favorite", auth, jsonParse, ContactController.updateFavorite);

module.exports = router;