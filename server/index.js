import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';


dotenv.config(); // Load environment variables

const app = express();

// Using Express built-in body parsing instead of body-parser set till 30mb [Middlewares]
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Add a simple health check endpoint for Kubernetes readiness probe
app.get('/health', (req, res) => {
  // Check if MongoDB is connected
  if (mongoose.connection.readyState === 1) {
    res.status(200).send('OK');
  } else {
    res.status(500).send('MongoDB not connected');
  }
});

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT} and connected to MongoDB`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);