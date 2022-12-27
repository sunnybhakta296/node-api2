const mongoose = require('mongoose');
// const {customAlphabet} = require("nanoid");

// const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
const nanoid = require('nanoid')
const id= nanoid(10)


const productSchema = new mongoose.Schema(
    {
      productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${id}`,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
const ProductModel = mongoose.model("Product", productSchema)
module.exports = ProductModel