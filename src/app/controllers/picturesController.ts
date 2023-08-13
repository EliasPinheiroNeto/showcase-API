import { Router, Request, Response } from 'express'
import IController from './IController'
import Upload from '../middlewares/multer'
import multer from 'multer'
import authorize from '../middlewares/authorize'
import { existsSync, unlinkSync } from 'fs'
import { resolve } from 'path'

class PicturesController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get('/picture/:picName', this.getOneImage)
        this.router.post('/picture', authorize, multer(new Upload().options).single('file'), this.uploadOneImage)
        this.router.delete('/picture', authorize, this.deleteOneImageByName)
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
            }

            return res.sendFile(`${uploadPath}/${fileName}`)

        } catch (err) {
            res.status(400).send({ err })
        }
    }

    deleteOneImageByName(req: Request, res: Response) {
        const fileName = req.body.fileName
        const uploadPath = resolve('./src/database/uploads')

        try {
            if (!existsSync(`${uploadPath}/${fileName}`)) {
                return res.status(400).send({ error: "Image not found" })
            }
            unlinkSync(`${uploadPath}/${fileName}`)
            return res.send({ status: "Image deleted" })
        } catch (err) {
            res.status(400).send({ err })
        }
    }

    deleteManyImagesByName(req: Request, res: Response) {
        const names: string[] = req.body.names
        const uploadPath = resolve('./src/database/uploads')

        try {
            const responseMensages: string[] = []

            names.forEach((fileName: string) => {
                if (!existsSync(`${uploadPath}/${fileName}`)) {
                    responseMensages.push(`Image ${fileName} not found`)
                    return
                }

                unlinkSync(`${uploadPath}/${fileName}`)
                return
            })

            if (responseMensages.length == 0) {
                return res.send({ status: "All images deleted" })
            }

            return res.send({ status: "Gotta some errors", imagesErrors: responseMensages })
        } catch (err) {
            res.status(400).send({ err })
        }

    }
}

export default PicturesController