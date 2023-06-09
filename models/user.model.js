const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports.User = mongoose.model("User", userSchema);
