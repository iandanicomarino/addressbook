var mongoose = require('mongoose');
var PersonSchema = mongoose.Schema({
  firstname: String,
  middlename: String,
  lastname: String
});
module.exports = mongoose.model('Person',PersonSchema);
