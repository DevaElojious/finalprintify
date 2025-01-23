import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import morgan from 'morgan';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import colors from 'colors';

// configure env
dotenv.config();

// database config
connectDB();

// create rest object
const app = express();

// middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes);

// rest api
app.get('/', (req,res) => {
    res.send('<h1>Welcome to the app</h1>');
})

// port
const PORT = process.env.PORT || 5000;

//run and listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`.bgCyan.white);
})