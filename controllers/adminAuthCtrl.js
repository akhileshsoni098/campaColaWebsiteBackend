const jwt = require("jsonwebtoken");
const AdminAuthModel = require("../model/adminAuthModel");
const { sendErrorResponse } = require("../helper/errorHandler");

 
// Registration

exports.registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(res, 400, "Email and password are mandatory");
    }

    const saveData = await AdminAuthModel.create(req.body);

    res
      .status(201)
      .json({ status: true, message: "SuperAdmin registered", data: saveData });
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
};

// login 

exports.logInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendErrorResponse(res, 400, "Email and password are mandatory");
    }

    const admin = await AdminAuthModel.findOne({ email, password });

    if (!admin) {
      return sendErrorResponse(res, 403, "Unauthorized access");
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET_KEY_ADMIN);

    return res.status(200).json({
      status: true,
      message: "Login successful",
      token,
      data: admin,
    });
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
};

// Get Admin Profile

exports.getAdminProfile = async (req, res) => {
  try {
    const id = req.admin._id;

    const profile = await AdminAuthModel.findById(id);

    if (!profile) {
      return sendErrorResponse(res, 404, "Admin profile not found");
    }

    res.status(200).json({ status: true, data: profile });
  } catch (err) {
    return sendErrorResponse(res, 500, err.message);
  }
};
