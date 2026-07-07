// User.js - Mongoose schema for a user account
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // no two users can share an email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  { timestamps: true } // adds createdAt / updatedAt automatically
);

// --- Mongoose "pre-save hook" ---
// This runs automatically right before a user document is saved.
// We use it to hash the password so we NEVER store plain text passwords.
userSchema.pre("save", async function (next) {
  // Only hash the password if it was actually changed (or is new)
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10); // generates random data to make the hash unique
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// --- Instance method ---
// Lets us do `user.comparePassword(plainTextPassword)` in the login controller
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
