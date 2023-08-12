import "dotenv/config";
import App from "./app/app";
import ProductController from "./app/controllers/productController";
import ManagerController from "./app/controllers/managerController";
import CategoryController from "./app/controllers/categoryController";


const app = new App([
    new ProductController(),
    new ManagerController(),
    new CategoryController()
], process.env.DEV_PORT)

app.listen()