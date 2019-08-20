const assert = require('assert')

const { Calculator } = require('../src/calc')

describe('Calculator', () => {
    it('should add numbers', () => {
        assert.equal(Calculator.add(2, 3), 5)
        // assert.equal(Calculator.add(2, 3), 6, "błędny wynik dodawania")
        // assert.equal(Calculator.add(2, 3), 7, "błędny wynik dodawania")

        // if (2 !== 3) {
        //     throw new Error("2 not equal 3")
        // }
    })
})