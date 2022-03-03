declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      API_PORT: string
      GQL_PATH: string
    }
  }
}

export { };
