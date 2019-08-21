const { fetchGeo, fetchOffices } = require('../src/api')

const chai = require('chai')
const expect = chai.expect
const assert = chai.assert

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

  it('should receive offices data from REST API', async () => {
      const response = await fetchOffices()
      expect(response instanceof Array).to.be.true

  });
})