const seed = require('./seeder.db')
let chai = require('chai')
let chaiHttp = require('chai-http')
let { app } = require('../index')
chai.should()
chai.use(chaiHttp)

describe('Tasks API', ()=>{
    
    before((done)=>{
        seed()
        done()
    })
    
    const URI = '/api/v0/authentication'

    /* Test the POST auth.route with valid input values */
    describe(`POST ${URI}`, ()=>{
        it('It should get jwt token', (done)=>{
            chai.request(app)
            .post(`${URI}`)
            .send({
                username: 'usr001',
                password: '001'
            })
            .end((err,res)=>{
                res.should.have.status(200)
                done()
            })
        })
    })

        /* Test the POST auth.route with invalid input values */
        describe(`POST ${URI}`, ()=>{
            it('It should get jwt token', (done)=>{
                chai.request(app)
                .post(`${URI}`)
                .send({
                    username: 'usr001',
                    password: '011'
                })
                .end((err,res)=>{
                    res.should.have.status(403)
                    done()
                })
            })
        })

    /* Test the POST auth.route with invalid input values */
    describe(`POST ${URI}`, ()=>{
        it('It should get jwt token', (done)=>{
            chai.request(app)
            .post(`${URI}`)
            .send({
                username: 'usr005',
                password: '009'
            })
            .end((err,res)=>{
                res.should.have.status(401)
                done()
            })
        })
    })
})