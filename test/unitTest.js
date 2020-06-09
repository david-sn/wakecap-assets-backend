let mongoose = require("mongoose");
let ClientDetails = require('../models/ClientDetails');

//Require the dev-dependencies
process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('ClientDetail', () => {
    /*
     * Before run Tests suite this should run first we empty the database
     */
    before(async (done) => {
        await ClientDetails.remove({});
        //load the seeder

        done();
    });

    /*
     * Test the /POST route to create client
     */
    describe('/POST clients', () => {
        it('it should POST with all field', (done) => {
            let clientDetail = {
                "name": "Al_Futtaim",
                "detail": "construction industry",
                "attachements": [
                    {
                        "mediaType": "image",
                        "pointer": "profile",
                        "url": "Strign",
                        "thumbnail": "Strign"
                    }
                ],
                "phone": {
                    "code": "+2",
                    "number": "01289286468"
                }
            }
            chai.request(server)
                .post('/clients')
                .send(clientDetail)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.not.have.property('errors');
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('name').eql('Al_Futtaim');
                    done();
                });
        });
    });

    /*
     * Test the /GET route to get all clients
     */
    describe('/GET clients', () => {
        it('it should GET all the clients', (done) => {
            chai.request(server)
                .get('/clients/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.result.should.be.a('array');
                    res.body.result.length.should.not.be.eql(0);
                    done();
                });
        });
    });

});