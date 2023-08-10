declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEV_PORT: number
        }
    }
}

export { }