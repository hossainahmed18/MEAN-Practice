let mongoose = require('../connection/dbConnection');

let customerSchema = new mongoose.Schema({
   name: String,
   phoneNumber:String,
   email: {
       type: String,
       required: true,
       unique: true
   }
})

module.exports = mongoose.model('customer',customerSchema);