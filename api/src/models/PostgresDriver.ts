import IDatabase                from '../interfaces/IDatabase'

export class PostgresDriver implements IDatabase {
    private pool: any

    constructor(pgDbPool) {
        this.pool = pgDbPool
    }

    public getAll(table: string): Array<object> {
        return this.pool.query({
            text: `
                SELECT *
                FROM ${table};
            `
        })
    }

    public getById(id: string, table: string, idType: string = 'id'): object {
        return this.pool.query({
            text: `
                SELECT *
                FROM ${table}
                WHERE ${idType} = $1;
            `,
            values: [id]
        })
    }

    public deleteById(id: string, table: string): object {
        return this.pool.query({
            text: `
                DELETE
                FROM ${table}
                WHERE id = $1;
            `,
            values: [id]
        })
    }

    public checkEmailExists(email: string, table: string): boolean {
        const getEmail = this.pool.query({
            text: `
                SELECT email
                FROM ${table}
                WHERE email = $1
            `,
            values: [email]
        })

        return getEmail.then(result => {
            if(result.rows.length > 0) {
                return true
            } else {
                return false
            }
        })
    }

    public checkUsernameExists(username: string): boolean {
        const getUsername = this.pool.query({
            text: `
                SELECT username
                FROM users
                WHERE username = $1
            `,
            values: [username]
        })

        return getUsername.then(result => {
            if(result.rows.length > 0) {
                return true
            } else {
                return false
            }
        })
    }

    public getUserByUsername(username: string): object {
        return this.pool.query({
            text: `
                SELECT 
                    users.username, users.email, users.pword, users.id, users.created
                FROM users
                WHERE username = $1
            `,
            values: [username]
        })
    }

    public init(): void {
        const createUserTable = this.pool.query({
            text: `
                CREATE TABLE IF NOT EXISTS users (
                    id UUID PRIMARY KEY,
                    firstName VARCHAR(35),
                    lastName VARCHAR(35),
                    userName VARCHAR(15) NOT NULL,
                    dateOfBirth DATE,
                    email VARCHAR(100) NOT NULL,
                    phone VARCHAR(50),
                    profilePic VARCHAR(255),
                    pword VARCHAR(255) NOT NULL,
                    created DATE NOT NULL
                );

                CREATE TABLE IF NOT EXISTS locations (
                    id UUID PRIMARY KEY,
                    userId UUID REFERENCES users(id),
                    date TIMESTAMPTZ NOT NULL,
                    longitude NUMERIC(18, 15) NOT NULL,
                    latitude NUMERIC(18, 15) NOT NULL
                );
            `
        })

        createUserTable.then().catch(console.log)
    }
}

export default function postgresDriverFactory(postgresDb): PostgresDriver {
    return new PostgresDriver(postgresDb)
}