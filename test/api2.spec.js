const baseUrl = 'http://localhost:3000'

const { fetchGeoWithOffices } = require('../src/api')

const chai = require('chai')
const expect = chai.expect

const fetchMock = require('fetch-mock')

describe('mocked HTTP calls', () => {
    before(() => {
        fetchMock.get(`${baseUrl}/geo`, {
            PL: "Poland",
            CZ: "Czech",
            DE: "Germany",
        })

        fetchMock.get(`${baseUrl}/offices`, [
            { country: "Poland" },
            { country: "Czech" },
            { country: "Czech" },
            { country: "Poland" },
            { country: "Germany" },
        ])
    })

    after(() => {
        fetchMock.restore()
    })

    it('should merge geo and office data', async () => {
        const response = await fetchGeoWithOffices()
        expect(response).to.be.deep.equal({
            PL: {
                country: "Poland",
                offices: [
                    { country: "Poland" },
                    { country: "Poland" },
                ]
            },
            CZ: {
                country: "Czech",
                offices: [
                    { country: "Czech" },
                    { country: "Czech" },
                ]
            },
            DE: {
                country: "Germany",
                offices: [
                    { country: "Germany" },
                ]
            }
        })
    });
});