const { memoize } = require('../src/memoize')

const assert = require('assert')
const sinon = require('sinon')
const chai = require('chai')
chai.should()

describe('Memoize decorator', () => {
    it('should return the same result as the wrapped function', () => {
        const square = (n) => n ** 2
        const memoizedSquare = memoize(square)

        const rawResult = square(5)
        const memoizedResult = memoizedSquare(5)

        rawResult.should.equal(memoizedResult)
    });

    it('should call the wrapped function', () => {
        const spy = sinon.spy()
        const memoizedSquare = memoize(spy)

        // one of following (1 of 3): 
        spy.notCalled.should.be.true // returns boolean
        assert.equal(spy.notCalled, true)
        sinon.assert.notCalled(spy)

        const memoizedResult = memoizedSquare(5)

        // one of following (1 of 3): 
        spy.called.should.be.true
        assert.equal(spy.called, true)
        sinon.assert.calledOnce(spy)
    })

    it('should only call wrapped function once if called with the same parameters multiple times', () => {
        const square = (n) => n**2
        // spying existing function
        const spy = sinon.spy(square)
        const memoizedSquare = memoize(spy)
    
        sinon.assert.notCalled(spy)
    
        const result1 = memoizedSquare(5)
        const result2 = memoizedSquare(5)
        const result3 = memoizedSquare(5)
    
        sinon.assert.calledOnce(spy)
        sinon.assert.alwaysCalledWithExactly(spy, 5)
    
        result1.should.equal(25)
        result2.should.equal(25)
        result3.should.equal(25)
      })
    
      // spying method object
})
