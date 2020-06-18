const mongoose = require("mongoose");
const TokenSchema = mongoose.Schema({
  access_token: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  expires_in: {
    type: String,
    required: true
  },
  token_type: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
// export model user with UserSchema
module.exports = mongoose.model("token", TokenSchema);
