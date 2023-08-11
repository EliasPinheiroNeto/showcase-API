import { sign, verify } from 'jsonwebtoken'

class AuthService {
    static tokenGeneretor(params: object, expiresIn: string | number): string {
        const token: string = sign(params,
            process.env.SECRET,
            { expiresIn: expiresIn })

        return token
    }

    static tokenValidator(token: string): boolean {
        let response: boolean = false
        verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                response = false
            } else {
                response = true
            }
        })

        return response
    }
}

export default AuthService