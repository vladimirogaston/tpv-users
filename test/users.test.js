let chai = require('chai')
let chaiHttp = require('chai-http')
let { app } = require('../server')

chai.should()
chai.use(chaiHttp)

describe('Tasks API', ()=>{
    /** Test the GET route */
    describe('GET /api/v0/users', ()=>{
        it('It should get all users', (done)=>{
            chai.request(app)
            .get('/api/v0/users')
            .end((err,res)=>{
                res.should.have.status(200)
                done()
            })
        })
    })
    /* Test the GET Login route */
    describe('GET /api/v0/users/login', ()=>{
        it('It should get jwt token', (done)=>{
            chai.request(app)
            .post('/api/v0/users/login')
            .send({
                username: 'augustopinochet',
                password: 'ilovekillingpeople'
            })
            .end((err,res)=>{
                res.should.have.status(401)
                done()
            })
        })
    })
    /* Test DELETE route */
    describe('GET /api/v0/users/:id', ()=>{
        it('It should retrieve one user', (done)=>{
            chai.request(app)
            .get('/api/v0/users/' + 1)
            //.set({ "Authorization": `Bearer ${token}` })
            .set({ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNCIsImlhdCI6MTYyMjk0ODkyNSwiZXhwIjoxNjIzMDM1MzI1fQ.cbGPfY7LZv7sSIiuLLnmE4BIYYpBQNNLG8CZwOZm16U" })
            .end((err, res)=>{
                res.should.have.status(200)
                done()
            })
        })
    })
})
