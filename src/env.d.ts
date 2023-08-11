declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEV_PORT: number
            DB_NAME: string
        }
    }
}

export { }