const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// MongoDB connection URI and database name
const mongoURI = 'mongodb://localhost:27017';
const dbName = 'form';
const collectionName = 'contactforms';

// Define an API route to handle form submission
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Create a MongoDB client
    const client = new MongoClient(mongoURI);

    // Connect to the MongoDB server
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Insert the form data into a collection
    const collection = db.collection(collectionName);
    const result = await collection.insertOne({ name, email, message });

    // Close the MongoDB client
    client.close();

    console.log('Form submitted successfully!');
    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
