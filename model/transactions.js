const mongoose = require("mongoose");
const RechargeSchema = mongoose.Schema({
  operatorId: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  operatorName: {
    type: String,
    required: true
  },
  shopId: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  customIdentifier: {
    type: String,
    required: true
  },
  recipientPhone: {
    type: String,
    required: false
  },
  recipientCountryCode: {
    type: String,
    required: false
  },
  recipientNumber: {
    type: String,
    required: true
  },
  senderPhone: {
    type: String,
    required: true
  },
  senderCountryCode: {
    type: String,
    required: true
  },
  senderNumber: {
    type: String,
    required: false
  },
  success: {
    type: Boolean(),
    required: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
// export model user with UserSchema
module.exports = mongoose.model("recharge", RechargeSchema);
