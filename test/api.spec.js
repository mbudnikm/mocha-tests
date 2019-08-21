const { 
  fetchGeo, 
  fetchOffices, 
  fetchGeoWithOffices, 
  baseUrl,
  axiosGeo,
  axiosOffices 
} = require('../src/api')

const chai = require('chai')
const expect = chai.expect
const assert = chai.assert
    
const chalk = require('chalk')
const fetchMock = require('fetch-mock')

const sinon = require('sinon')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const mock = new MockAdapter(axios)

describe('API HTTP Requests', () => {
  before(() => {
    global.fetch = require('node-fetch')
  })

  after(() => {
    // global.fetch = undefined <- pozostawia atrybut
    delete global.fetch
  })

  it('should rerceive geo data from REST API @integration', async () => {
    const response = await fetchGeo()
    expect(typeof response).to.equal("object")
    const keys = Object.keys(response)
    const keysAreCountryCodes = keys
        .every(k => typeof k === 'string' && k.length === 2)
    expect(keysAreCountryCodes).to.be.true
  })

  it('should receive offices data from REST API @integration', async () => {
      const response = await fetchOffices()
      expect(response instanceof Array).to.be.true
  });

  it('should merge geo and office data', async () => {
    const response = await fetchGeoWithOffices()
    expect(typeof response).to.equal("object")
    expect(typeof response.US).to.equal("object")
    expect(response.US.country).to.equal("United States of America")
    expect(response.US.offices.length).to.equal(3)  
  });

  describe('fetch-mock HTTP calls', () => {
    before(() => {
      fetchMock.get(`${baseUrl}/geo`, {
        PL: "Poland",
        CZ: "Czech",
        DE: "Germany",
      }, { overwriteRoutes: false })

      fetchMock.get(`${baseUrl}/offices`, {
        body: [
          { country: "Poland" },
          { country: "Czech" },
          { country: "Czech" },
          { country: "Poland" },
          { country: "Poland" },
          { country: "Germany" },
        ],
        // status: 200
        // throws: new TypeError('Dups.')
      }, { overwriteRoutes: false } )
    })

    after(() => {
      fetchMock.restore()
    })

    it('should merge geo and office data', async () => {
      const response = await fetchGeoWithOffices()
      expect(response).to.deep.equal({
        PL: {
          country: "Poland", offices: [
            { country: "Poland" },
            { country: "Poland" },
            { country: "Poland" }
          ]
        },
        CZ: {
          country: "Czech", offices: [
            { country: "Czech" },
            { country: "Czech" },
          ]
        },
        DE: {
          country: "Germany", offices: [
            { country: "Germany" },
          ]
        },
      })

      // expect(typeof response).to.equal("object")
      // expect(typeof response.PL).to.equal("object") 
      // expect(response.PL.country).to.equal("Poland")
      // expect(response.PL.offices.length).to.equal(3)
    })
     
  })

  describe('axios mock adapter HTTP calls', () => {
    before(() => { 
      // setup mock http
      mock.onGet(`${baseUrl}/geo`).reply(200, {
        result: 123
      })
    });

    after(() => {
      // restore http
      mock.restore()
    });

    it('should mock axios calls', async () => {
      const res = await axiosGeo()
      expect(res).to.deep.equal({ result: 123 })
    });
  });

})