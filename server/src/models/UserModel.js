import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    verified: { type: Boolean, required: true, default: false },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Pre-save middleware to hash the password before saving the user
UserSchema.pre("save", async function (next) {
  // If the password is modified (or is a new document), hash it
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare hashed password with input password
UserSchema.methods.comparePassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password); // Compare passwords
};

const User = mongoose.model("User", UserSchema);

export default User;
