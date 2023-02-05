const {
  MobileModel,
  LaptopModel,
  TabletModel,
} = require("../models/ProductModel");
const { ProductBrandModel } = require("../models/ProductBrandModel");

const postProduct = async (req, res) => {
  const type = req.params.type;
  const data = {
    brand: req.body.brand,
    name: req.body.name,
    details: req.body.details,
    img: req.body.img,
  };
  if (type == "Mobile") {
    var newDevice = new MobileModel(data);
  } else if (type == "Laptop") {
    var newDevice = new LaptopModel(data);
  } else if (type == "Tablet") {
    var newDevice = new TabletModel(data);
  }
  newDevice.save().then(() => {
    res.send({ success: true, message: "Product added successfully" });
  });
};

const getProduct = async (req, res) => {
  const type = req.params.type;
  if (type == "Mobile") {
    var data = await MobileModel.find({});
  } else if (type == "Laptop") {
    var data = await LaptopModel.find({});
  } else if (type == "Tablet") {
    var data = await TabletModel.find({});
  }
  res.send(data);
};

const postProductBrand = async (req, res) => {
  const type = req.params.type;
  const typeExist = await ProductBrandModel.findOne({ type: type });
  if (!typeExist) {
    const newProductType = new ProductBrandModel({
      type: type,
      brand: [{ name: req.body.name }],
    });
    newProductType.save().then(() => {
      res.send({ success: true, message: "Brand Added Successfully" });
    });
  } else {
    const brandExist = await ProductBrandModel.findOne({
      type: type,
      "brand.name": req.body.name,
    });
    if (!brandExist) {
      await ProductBrandModel.findByIdAndUpdate(typeExist._id, {
        $push: { brand: { name: req.body.name } },
      });
      res.send({ success: true, message: "Brand Added Successfully" });
    } else {
      res.send({ success: false, message: "Brand Already Added" });
    }
  }
};

const getProductBrand = async (req, res) => {
  const type = req.params.type;
  const data = await ProductBrandModel.findOne({ type: type });
  console.log(type);
  res.send(data);
};

const updateProductImg = async (req, res) => {
  const id = req.body.id;
  const img = req.body.img;
  const type = req.params.type;

  if (type == "Mobile") {
    var data = await MobileModel.findByIdAndUpdate({ _id: id }, { img: img });
  } else if (type == "Laptop") {
    var data = await LaptopModel.findByIdAndUpdate({ _id: id }, { img: img });
  } else if (type == "Tablet") {
    var data = await TabletModel.findByIdAndUpdate({ _id: id }, { img: img });
  }
  res.send(data);
};

module.exports = {
  postProduct,
  getProduct,
  postProductBrand,
  getProductBrand,
  updateProductImg,
};
