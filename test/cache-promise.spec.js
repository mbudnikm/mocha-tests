const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')
const fetchMock = require('fetch-mock')

const { fetchGeo } = require('../src/api')

const { cachePromise } = require('../src/memoize')

describe('Cache Promise', () => {

    before(() => {
        global.fetch = require('node-fetch')
      })
    
      after(() => {
        // global.fetch = undefined <- pozostawia atrybut
        delete global.fetch
      })

    it('should return the same http promise when called more than once', async () => {
        //this.timeout(10000)

        const spy = sinon.spy(fetchGeo)
        const cachedFetchGeo = cachePromise(spy)
    
        await cachedFetchGeo()
        await cachedFetchGeo()
        await cachedFetchGeo()

        sinon.assert.calledOnce(spy)
    });
});