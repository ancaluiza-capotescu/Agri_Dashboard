const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  }
});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
userSchema.methods.matchPasswords = async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.matchRoles = async function(role){
  return await role == this.role ;
}

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;
