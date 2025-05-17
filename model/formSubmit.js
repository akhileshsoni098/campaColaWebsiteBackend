const mongoose = require("mongoose");
const { Schema } = mongoose;

const franchiseLeadSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    businessType: {
      type: String,
      enum: ["franchise", "reseller", "distributor", "other"],
      required: [true, "Business type is required"],
    },
    investmentRange: {
      type: String,
      required: [true, "Investment range is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },
    businessVision: {
      type: String,
      required: [true, "Business vision is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const franchiseleadModel = mongoose.model("FranchiseLead", franchiseLeadSchema);

module.exports = franchiseleadModel;