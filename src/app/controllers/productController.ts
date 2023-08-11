import { Request, Response } from 'express'
import { Product, IProduct } from "../../database/models/Product";


export default {
    async createProduct(req: Request, res: Response) {
        const body = req.body

        const product = new Product(body)

        await product.save()
        res.send(product)
    },

    async getProducts(req: Request, res: Response) {
        const products = await Product.find()

        res.send(products)
    }
}