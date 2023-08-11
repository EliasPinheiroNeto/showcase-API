import { Router, Express } from 'express'
import productController from '../controllers/productController'

const router: Router = Router()

router.get('/products', productController.getProducts)
router.post('/product', productController.createProduct)

export default router