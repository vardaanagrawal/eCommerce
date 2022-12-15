const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const productBrandSchema = new mongoose.Schema({
  type: { type: String, required: true },
  brand: [brandSchema],
});

const ProductBrandModel = mongoose.model("productBrands", productBrandSchema);

module.exports = { ProductBrandModel };
