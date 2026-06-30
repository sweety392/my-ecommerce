import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({

  email: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
    required: true,
  },

  expiresAt: {
    type: Date,
    required: true,
  },

});

const OTPModel =

  mongoose.models.otps ||

  mongoose.model(
    "otps",
    otpSchema
  );

// IMPORTANT

export default OTPModel;