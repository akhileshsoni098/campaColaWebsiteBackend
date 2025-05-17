const mongoose = require("mongoose");

const adminAuthModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

const AdminAuthModel = mongoose.model("AdminAuth", adminAuthModel);

module.exports = AdminAuthModel;
