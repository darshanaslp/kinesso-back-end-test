const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const app = require('../app');

chai.should();
chai.use(chaiHttp);

let taxpayloadFor_0_To_18200 = {
    "firstName": "Darshana",
    "lastName": "Perera",
    "annualSalary": "18199",
    "superRate": "9",
    "startDate": "01 May – 31 May"
}

let taxPayloadResultFor_0_To_18200 = {
    "name": "Darshana Perera",
    "pay-period": "01 April – 30 April",
    "gross-income": 1517,
    "income-tax": 0,
    "net-income": 1517,
    "super-amount": 137
}

let taxpayloadFor_18201_To_37000 = {
    "firstName": "Darshanaharat",
    "lastName": "Perera",
    "annualSalary": "18500",
    "superRate": "10",
    "startDate": "01 May – 31 May"
}

let taxPayloadResultFor_18201_To_37000 = {
    "name": "Bharat Bhushan",
    "pay-period": "01 April – 30 April",
    "gross-income": 1542,
    "income-tax": 5,
    "net-income": 1537,
    "super-amount": 154
}

let taxpayloadFor_37001_To_87000 = {
    "firstName": "Bharat",
    "lastName": "Bhushan",
    "annualSalary": 60050,
    "superRate": 9,
    "startDate": "01 May – 31 May"
}

let taxPayloadResultFor_37001_To_87000 = {
    "name": "Darshana Perera",
    "pay-period": "01 April – 31 April",
    "gross-income": 5004,
    "income-tax": 922,
    "net-income": 4082,
    "super-amount": 450
}

let taxpayloadFor_87001_To_180000 = {
    "firstName": "Darshana",
    "lastName": "Pereran",
    "annualSalary": "120000",
    "superRate": "10",
    "startDate": "01 May – 31 May"
}

let taxPayloadResultFor_87001_To_180000 = {
    "name": "Darshana Perera",
    "pay-period": "01 April – 30 April",
    "gross-income": 10000,
    "income-tax": 2669,
    "net-income": 7331,
    "super-amount": 1000
}

let taxpayloadFor_greater_To_180000 = {
    "firstName": "Darshana",
    "lastName": "Perera",
    "annualSalary": "120000",
    "superRate": "10",
    "startDate": "01 May – 31 May"
}

let taxPayloadResultFor_greater_To_180000 = {
    "name": "Darshana Perera",
    "pay-period": "01 April – 30 April",
    "gross-income": 10000,
    "income-tax": 2669,
    "net-income": 7331,
    "super-amount": 1000
}



describe('test employee payslip API', () => {
    it('should pass with 200', (done) => {
        chai.request(app)
            .post('/payslip')
            .send(taxpayloadFor_0_To_18200)
            .then((res) => {
                expect(res.status)
                    .to.equal(200);
                done();
            });
    });

    it('should return response body for $18,200', () => {

        return chai
            .request(app)
            .post('/payslip')
            .send(taxpayloadFor_0_To_18200)
            .then((res) => {
                expect(res.body)
                    .to.deep.equal(taxPayloadResultFor_0_To_18200);
            });
    });

    it('should return response body for $37000', () => {

        return chai
            .request(app)
            .post('/payslip')
            .send(taxpayloadFor_18201_To_37000)
            .then((res) => {
                expect(res.body)
                    .to.deep.equal(taxPayloadResultFor_18201_To_37000);
            });
    });


    it('should return response body for $87000', () => {

        return chai
            .request(app)
            .post('/payslip')
            .send(taxpayloadFor_87001_To_180000)
            .then((res) => {
                expect(res.body)
                    .to.deep.equal(taxPayloadResultFor_87001_To_180000);
            });
    });

    it('should return response body for $180000', () => {

        return chai
            .request(app)
            .post('/payslip')
            .send(taxpayloadFor_87001_To_180000)
            .then((res) => {
                expect(res.body)
                    .to.deep.equal(taxPayloadResultFor_87001_To_180000);
            });
    });
    it('should return bad request 400 if annualSalary is missing ', () => {
        const clonedTaxpayload = JSON.parse(JSON.stringify(taxpayloadFor_0_To_18200));
        delete clonedTaxpayload.annualSalary;
        return chai
            .request(app)
            .post('/payslip')
            .send(clonedTaxpayload)
            .catch((err) => {
                expect(err.status)
                    .to.equal(400);
            });
    });
    it('should return bad request 400 if firstName missing', () => {
        const clonedTaxpayload = JSON.parse(JSON.stringify(taxpayloadFor_0_To_18200));
        delete clonedTaxpayload.firstName;
        return chai
            .request(app)
            .post('/payslip')
            .send(clonedTaxpayload)
            .catch((err) => {
                expect(err.status)
                    .to.equal(400);
            });
    });
    it('should return bad request 400 if super rate is -ve', () => {
        const clonedTaxpayload = JSON.parse(JSON.stringify(taxpayloadFor_0_To_18200));
        clonedTaxpayload.superRate = -1;
        return chai
            .request(app)
            .post('/payslip')
            .send(clonedTaxpayload)
            .catch((err) => {
                expect(err.status)
                    .to.equal(400);
            });
    });
    it('should return bad request 400 if super rate > 12 ', () => {
        const clonedTaxpayload = JSON.parse(JSON.stringify(taxpayloadFor_0_To_18200));
        clonedTaxpayload.superRate = 13;
        return chai
            .request(app)
            .post('/payslip')
            .send(clonedTaxpayload)
            .catch((err) => {
                expect(err.status)
                    .to.equal(400);
            });
    });
    it('should return bad request 400 if annual pay is -ve ', () => {
        const clonedTaxpayload = JSON.parse(JSON.stringify(taxpayloadFor_0_To_18200));
        clonedTaxpayload.annualSalary = -1;
        return chai
            .request(app)
            .post('/payslip')
            .send(clonedTaxpayload)
            .catch((err) => {
                expect(err.status)
                    .to.equal(400);
            });
    });
});
