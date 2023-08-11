import "dotenv/config";
import './database/connection';
import App from "./app/app";
import ProductController from "./app/controllers/productController";


const app = new App([
    new ProductController()
], process.env.DEV_PORT)

app.listen()