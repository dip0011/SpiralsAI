const express = require('express');
const cors = require('cors');

// Connect to MongoDB
require("./db/mongoose");

const app = express();
app.use(cors());

const ImageGenerationRoutes = require('./routes/ImageGeneration');
app.use(express.json());
app.use('/imageGeneration', ImageGenerationRoutes);

// Start the server
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});