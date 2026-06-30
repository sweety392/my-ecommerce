import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  title: String,

  brand: String,

  price: Number,
  

  images: [
    {
url:{
  type:String,
    },
  }
    









  
  ],

});

export default mongoose.models.Product ||
mongoose.model("Product", productSchema);