const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const bcrypt = require('bcrypt');

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

// Apply Passport-Local Mongoose plugin for simplified authentication
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });

// Hash password before saving
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

// Define Session schema
const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  token: String,
  expires: Date
});

// Define User model
const User = mongoose.model('User', userSchema);

// Define Session model
const Session = mongoose.model('Session', sessionSchema);

module.exports = {
  User,
  Session
};

