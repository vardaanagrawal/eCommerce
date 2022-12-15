const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);
const cartSchema = mongoose.Schema(
  {
    productID: { type: String, required: true },
    quantity: { type: Number, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);
const ordersSchema = mongoose.Schema(
  { productID: { type: String, required: true } },
  { timestamps: true }
);
const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    address: [addressSchema],
    cart: [cartSchema],
    orders: [ordersSchema],
  },
  { timestamps: true }
);

const CustomerModel = mongoose.model("customers", customerSchema);
module.exports = { CustomerModel };
