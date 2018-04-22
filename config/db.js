const mongoose = require('mongoose');
const keys = require('./keys');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
  .connect('mongodb://<user>:<your Uri>@ds249398.mlab.com:49398/<database name>')
  .then(() => console.log('MongoDB hiring'))
  .catch(err => console.log(err));
