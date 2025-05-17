const express = require("express");

const admin = express();

const adminAuthRoute = require("./routes/adminAuth");

admin.use("/adminAuth", adminAuthRoute);

module.exports = admin;
