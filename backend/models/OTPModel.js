const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  email: String,
  otp: String,
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "5m" },
  },
},
{
  timestamps: true,
});

const OTPModel = mongoose.model("otps", otpSchema);

module.exports = { OTPModel };
