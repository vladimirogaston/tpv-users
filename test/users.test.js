let chai = require('chai')
let chaiHttp = require('chai-http')
let { app } = require('../src/index')

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
})