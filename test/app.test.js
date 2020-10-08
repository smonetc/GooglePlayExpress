const supertest = require('supertest')
const app = require('../app')
const { expect } = require('chai')

describe('GET /apps', () => {
    it('should return an array of apps', () => {
      return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf.at.least(1)
            const book = res.body[0]
            expect(book).to.include.all.keys('Last Updated', 'App', 'Category', 'Rating')
        })
    })
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
        .get('/apps')
        .query({sort: 'Whoops'})
        .expect(400,'Sort must be rating or app')
    })
})