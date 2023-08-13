import { Request, Response, Router } from 'express'
import IController from './IController'
import Category from '../../database/models/Category'
import authorize from '../middlewares/authorize'
import Product from '../../database/models/Product'
import { resolve } from 'path'
import { existsSync, unlinkSync } from 'fs'
import { isValidObjectId } from 'mongoose'

class CategoryController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/categories', this.getCategories)
        this.router.post('/category', authorize, this.createCategory)
        this.router.patch('/category', authorize, this.updateCategory)
        this.router.delete('/category', authorize, this.deleteCategoryById)
    }

    async createCategory(req: Request, res: Response) {
        const body = req.body

        try {
            const category = new Category(body)

            await category.save()
            res.send(category)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }

    async updateCategory(req: Request, res: Response) {
        const body = req.body

        try {
            if (!isValidObjectId(body.id)) {
                return res.status(400).send({ error: `ID recived is not valid` })
            }

            const category = await Category.findByIdAndUpdate(body.id, body, { new: true })
            if (!category) {
                res.status(404).send({ error: "Category not found" })
            }

            res.send(category)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await Category.find()

            res.send(categories)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }

    async deleteCategoryById(req: Request, res: Response) {
        const id: string = req.body.id
        const newCategoryId: string = req.body.newCategoryId

        try {
            const category = await Category.findById(id)

            if (!category) {
                return res.status(400).send({ error: "No category found" })
            }

            await Category.findByIdAndDelete(id)

            if (!newCategoryId) {
                const products = await Product.find({ category: id })
                const uploadPath = resolve('./src/database/uploads')

                let deletedPictures = 0;
                products.forEach((product) => {
                    product.pictures.forEach((pic: string) => {
                        if (existsSync(`${uploadPath}/${pic}`)) {
                            unlinkSync(`${uploadPath}/${pic}`)
                            deletedPictures++
                        }
                    })
                })

                const del = await Product.deleteMany({ category: id })

                return res.send({ response: `Category, ${del.deletedCount} products and ${deletedPictures} pictures deleted` })
            }

            const updates = await Product.updateMany({ category: id }, { $set: { "category": newCategoryId } })
            return res.send({ response: `Category deleted and ${updates.modifiedCount} products updeted to new category` })
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }
}

export default CategoryController