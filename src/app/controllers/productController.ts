import { Router, Request, Response } from 'express'
import Product from '../../database/models/Product'
import IController from './IController';
import authorize from '../middlewares/authorize';
import { Error } from 'mongoose';

class ProductController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/products', this.getProducts)
        this.router.get('/product/:id', this.getProductById)
        this.router.post('/product', authorize, this.createProduct)
        this.router.delete('/product', authorize, this.deleteProductById)
    }

    async createProduct(req: Request, res: Response) {
        const body = req.body

        try {
            const product = new Product(body)

            await product.save()
            res.send(product)
        } catch (err) {
            if (err instanceof Error.ValidationError) {
                const error: Error.ValidationError = err
                const keys = Object.keys(error.errors) as Array<keyof typeof Error.ValidatorError>

                const errors = {} as typeof Error.ValidatorError
                keys.forEach((key) => {
                    const erro = error.errors[key] as Error.ValidatorError
                    errors[key] = erro.message
                })

                return res.status(400).send(errors)
            }

            return res.status(400).send(err)
        }
    }

    async getProducts(req: Request, res: Response) {
        try {
            const products = await Product.find().populate('category')

            res.send(products)
        } catch (err) {
            console.log(err)
            res.send({ err })
        }
    }

    async getProductById(req: Request, res: Response) {
        const id = req.params.id

        try {
            const product = await Product.findById(id).populate('category')

            if (!product) {
                return res.status(400).send({ error: "Product not found" })
            }

            res.send(product)

        } catch (err) {
            console.log(err)
            res.send({ err })
        }
    }

    async deleteProductById(req: Request, res: Response) {
        const id: string = req.body.id

        try {
            const del = await Product.deleteOne({ _id: id })

            if (del.deletedCount >= 1) {
                return res.send({ response: "Product deleted" })
            }

            res.send({ response: "no product deleted" })
        } catch (err) {
            console.log(err)
            res.send({ err })
        }
    }
}

export default ProductController