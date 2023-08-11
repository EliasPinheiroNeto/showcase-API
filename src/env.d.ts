declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEV_PORT: number
            DB_NAME: string

            ADM_USER: string
            ADM_PASSWORD: string
        }
    }
}

export { }