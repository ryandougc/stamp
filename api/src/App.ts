import * as     express             from 'express'
import * as     bodyParser          from 'body-parser'
import * as     dotenv              from 'dotenv'

import * as     userRoutes          from './routes/user'

export default class App {
    public express

    constructor() {
        this.express = express()
        this.initEnvVariables()
        this.initBodyParser()
        this.mountRoutes()
    }

    private initEnvVariables(): void {
        dotenv.config({ path: '.env' })
    }

    private initBodyParser(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }))
        this.express.use(bodyParser.json())
    }

    private mountRoutes(): void {
        const router = express.Router()

        router.use('/users', userRoutes)

        router.get('/', (req, res) => {
            res.status(200).json({
                message: "Hello World"
            })
        })

        router.use((req, res, next) => {
            const error = new Error('Not found')
            error.status = 404

            next(error)
        })

        router.use((error, req, res, next) => {
            return res.status(error.status || 500).json({
                error: {
                    message: error.message
                }
            })
        })

        this.express.use('/', router)
    }
}