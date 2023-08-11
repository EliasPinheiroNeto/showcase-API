import express from 'express';
import { Express, Request, Response } from 'express'
import * as dotenv from "dotenv";

import connectDB from './database/index';
import productsRouter from './app/routes/product';

connectDB()

dotenv.config()

const app: Express = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Application running")
})


app.use(productsRouter)


app.listen(process.env.DEV_PORT, () => {
    console.log(`Server running on ${process.env.DEV_PORT}`)
})