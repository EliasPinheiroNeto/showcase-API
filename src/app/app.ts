import express from 'express';
import { Express } from 'express'
import IController from './controllers/IController';

class App {
    public app: Express
    public port: number

    constructor(controllers: IController[], port: number) {
        this.app = express()
        this.port = port

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

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port}`)
        })
    }
}

export default App