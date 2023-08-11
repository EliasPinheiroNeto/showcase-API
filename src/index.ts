import express from 'express';
import { Express } from 'express'
import dotenv from "dotenv";

// App imports
import connectDB from './database/connection';
import productsRouter from './app/routes/product';

dotenv.config()
connectDB()

const app: Express = express()
app.use(express.json())

// Routes
app.use(productsRouter)

// App launch
app.listen(process.env.DEV_PORT, () => {
    console.log(`Server running on ${process.env.DEV_PORT}`)
})