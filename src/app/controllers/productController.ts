import { Router, Request, Response } from 'express'
import Product from '../../database/models/Product'
import IController from './IController';

class ProductController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/products', this.getProducts)
        this.router.get('/product/:id', this.getProductById)
        this.router.post('/product', this.createProduct)
    }

    async createProduct(req: Request, res: Response) {
        const body = req.body

        const product = new Product(body)

        await product.save()
        res.send(product)
    }

    async getProducts(req: Request, res: Response) {
        const products = await Product.find()

        res.send(products)
    }

    async getProductById(req: Request, res: Response) {
        const id = req.params.id
        const product = await Product.findById(id)

        res.send(product)
    }
}


// export default {
//     async createProduct(req: Request, res: Response) {
//         const body = req.body

//         const product = new Product(body)

//         await product.save()
//         res.send(product)
//     },

//     async getProducts(req: Request, res: Response) {
//         const products = await Product.find()

//         res.send(products)
//     }
// }

export default ProductController