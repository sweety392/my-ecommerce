import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema({

    fullName: {

      type: String,

      required: true,
    },

    email: {

      type: String,

      required: true,

      unique: true,
    },

    password: {

      type: String,

      required: true,
    },

    // ================= ROLE =================

    role: {

      type: String,

      enum: [
        "user",
        "admin",
      ],

      default: "user",
    },

  });

const UserModel =

  mongoose.models.User ||

  mongoose.model(
    "User",
    userSchema
  );

export default UserModel;