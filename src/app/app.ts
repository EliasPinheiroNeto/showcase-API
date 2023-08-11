import express from 'express';
import { Express } from 'express'
import { connect } from 'mongoose'
import IController from './controllers/IController';

class App {
    public app: Express
    public port: number

    constructor(controllers: IController[], port: number) {
        this.app = express()
        this.port = port

        this.connectDatabase()
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
    }

    private initializeMiddlewares() {
        this.app.use(express.json())
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach((controller: IController) => {
            this.app.use('/', controller.router)
        })
    }

    private connectDatabase() {
        connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`)
        })
    }
}

export default App