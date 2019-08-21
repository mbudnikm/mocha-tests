const chai = require('chai')
const expect = chai.expect

const sinon = require('sinon')
const chalk = require('chalk')

describe('STUB', () => {
    it('sinon stub', () => {
    	console.log(chalk.bgMagenta("This is pink console.log!"))
        const stub = sinon.stub()
        stub.returns(55)

        expect(stub()).to.equal(55)
  });
});