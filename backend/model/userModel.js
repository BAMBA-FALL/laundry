const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Le mot de passe doit comporter au minimum 8 caractères"]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user' 
  },
  token: {
    type: String
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
