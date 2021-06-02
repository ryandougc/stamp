export default interface IDatabase {
    getAll: (table: string) => Array<object>
    getById: (id: string, table: string, idType: string) => object
    deleteById: (id: string, table: string) => object
    checkEmailExists: (email: string, table: string) => boolean
    checkUsernameExists: (username: string) => boolean
    getUserByUsername: (username: string) => object
    init: () => void
}