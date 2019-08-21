const chai = require('chai')
const assert = chai.assert
const sinon = require('sinon')
const fetchMock = require('fetch-mock')

const { fetchGeo, baseUrl } = require('../src/api')

const { cachePromise } = require('../src/memoize')

describe('Cache Promise', () => {

    before(() => {
        fetchMock.get(`${baseUrl}/geo`, {
            result: 123,
        })
        // global.fetch = require('node-fetch')
      })
    
      after(() => {
        // delete global.fetch
        fetchMock.restore()
      })

    it('should return the same http promise when called more than once', async () => {
        //this.timeout(10000)

        const spy = sinon.spy(fetchGeo)
        const cachedFetchGeo = cachePromise(spy)
    
        const res1 = await cachedFetchGeo()
        const res2 = await cachedFetchGeo()
        const res3 = await cachedFetchGeo()

        sinon.assert.calledOnce(spy)
        assert.deepStrictEqual(res1, res2)
        assert.deepStrictEqual(res1, res3)
    });

    it('should return the same http promise when called more than once', async () => {
        //this.timeout(10000)

        const spy = sinon.spy(fetchGeo)
        const cachedFetchGeo = cachePromise(spy)
    
        const [res1, res2, res3] = await Promise.all([
            cachedFetchGeo(),
            cachedFetchGeo(),
            cachedFetchGeo()
        ])

        sinon.assert.calledOnce(spy)
        assert.deepStrictEqual(res1, res2)
        assert.deepStrictEqual(res1, res3)
    });

});

describe('Cache Promise 2', () => {

    it('should make a new http call if previous call has already failed', async () => {
        const spy = sinon.spy(fetchGeo)
        const cachedFetchGeo = cachePromise(spy)
        
        // pierwszy http failuje
        fetchMock.get(`${baseUrl}/geo`, {
            //throws: new TypeError("kontrolowane")
        })

        const res1 = await cachedFetchGeo()

        // assert:
        sinon.assert.calledOnce(spy)

        // first call
        fetchMock.restore()

        // drugi http przechodzi

        fetchMock.get(`${baseUrl}/geo`, {
            result: 123
        })

        // second call

        fetchMock.restore()
    });
});