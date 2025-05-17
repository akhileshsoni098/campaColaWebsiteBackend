const express = require("express");
const {
  registerAdmin,
  logInAdmin,
  getAdminProfile,
} = require("../controllers/adminAuthCtrl");
const {
  authenticationAdmin,
  authorizationAdmin,
} = require("../middi/adminAuth");
const router = express.Router();

router.route("/register").post(registerAdmin);

router.route("/logIn").post(logInAdmin);

router
  .route("/getProfile")
  .get(authenticationAdmin, authorizationAdmin, getAdminProfile);

module.exports = router;
