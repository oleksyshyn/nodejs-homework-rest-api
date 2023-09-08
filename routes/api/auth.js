const express = require("express");
const jsonParse = express.json();
const router = express.Router();
const AuthController = require("../../controllers/auth");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");

router.post("/register", jsonParse, AuthController.register);
router.get("/verify/:verificationToken", AuthController.verifyEmail);
router.post("/verify", jsonParse, AuthController.resendVerifyEmail);
router.post("/login", jsonParse, AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.get("/current", auth, AuthController.current);
router.patch("/avatars", auth, upload.single("avatar"), AuthController.uploadAvatar)

module.exports = router;