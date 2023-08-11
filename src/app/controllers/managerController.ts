import { Router, Request, Response } from 'express'
import IController from './IController';
import AuthService from '../auth/authService';

class ManagerController implements IController {
    public router: Router = Router()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.post('/login', this.login)
    }

    login(req: Request, res: Response) {
        const body = req.body

        const { ADM_USER, ADM_PASSWORD } = process.env

        if (ADM_USER != body.user || ADM_PASSWORD != body.password) {
            return res.send({ error: "User or passoword invalid" })
        } else if (ADM_USER == body.user && ADM_PASSWORD == body.password) {
            return res.send({ token: AuthService.tokenGeneretor({ ADM_USER }, "2h") })
        }
    }
}

export default ManagerController