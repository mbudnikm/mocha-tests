const { unique } = require('../src/utils')

const assert = require('assert')

describe('Unique operator', () => {
    it('should return the collection if there are no duplicates', () => {
        assert.deepStrictEqual(unique([1, 2, 3]), [1, 2, 3])
    })

    it('should remove duplicates', () => {
        assert.deepStrictEqual(unique([1, 1, 2, 3]), [1, 2, 3])
    })

    it('should return empty collection for empty input', () => {
        assert.deepStrictEqual(unique([]), [])
    })

    it('should remove repetition by attribute', () => {
        const input = [{
            id: 35,
            name: "Janek",
            nationality: "PL"
        }, {
            id: 35,
            name: "Hans",
            nationality: "DE"
        }, {
            id: 36,
            name: "Grażka",
            nationality: "PL"
        }]

        const result = [{
            id: 35,
            name: "Janek",
            nationality: "PL"
        }, {
            id: 36,
            name: "Grażka",
            nationality: "PL"
        }]
        assert.deepStrictEqual(unique(input, "id"), result)
    })
})