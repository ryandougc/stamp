import IDatabase from '../interfaces/IDatabase'

export class Database implements IDatabase {
    private driver: IDatabase

    constructor(driver: IDatabase) {
        this.driver = driver
    }

    public getAll(table: string) {
        return this.driver.getAll(table)
    }

    public getById(id: string, table: string, idType: string = 'id') {
        return this.driver.getById(id, table, idType)
    }

    public deleteById(id: string, table: string): object {
        return this.driver.deleteById(id, table)
    }

    public checkEmailExists(email: string, table: string): boolean {
       return this.driver.checkEmailExists(email, table)
    }

    public checkUsernameExists(username: string): boolean {
        return this.driver.checkUsernameExists(username)
    }

    public getUserByUsername(username: string): object {
        return this.driver.getUserByUsername(username)
    }

    public init(): void {
        return this.driver.init()
    }
}

export default function databaseFactory(driver: IDatabase) {
    return new Database(driver)
}