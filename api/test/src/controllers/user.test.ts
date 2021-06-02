const request = require('supertest')

import App from '../../../src/App'
const app = new App().express

import dbPool from '../../../src/mixins/setupDb'

let db
const dbName = "pwa_gps_test"



beforeAll( _ => initializeDatabase )

afterAll( _ => clearDatabase )



describe('User Controller', () => {
    it('Should add a new user to the database', async () => {
        const res = await request(app).get('/users')

        expect(res.statusCode).toEqual(200)
    })
})


function initializeDatabase() {
    db = dbPool(dbName)
}

function clearDatabase() {

}