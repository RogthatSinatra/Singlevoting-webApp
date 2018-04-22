const mongoose = require('mongoose');
const keys = require('./keys');

// Map global promises
mongoose.Promise = global.Promise;
// Mongoose Connect
mongoose
  .connect('mongodb://brad:brad@ds249398.mlab.com:49398/mubspoll')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
