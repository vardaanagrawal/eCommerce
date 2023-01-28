const { CustomerModel } = require("../models/CustomerModel");
const { OTPModel } = require("../models/OTPModel");
const bcrypt = require("bcryptjs");
var nodemailer = require("nodemailer");

//-----------------------------------------------------------------------------------------
const signup = async (req, res) => {
  const otp = req.body.otp;
  const otpID = req.body.otpID;
  const userData = req.body.userData;
  const validOTP = await checkOTP(otpID, otp);
  if (!validOTP.success) {
    res.send(validOTP);
  } else {
    const userExist = await CustomerModel.findOne({ email: userData.email });
    if (userExist) {
      res.send({ success: false, message: "User Already Registered" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(userData.password, salt);
      const newUser = new CustomerModel({
        name: userData.name,
        email: userData.email,
        password: password,
        address: [],
        cart: [],
        orders: [],
      });
      const user = await newUser.save();
      res.send({
        success: true,
        message: "User Registered Successfully",
        userId: user._id,
      });
    }
  }
};

//-----------------------------------------------------------------------------------------
const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const userExist = await CustomerModel.findOne({ email: email });
  if (!userExist) {
    res.send({ success: false, message: "Invalid Credential" });
  } else {
    const passwordMatch = await bcrypt.compare(password, userExist.password);
    if (!passwordMatch) {
      res.send({ success: false, message: "Invalid Credential" });
    } else {
      res.send({
        success: true,
        message: "Login Successfull",
        userId: userExist._id,
      });
    }
  }
};

//-----------------------------------------------------------------------------------------
const sendOTP = async (req, res) => {
  const customerExist = await CustomerModel.findOne({
    email: req.body.email,
  });
  if (customerExist) {
    res.send({
      success: false,
      message: "This email is already registered.",
    });
  } else {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "agrawalvardaan85@gmail.com",
        pass: "rixlhcribeykqygz",
      },
    });
    var otp = Math.floor(100000 + Math.random() * 900000);
    var mailOptions = {
      from: "agrawalvardaan85@gmail.com",
      to: req.body.email,
      subject: "Email Verification",
      text: `OTP: ${otp}`,
    };
    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.log(error);
      } else {
        const newOTP = new OTPModel({
          email: req.body.email,
          otp: otp,
        });
        newOTP
          .save()
          .then(
            res.send({ success: true, message: "OTP sent", otpID: newOTP._id })
          );
      }
    });
  }
};

//-----------------------------------------------------------------------------------------
const checkOTP = async (otpID, otp) => {
  const validOTP = await OTPModel.findById({ _id: otpID });
  if (!validOTP) {
    return { success: false, message: "OTP Expired" };
  } else {
    if (validOTP.otp != otp) {
      return { success: false, message: "Incorrect OTP" };
    } else {
      await OTPModel.findByIdAndDelete(otpID);
      return { success: true };
    }
  }
};

module.exports = { signup, login, sendOTP };
