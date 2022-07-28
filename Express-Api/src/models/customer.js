let mongoose = require("../connection/dbConnection");

let customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: String,
  imageBase64String: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = mongoose.model("customer", customerSchema);
