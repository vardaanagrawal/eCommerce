const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: Object, required: true },
    img: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MobileModel = mongoose.model("mobiles", productSchema);
const LaptopModel = mongoose.model("laptops", productSchema);
const TabletModel = mongoose.model("tablets", productSchema);

module.exports = { MobileModel, LaptopModel, TabletModel };
