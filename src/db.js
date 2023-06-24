const { MongoClient } = require('mongodb');

let dbConnection; // Variable to store the database connection

const connectToDb = (cb) => {
  // Function to connect to the MongoDB database
  MongoClient.connect('mongodb://127.0.0.1:27017/form')
    .then((client) => {
      dbConnection = client.db(); // Assigns the connected database to the dbConnection variable
      console.log('Connected to the database');
      return cb(null); // Executes the callback function to indicate a successful connection
    })
    .catch((err) => {
      console.log('Failed to connect to the database:', err); // Logs any error that occurred during the connection
      return cb(err); // Executes the callback function with the error to handle the error case
    });
};

const getDb = () => dbConnection; // Function to retrieve the database connection

module.exports = { connectToDb, getDb };
