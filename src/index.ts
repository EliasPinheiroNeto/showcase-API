import "dotenv/config";
import App from "./app/app";
import ProductController from "./app/controllers/productController";
import ManagerController from "./app/controllers/managerController";


const app = new App([
    new ProductController(),
    new ManagerController()
], process.env.DEV_PORT)

app.listen()