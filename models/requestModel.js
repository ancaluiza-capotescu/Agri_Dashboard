const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    minlength: 3
  },
  name: {
    type: String,
  },
  owner: {
    type: String,
  },
  CUI: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    minlength: 3
  },
  approved: {
    type: Boolean
  }
});
requestSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
requestSchema.methods.matchPasswords = async function(password){
  return await bcrypt.compare(password,this.password);
}

requestSchema.methods.matchRoles = async function(role){
  return await role == this.role ;
}



const Request = mongoose.model('request', requestSchema);
module.exports = Request;
