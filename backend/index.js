import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import articleRoutes from './routes/articleRoutes.js'; 
import register from './routes/register.js';
import SigninRouter from './routes/signinRoutes.js';
import authorRoutes from "./routes/authorRoutes.js"
import searchRouter from "./routes/search.js";
import dotenv from 'dotenv';
dotenv.config();


// helmet for API security, and morgan for logging API requests
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(express.json()); //It tells Express to automatically parse incoming JSON data in the request body and make it available in req.body.
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));  //need to review
app.use(morgan('common'));


// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Route setup
app.use("/api", articleRoutes);
app.use("/register", register);
app.use("/", SigninRouter);
app.use("/users", authorRoutes); 
app.use("/search", searchRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));