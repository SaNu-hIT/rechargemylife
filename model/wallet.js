const mongoose = require("mongoose");
const WalletSchema = mongoose.Schema({
  shopId: {
    type: String,
    required: true
  },
  wallet_amount: {
    type: String,
    required: true
  },
  wallet_balance: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
// export model user with UserSchema
module.exports = mongoose.model("wallet", WalletSchema);
