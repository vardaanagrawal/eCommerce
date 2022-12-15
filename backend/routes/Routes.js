const express = require("express");
const router = express.Router();

//-------------------------------------------------------------------
const { signup, login, sendOTP } = require("../controllers/AuthController");

router.post("/customer/signup", signup);
router.post("/customer/login", login);
router.post("/customer/OTP", sendOTP);

//----customer routes-----------------------------------------------------------------------

const {
  getCustomer,
  updateCart,
  getCart,
  removeItemFromCart,
  updateCustomerName,
  updateCustomerPassword,
  deleteCustomer,
  addDeliveryAddress,
} = require("../controllers/customerController");

router.get("/customer/:id", getCustomer);
router.post("/customer/cart", updateCart);
router.get("/customer/cart/:id", getCart);
router.post("/customer/cart/removeItem", removeItemFromCart);

router.post("/customer/update/name", updateCustomerName);
router.post("/customer/update/password", updateCustomerPassword);
router.post("/customer/delete", deleteCustomer);
router.post("/customer/deliveryAddress", addDeliveryAddress);

//----product routes-----------------------------------------------------------------------

const {
  getRandomProducts,
  getDevice,
  getAllDevices,
  getBrands,
} = require("../controllers/productController");

router.get("/product/random", getRandomProducts);
router.get("/product/:type/:id", getDevice);
router.get("/products/:type/all", getAllDevices);
router.get("/products/brands/:type", getBrands);

module.exports = router;
