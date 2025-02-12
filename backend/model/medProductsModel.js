const mongoose = require("mongoose");

const medProductSchema = mongoose.Schema({
  title: String,
  price: Number,
  originalPrice: Number,
  discount: String,
  description: String,
  seller: String,
  category: String,
  image: String,
  rating: {
    rate: Number,
    count: Number,
  },
});

const medProductModel = mongoose.model("medProducts", medProductSchema);

module.exports = medProductModel;
