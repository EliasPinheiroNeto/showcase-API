import "dotenv/config";
import App from "./app/app";
import ProductController from "./app/controllers/productController";
import ManagerController from "./app/controllers/managerController";
import CategoryController from "./app/controllers/categoryController";
import PicturesController from "./app/controllers/picturesController";


const app = new App([
    new ProductController(),
    new ManagerController(),
    new CategoryController(),
    new PicturesController()
], process.env.DEV_PORT)

app.listen()