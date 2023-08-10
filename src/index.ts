import express from 'express';
import { Express, Request, Response } from 'express'
import * as dotenv from "dotenv";

dotenv.config()

const app: Express = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send("Application running")
})

app.listen(process.env.DEV_PORT, () => {
    console.log(`Server running on ${process.env.DEV_PORT}`)
})