import { Request, Response, Router } from 'express'
import IController from './IController'
import Category from '../../database/models/Category'
import authorize from '../middlewares/authorize'

class CategoryController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/categories', this.getCategories)
        this.router.post('/category', authorize, this.createCategory)
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

    async getCategories(req: Request, res: Response) {
        try {
            const categories = Category.find()

            res.send(categories)
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }

    async deleteCategoryById(req: Request, res: Response) {
        const id: string = req.body.id

        try {
            const del = await Category.deleteOne({ _id: id })

            if (del.deletedCount >= 1) {
                return res.send({ response: "Category deleted" })
            }

            res.send({ response: "no category deleted" })
        } catch (err) {
            console.log(err)
            res.status(400).send({ err })
        }
    }
}

export default CategoryController