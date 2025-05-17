// controllers/franchiseLeadController.js
const mongoose = require("mongoose");
const FranchiseLead = require("../model/formSubmit");

// Utility to check for valid ObjectId (if you need it elsewhere)
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

exports.createFranchiseLead = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      businessType,
      investmentRange,
      city,
      businessVision,
    } = req.body;

    // 1) Required fields
    const missing = [];
    if (!firstName) missing.push("firstName");
    if (!lastName) missing.push("lastName");
    if (!email) missing.push("email");
    if (!contactNumber) missing.push("contactNumber");
    if (!businessType) missing.push("businessType");
    if (!investmentRange) missing.push("investmentRange");
    if (!city) missing.push("city");
    if (!businessVision) missing.push("businessVision");

    if (missing.length) {
      return res.status(400).json({
        status: false,
        message: `Missing required field(s): ${missing.join(", ")}`,
      });
    }

    // 2) Basic format checks
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid email address",
      });
    }

    const phoneRegex = /^\d{10,15}$/;
    if (!phoneRegex.test(contactNumber)) {
      return res.status(400).json({
        status: false,
        message: "Please provide a valid contactNumber (10–15 digits)",
      });
    }

    // 3) Enum checks
    const validBusinessTypes = [
      "franchise",
      "reseller",
      "distributor",
      "other",
    ];
    if (!validBusinessTypes.includes(businessType)) {
      return res.status(400).json({
        status: false,
        message: `businessType must be one of: ${validBusinessTypes.join(
          ", "
        )}`,
      });
    }

    // 4) Create & save
    const lead = new FranchiseLead({
      firstName,
      lastName,
      email,
      contactNumber,
      businessType,
      investmentRange,
      city,
      businessVision,
    });

    await lead.save();

    return res.status(201).json({
      status: true,
      message: "Franchise lead created successfully",
      data: lead,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// controllers/franchiseLeadController.js
exports.getAllLeads = async (req, res) => {
  try {
    // Build filter object from any other query params
    const { page = 1, limit = 10, ...filters } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Count total matching documents
    const total = await FranchiseLead.countDocuments(filters);

    // Fetch paginated results
    const leads = await FranchiseLead.find(filters)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(200).json({
      status: true,
      data: leads,
      meta: {
        total, // total matching leads
        page, // current page
        limit, // items per page
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};

// GET /api/leads/:id
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid lead ID" });
    }
    const lead = await FranchiseLead.findById(id);
    if (!lead) {
      return res.status(404).json({ status: false, message: "Lead not found" });
    }
    return res.status(200).json({ status: true, data: lead });
  } catch (err) {
    return res.status(500).json({ status: false, message: err.message });
  }
};
