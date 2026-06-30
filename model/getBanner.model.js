import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({

  image: {

    type: String,

    required: true,
  },

  title: {

    type: String,
  },

  description: {

    type: String,
  },
});

const BannerModel =

  mongoose.models.Banner ||

  mongoose.model(
    "Banner",
    bannerSchema
  );

export default BannerModel;