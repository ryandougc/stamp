import postgresDbFactory        from '../mixins/pg_connect'
import databaseFactory          from '../models/Database'
import postgresDriverFactory    from '../models/PostgresDriver'

export default function dbPool(dbName: string = null): any {
    const postgresDb = postgresDbFactory(dbName)

    const dbDriver = postgresDriverFactory(postgresDb)

    const db = databaseFactory(dbDriver)

    return db
}