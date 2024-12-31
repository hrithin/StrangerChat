import mongoose from "mongoose";

// OTP Schema
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,  // Automatically adds createdAt and updatedAt
  }
);

// TTL Index to expire OTP after 5 minutes (300 seconds)
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

// Static method to generate OTP
otpSchema.statics.generateOTP = function () {
    return Math.floor(1000 + Math.random() * 9000);  // 4-digit OTP
};
  

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;
