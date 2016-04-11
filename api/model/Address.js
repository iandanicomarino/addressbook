var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var AddressSchema = mongoose.Schema({
  personId: {type: ObjectId, unique: true},
  number: Number,
  street: String,
  baranggay: String,
  city: String,
  region: String
});
module.exports = mongoose.model('Address',AddressSchema);
