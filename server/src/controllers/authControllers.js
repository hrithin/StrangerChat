
import { User } from "../models/index.js";
import Otp from "../models/OtpModel.js";
import AppError from "../utils/AppError.js";
import { jwtSign } from "../utils/jwtUtils.js";
import { sendEmail } from "../utils/mailer.js";
import { otpEmailTemplate } from "../utils/otpTemplate.js";



const registerUserController = async (req, res, next) => {
  const { name, email, password, gender } = req.body;

  if (!name || !email || !password || !gender)
    return next(new AppError(400, "every field is required"));

  // Check if the email is already registered
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError(400, "Email is already registered."));
  }

  const newUser = new User({
    name,
    email,
    gender,
    role: "user",
    verified: false,
    password, // Password will be hashed by the pre-save middleware
  });

  await newUser.save();

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      verified: newUser.verified,
    },
  });
};

const loginUserController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new AppError(400, "every field is required"));

  const userData = await User.findOne({ email });

  if (!userData) {
    return next(new AppError(400, "This Email is No Registered"));
  }

  const isMatch = await userData.comparePassword(password);

  if (!isMatch) {
    return next(new AppError(401, "Invalid email or password"));
  }

  //making jwt token
  const token = jwtSign({
    id: userData._id,
    name: userData.name,
    email: userData.email,
    gender: userData.gender,
    role: userData.role,
    verified:userData.verified
  });

  // send cookie before sending response
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN),
  });

  res.status(200).json({
    message: "Login successful",
    user: {
      id: userData._id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      verified:userData.verified
    },
  });
};

const logoutUserController = async (req, res, next) => {
  // 1. Clear the "token" cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  // 2. Send success response
  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const profileCheck = (req, res, next) => {
  const user = req?.user;

  res.status(200).json(user);
};

 const sentOtpController = async (req, res, next) => {
  const userEmail = req.user.email;
 console.log(userEmail,"<<<<<<<<<")
  // Generate OTP and store in DB
  const otpCode = Otp.generateOTP();
  const otp = await Otp.create({ email: userEmail, otp: otpCode });

  // Send OTP Email
  const subject = "Your OTP Code : Stranger Chat";
  const html = otpEmailTemplate(otpCode);

  try {
    await sendEmail(userEmail, subject, "hi", html);
    res.status(200).json({
      message: "OTP sent successfully",
      otpId: otp._id,
    });
  } catch (error) {
    console.error("Failed to send OTP:", error);

    // Delete OTP if email fails to send
    await Otp.deleteOne({ _id: otp._id });
    next(new AppError(500, "Failed to send OTP. Please try again later."));
  }
};


const verifyOtpController = (req, res, next) => {

  

};


export {
  registerUserController,
  loginUserController,
  profileCheck,
  logoutUserController,
  sentOtpController,
  verifyOtpController
};
