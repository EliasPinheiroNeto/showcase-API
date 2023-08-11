import App from "./app/app";
import ProductController from "./app/controllers/productController";
import dotenv from "dotenv";
import connectDB from './database/connection';

dotenv.config()
connectDB()

const app = new App([
    new ProductController()
], process.env.DEV_PORT)

app.listen()