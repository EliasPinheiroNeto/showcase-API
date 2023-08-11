import { Request, Response, NextFunction } from 'express';
import AuthService from '../auth/authService';

export default function authorize(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.headers.authorization

    if (!token) {
        return res.status(401).send({ error: "No token provided" })
    }

    const parts = token.split(' ')

    if (parts.length != 2) {
        return res.status(401).send({ error: 'Token error' })
    }

    const [scheme, code] = parts

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' })
    }

    if (!AuthService.tokenValidator(code)) {
        return res.status(401).send({ error: "Token invalid" })
    }

    next()
}