const { CustomerModel } = require("../models/CustomerModel");
const {
  MobileModel,
  LaptopModel,
  TabletModel,
} = require("../models/ProductModel");
const bcrypt = require("bcryptjs");

const getCustomer = async (req, res) => {
  const id = req.params.id;
  const user = await CustomerModel.findById(id);
  if (!user) {
    res.send({ success: false, message: "No user found" });
  } else {
    res.send({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        cart: user.cart,
        orders: user.orders,
      },
    });
  }
};

const updateCart = async (req, res) => {
  //console.log(req.body.customerID);
  const id = req.body.customerID;
  const productID = req.body.productID;
  const type = req.body.type;
  const quantity = req.body.quantity;
  const user = await CustomerModel.findOne({
    _id: id,
    "cart.productID": productID,
  });
  if (user) {
    if (quantity) {
      await CustomerModel.findOneAndUpdate(
        {
          _id: id,
          "cart.productID": productID,
        },
        {
          $set: { "cart.$.quantity": quantity },
        }
      );
    } else {
      await CustomerModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $pull: {
            cart: {
              productID: productID,
            },
          },
        }
      );
    }
  } else {
    await CustomerModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: {
          cart: {
            productID: productID,
            quantity: quantity,
            type: type,
          },
        },
      }
    );
  }
  //--------------------------------------------------------------------------------------
  const user2 = await CustomerModel.findById(id);
  var data = [];
  if (!user2.cart.length) {
    res.send({ sucess: true, cart: [] });
  }
  user2.cart.map(async (item, index) => {
    if (item.type === "mobiles") {
      data.push({
        device: await MobileModel.findById(item.productID),
        qty: item.quantity,
      });
    } else if (item.type === "laptops") {
      data.push({
        device: await LaptopModel.findById(item.productID),
        qty: item.quantity,
      });
    } else if (item.type === "tablets") {
      data.push({
        device: await TabletModel.findById(item.productID),
        qty: item.quantity,
      });
    }
    if (data.length === user2.cart.length) {
      res.send({ success: true, cart: data });
    }
  });
};

const getCart = async (req, res) => {
  const id = req.params.id;
  const user2 = await CustomerModel.findById(id);
  var data = [];
  user2.cart.map(async (item, index) => {
    if (item.type === "mobiles") {
      data.push({
        device: await MobileModel.findById(item.productID),
        qty: item.quantity,
      });
    } else if (item.type === "laptops") {
      data.push({
        device: await LaptopModel.findById(item.productID),
        qty: item.quantity,
      });
    } else if (item.type === "tablets") {
      data.push({
        device: await TabletModel.findById(item.productID),
        qty: item.quantity,
      });
    }
    if (data.length === user2.cart.length) {
      res.send(data);
    }
  });
  if (!user2.cart.length) {
    res.send([]);
  }
};

const updateCustomerName = async (req, res) => {
  const user = await CustomerModel.findByIdAndUpdate(
    { _id: req.body.id },
    { name: req.body.name }
  );
  const c = await CustomerModel.findById({ _id: req.body.id });
  res.send({
    success: true,
    data: {
      id: c._id,
      name: c.name,
      email: c.email,
      address: c.address,
      cart: c.cart,
      orders: c.orders,
    },
  });
};

const updateCustomerPassword = async (req, res) => {
  const user = await CustomerModel.findById({ _id: req.body.id });
  const passwordMatch = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );
  if (passwordMatch) {
    const salt = await bcrypt.genSalt(10);
    const newPassword = await bcrypt.hash(req.body.newPassword, salt);
    await CustomerModel.findByIdAndUpdate(
      { _id: req.body.id },
      {
        password: newPassword,
      }
    ).then(() => {
      res.send({ success: true, message: "Password Updated" });
    });
  } else {
    res.send({ success: false, message: "Old password is incorrect" });
  }
};

const deleteCustomer = async (req, res) => {
  const a = await CustomerModel.findByIdAndDelete(req.body.id);
  res.send({ success: true });
};

const removeItemFromCart = async (req, res) => {
  const a = await CustomerModel.findByIdAndUpdate(
    {
      _id: req.body.customerID,
    },
    {
      $pull: { cart: { productID: req.body.productID } },
    }
  );
  res.send({ success: true });
};

const addDeliveryAddress = async (req, res) => {
  const id = req.body.id;
  console.log(req.body.data);
  const a = await CustomerModel.findByIdAndUpdate(
    { _id: id },
    {
      $push: { address: req.body.data.data },
    }
  );
  res.send({ success: true, message: "address added successfully" });
};

const placeOrder = async (req, res) => {
  const id = req.body.id;
  const user = await CustomerModel.findByIdAndUpdate(
    { _id: id },
    {
      $push: { orders: req.body.data },
    }
  );
  res.send({ success: true, message: "order placed" });
};

module.exports = {
  getCustomer,
  updateCart,
  getCart,
  updateCustomerName,
  updateCustomerPassword,
  deleteCustomer,
  removeItemFromCart,
  addDeliveryAddress,
  placeOrder,
};
