const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

// const mongoose = require('mongoose');

// // Define the URI of your MongoDB database
// const uri = '';

// // Connect to MongoDB using Mongoose
// mongoose.connect(uri, { useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Your code here
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error.message);
//   });

module.exports = connectDB
