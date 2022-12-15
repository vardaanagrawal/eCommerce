const {
  MobileModel,
  LaptopModel,
  TabletModel,
} = require("../models/ProductModel");
const { ProductBrandModel } = require("../models/ProductBrandModel");
const ObjectId = require("mongoose").Types.ObjectId;

const getRandomProducts = async (req, res) => {
  const mobileData = await MobileModel.aggregate([{ $sample: { size: 10 } }]);
  const laptopData = await LaptopModel.aggregate([{ $sample: { size: 10 } }]);
  const tabletData = await TabletModel.aggregate([{ $sample: { size: 10 } }]);
  res.send({
    mobileData: mobileData,
    laptopData: laptopData,
    tabletData: tabletData,
  });
};

const getDevice = async (req, res) => {
  const type = req.params.type;
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    if (type === "mobiles") {
      var data = await MobileModel.findById(id);
    } else if (type === "laptops") {
      var data = await LaptopModel.findById(id);
    } else if (type === "tablets") {
      var data = await TabletModel.findById(id);
    }
    if (!data) {
      res.send({ success: false, message: "No product found" });
    } else {
      res.send({ success: true, data: data });
    }
  } else {
    res.send({ success: false, message: "No product found" });
  }
};

const getAllDevices = async (req, res) => {
  const type = req.params.type;
  if (type === "mobiles") {
    var data = await MobileModel.find({});
  } else if (type === "laptops") {
    var data = await LaptopModel.find({});
  } else if (type === "tablets") {
    var data = await TabletModel.find({});
  }
  res.send(data);
};

const getBrands = async (req, res) => {
  const type = req.params.type;
  const data = await ProductBrandModel.findOne({ type: type });
  res.send(data.brand);
};

module.exports = { getRandomProducts, getDevice, getAllDevices, getBrands };
