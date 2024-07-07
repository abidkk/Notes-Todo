const mongoose = require('mongoose');
// const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting...");
    return;
  }

  try {
    mongoose.connect(`mongodb+srv://devabidkk:l9SvenYA193w9dPt@cluster0.sf8wswn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
      dbName: "notes_app",
      bufferCommands: true,
    });
    console.log("Connected");
  } catch (err) {
    console.log("Error: ", err);
    throw new Error("Error: ", err);
  }
};


module.exports = connect;


// const mongoose = require('mongoose');
// require('dotenv').config(); // Ensure this is included

// const connectDB = async () => {
//     try {
//         const MONGODB_URI = process.env.MONGODB_URI;
//         if (!MONGODB_URI) {
//             throw new Error('MONGODB_URI is not defined');
//         }
//         await mongoose.connect(MONGODB_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//             useCreateIndex: true
//         });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
