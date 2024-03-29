import { Router, Request, Response } from 'express'
import Product from '../../database/models/Product'
import IController from './IController';
import authorize from '../middlewares/authorize';
import { Error, isValidObjectId } from 'mongoose';
import { resolve } from 'path';
import { existsSync, unlinkSync } from 'fs';

class ProductController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/products', this.getProducts)
        this.router.get('/products/:categoryId', this.getProductsByCategory)
        this.router.get('/product/:id', this.getProductById)
        this.router.post('/product', authorize, this.createProduct)
        this.router.patch('/product', authorize, this.updateProduct)
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

    async updateProduct(req: Request, res: Response) {
        const body = req.body

        try {
            if (!isValidObjectId(body.id)) {
                return res.status(400).send({ error: `ID recived is not valid` })
            }

            const product = await Product.findByIdAndUpdate(body.id, body, { new: true, })
            if (!product) {
                return res.status(404).send({ err: `Product not found` })
            }

            res.send(product)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }

    async getProducts(req: Request, res: Response) {
        try {
            const products = await Product.find().populate('category')

            res.send(products)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }

    async getProductsByCategory(req: Request, res: Response) {
        const categoryId = req.params.categoryId
        try {
            const products = await Product.find({ category: categoryId }).populate('category')

            res.send(products)
        } catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }

    async getProductById(req: Request, res: Response) {
        const id = req.params.id

        try {
            const product = await Product.findById(id).populate('category')

            if (!product) {
                return res.status(404).send({ error: "Product not found" })
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
            const product = await Product.findById(id)
            if (!product) {
                return res.status(400).send({ error: "Product not found" })
            }

            const response: { status: string, imagesResults: string[] } = {
                status: '',
                imagesResults: []
            }

            if (product.pictures.length >= 1) {
                const uploadPath: string = resolve('./src/database/uploads')

                product.pictures.forEach((pic: string) => {
                    if (existsSync(`${uploadPath}/${pic}`)) {
                        return unlinkSync(`${uploadPath}/${pic}`)
                    }

                    response.imagesResults.push(`Image ${pic} not found`)
                })
            }

            await Product.deleteOne({ _id: id })
            response.status = 'Product deleted'
            return res.send(response)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }
}

export default ProductController