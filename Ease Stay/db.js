const mongoose = require('mongoose');

var mongoURL = 'mongodb://127.0.0.1:27017/Hotel';

mongoose.connect(mongoURL , {
  useUnifiedTopology :true,
  useNewUrlParser :true
});

var connection = mongoose.connection;

connection.on('error',()=>{
  console.log("Mongo Db connection failed")
});

connection.on('connected',()=>{
  console.log('mongo db connection sucessfull')
});

module.exports = mongoose;