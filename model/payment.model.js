// models/payment.model.js

import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    // Kis user ne payment ki
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // User details
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Payment details
    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
    },

    // Razorpay Order ID
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // Razorpay Payment ID
    paymentId: {
      type: String,
      default: null,
    },

    // Razorpay Signature
    razorpaySignature: {
      type: String,
      default: null,
    },

    // Payment Method
    paymentMethod: {
      type: String,
      enum: [
        "upi",
        "card",
        "netbanking",
        "wallet",
        "emi",
      ],
      default: "upi",
    },

    // Payment Status
    status: {
      type: String,
      enum: [
        "pending",
        "success",
        "failed",
        "cancelled",
      ],
      default: "pending",
    },

    // Optional description
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Payment =
  mongoose.models.Payment ||
  mongoose.model("Payment", paymentSchema);

export default Payment;