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
        .expect(400,'Sort must be one of rating or app')
    })
    it('should sort by rating', () => {
        return supertest(app)
        .get('/apps')
        .query({sort:'Rating'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
            let sorted = true
            let i = 0
            while(i < res.body.length - 1){
                const rateAtI = res.body[i]
                const rateAtIPlus1 = res.body[i + 1]
                if(rateAtIPlus1.Rating < rateAtI.Rating){
                    sorted = false
                    break
                }
                i++
            }
            expect(sorted).to.be.true
        })
    })
    it('should sort by app', () => {
        return supertest(app)
        .get('/apps')
        .query({sort:'App'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
            let sorted = true
            let i = 0
            while(i < res.body.length - 1){
                const rateAtI = res.body[i]
                const rateAtIPlus1 = res.body[i + 1]
                if(rateAtIPlus1.App < rateAtI.App){
                    sorted = false
                    break
                }
                i++
            }
            expect(sorted).to.be.true
        })
    })
})