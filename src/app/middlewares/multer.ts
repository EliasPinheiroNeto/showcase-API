import multer from 'multer'
import { extension } from 'mime'
import { existsSync, mkdirSync } from 'fs'

class Upload {
    private uploadPath: string = 'src/database/uploads'
    options: multer.Options

    constructor() {
        this.options = {
            storage: this.storage()
        }
    }

    private storage(): multer.StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                if (!existsSync(this.uploadPath)) {
                    mkdirSync(this.uploadPath)
                }

                cb(null, this.uploadPath)
            },

            filename: (req, file, cb) => {

                const type = extension(file.mimetype)
                const name = `${new Date().getTime()}.${type}`

                cb(null, name)
            }
        })
    }
}

export default Upload