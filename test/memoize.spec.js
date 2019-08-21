const { memoize } = require('../src/memoize')

const assert = require('assert')
const sinon = require('sinon')
const chai = require('chai')
chai.should()

const { Calculator } = require('../src/calc')

describe('Memoize decorator', () => {
    it('should return the same result as the wrapped function', () => {
        const square = (n) => n ** 2
        const memoizedSquare = memoize(square)

        const rawResult = square(5)
        const memoizedResult = memoizedSquare(5)

        rawResult.should.equal(memoizedResult)
    });

    it('should call the wrapped function', () => {
        // anonymous SPY
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

    it('should memoize functions which operate on various number of parameter', () => {
       // spying method object
        const spy = sinon.spy(Calculator, 'add')

        const memoizedAdd = memoize(Calculator.add)

        sinon.assert.notCalled(spy)

        const result1 = memoizedAdd(1, 2)
        const result2 = memoizedAdd(2, 3)

        sinon.assert.callCount(spy, 2)

        const result3 = memoizedAdd(3, 4)
        const result4 = memoizedAdd(4, 5)

        sinon.assert.callCount(spy, 4)

        result1.should.equal(3)
        result2.should.equal(5)
        result3.should.equal(7)
        result4.should.equal(9)
        sinon.assert.calledWith(spy, 1, 2)
        sinon.assert.calledWith(spy, 4, 5)
    });

    it('should call wrapped function twice for different array parameteres', () => {
        const concat = (arr1, arr2) => arr1.concat(arr2)
        const spy = sinon.spy(concat)

        const memoizedConcat = memoize(spy)
        const result2 = memoizedConcat([1, 2], [3, 4])
        const result3 = memoizedConcat([2, 3], [4, 5])

        sinon.assert.calledTwice(spy)
    });

    it('should call wrapped function twice for different object parameters', () => {
        const concat = (arr1, arr2) => arr1.concat(arr2)
        const spy = sinon.spy(concat)
        const memoizedConcat = memoize(spy)

        const result1 = memoizedConcat([{ value: 1 }], [{ value: 2 }])
        const result2 = memoizedConcat([{ value: 2 }], [{ value: 3 }])
        
        sinon.assert.calledTwice(spy)
    });

    it('should throw if wrapped function is called with another function as parameter', () => {
        const concat = (arr1, arr2) => arr1.concat(arr2)
        const memoizedConcat = memoize(concat)
        const spy = sinon.spy(memoizedConcat)
        const f1 = () => {}, f2 = () => {}

        const result1 = spy(f1, f2)
        
        sinon.assert.threw(spy)
        // sinon.assert.calledOnce(spy)
      })
})
