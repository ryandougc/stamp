// const { Pool } = require('pg')

// const pool = new Pool({
//     user: process.env.PG_USER,
//     host: process.env.PG_HOST,
//     database: process.env.PG_DATABASE,
//     password: process.env.PG_PASSWORD,
//     port: process.env.PG_PORT,
// })

// module.exports = {
//     query: (text, params) => pool.query(text, params)
// }

import { Pool } from 'pg'

export class Db {
    public pool: any
    private PG_USER: string
    private PG_HOST: string
    private PG_DATABASE: string
    private PG_PASSWORD: string
    private PG_PORT: string

    constructor(dbName: string = null) {
        this.PG_DATABASE = dbName || process.env.PG_DATABASE
        this.PG_USER = process.env.PG_USER
        this.PG_HOST = process.env.PG_HOST
        this.PG_PASSWORD = process.env.PG_PASSWORD
        this.PG_PORT = process.env.PG_PORT
        this.init()
    }

    private init() {
        const newPool = new Pool({
            user: this.PG_USER,
            host: this.PG_HOST,
            database: this.PG_DATABASE,
            password: this.PG_PASSWORD,
            port: this.PG_PORT
        })

        this.pool = { query: (text, params) => newPool.query(text, params) }
    }
}

export default function postgresDbFactory(dbName: string = null) {
    return new Db(dbName).pool
}