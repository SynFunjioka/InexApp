const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //? This is a FK
    description: { type: String },
    type: { type: String, enum: ['INCOME', 'EXPENSE'], required: true},
    mount: { type: Number, required: true,  min: 0.5 },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

transactionSchema.set("toJSON", { getters: true, virtuals: false });

module.exports = transactionSchema;
module.exports.Transaction = mongoose.model("Transaction", transactionSchema);