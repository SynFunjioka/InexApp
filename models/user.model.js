const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.set("toJSON", { getters: true, virtuals: false });

module.exports.User = mongoose.model("User", userSchema);
