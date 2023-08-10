const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    requied: [true, "Please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    requied: [true, "Please Enter Product Description"],
  },
  price: {
    type: Number,
    requied: [true, "Please Enter Product Price"],
    maxLength: [8, "Price canoot be exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        requied: true,
      },
      url: {
        type: String,
        requied: true,
      },
    },
  ],
  category: {
    type: String,
    requied: [true, "Please Enter  product category"],
  },
  Stock: {
    type: Number,
    requied: [true, "Please Enter product Stock"],
    maxLength: [4, "Stock canoot exceed 4 character"],
    default: 1, 
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    { 
      user: {
        type:mongoose.Schema.ObjectId,
        ref:"User",
        requied:true,
      },
      name: {
        type: String,
        requied: true,
      },
      rating: {
        type: String,
        requied: true,
      },
      comment: {
        type: String,
        requied: true,
      },
    },
  ],

  user: {
    type:mongoose.Schema.ObjectId,
    ref:"User",
    requied:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
