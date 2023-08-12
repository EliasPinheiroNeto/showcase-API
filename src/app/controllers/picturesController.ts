import { Router, Request, Response } from 'express'
import IController from './IController'
import Upload from '../middlewares/multer'
import multer from 'multer'
import authorize from '../middlewares/authorize'
import { existsSync } from 'fs'
import { resolve } from 'path'

class PicturesController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/picture/:picName', this.getOneImage)
        this.router.post('/picture', authorize, multer(new Upload().options).single('file'), this.uploadOneImage)
    }

    uploadOneImage(req: Request, res: Response) {
        if (req.file) {
            return res.send({ fileName: req.file.filename })
        }
    }

    getOneImage(req: Request, res: Response) {
        const fileName = req.params.picName
        const uploadPath = resolve('./src/database/uploads')

        try {
            if (!existsSync(`${uploadPath}/${fileName}`)) {
                return res.status(400).send({ error: "Image not found" })
            } else {
                res.sendFile(`${uploadPath}/${fileName}`)
            }
        } catch (err) {
            res.status(400).send({ err })
        }
    }
}

export default PicturesController