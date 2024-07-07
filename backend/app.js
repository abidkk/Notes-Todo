const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');
const path = require('path'); // Node.js path module
const app = express();
connectDB();

app.use(cors());
app.use(express.json());



// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/notes', noteRoutes);

module.exports = app;
