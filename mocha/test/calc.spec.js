const assert = require('assert')

const { Calculator } = require('../src/calc')

describe('Calculator', () => {
    it('should add numbers', () => {
        assert.equal(Calculator.add(2, 3), 5)
    })
})