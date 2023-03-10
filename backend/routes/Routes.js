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
  placeOrder,
} = require("../controllers/customerController");

router.get("/customer/:id", getCustomer);
router.post("/customer/cart", updateCart);
router.get("/customer/cart/:id", getCart);
router.post("/customer/cart/removeItem", removeItemFromCart);

router.post("/customer/update/name", updateCustomerName);
router.post("/customer/update/password", updateCustomerPassword);
router.post("/customer/delete", deleteCustomer);
router.post("/customer/deliveryAddress", addDeliveryAddress);
router.post("/customer/update/orders", placeOrder);

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

//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

const {
  postProduct,
  getProduct,
  postProductBrand,
  getProductBrand,
  updateProductImg,
} = require("../controllers/AdminProductController");

router.post("/productBrand/:type", postProductBrand);
router.get("/productBrand/:type", getProductBrand);
router.post("/product/:type", postProduct);
router.get("/product/:type", getProduct);
router.post("/productImg/update/:type", updateProductImg);

module.exports = router;
