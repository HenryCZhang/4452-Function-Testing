const assert = require('assert');
const sinon = require('sinon');
const code = require('../code');
var getAgeFactorStub = sinon.stub(code, 'getAgeFactor');
var getBalanceFactorStub = sinon.stub(code, 'getBalanceFactor');
/*establish stubs so that we can pass testing arduments to the functions 
and get the desired output without calling the actual function 
in order to effeciently perform specific function unit testing
*/

describe('accountStatus Unit Test', function () {
    describe('1. accountStatus Equivalence Class Test', function () {
        //establish stubs so that we can pass testing arguments to the functions
        this.beforeAll(function () {
            getAgeFactorStub
                .onCall(0).returns(-1)
                .returns(1);

            getBalanceFactorStub
                .onCall(0).returns(1)
                .onCall(1).returns(0)
                .onCall(2).returns(90)
                .onCall(3).returns(100)
                .onCall(4).returns(300)
                .onCall(5).returns(700)
                .onCall(6).returns(1000)
                .returns(1);
            
        });
        //after all tests are done, restore the stubs to their original state
        this.afterAll(function () {
            getAgeFactorStub.reset();
            getBalanceFactorStub.reset();
        });

        describe('accountStatus CT1, accountFactor < 0', function () {
            it('should return error when accountFactor = -1', function () {
                try{
                    assert.equal(code.accountStatus('account'), 'very-low');
                }
                catch(error){
                    console.log(error);
                }
            });
        });

        describe('accountStatus CT2, accountFactor = 0', function () {
            it('should return not-eligible when accountFactor = 0', function () {
                assert.equal(code.accountStatus('account'), 'not-eligible');
                
            });
        });

        describe('accountStatus CT3, 0 < accountFactor < 100', function () {
            it('should return very-low when accountFactor = 90', function () {
                assert.equal(code.accountStatus('account'), 'very-low');
            });
        });

        describe('accountStatus CT4, 100 <= accountFactor < 300', function () {
            it('should return low when accountFactor = 100', function () {
                assert.equal(code.accountStatus('account'), 'low');
            });
        });

        describe('accountStatus CT5, 300 <= accountFactor < 700', function () {
            it('should return medium when accountFactor = 300', function () {
                assert.equal(code.accountStatus('account'), 'medium');
            });
        });

        describe('accountStatus CT6, 700 <= accountFactor < 1000', function () {
            it('should return high when accountFactor = 700', function () {
                assert.equal(code.accountStatus('account'), 'high');
            });
        });

        describe('accountStatus CT7, 1000 <= accountFactor', function () {
            it('should return excellent when accountFactor = 1000', function () {
                assert.equal(code.accountStatus('account'), 'excellent');
            });
        });

      
    });

    describe('2. accountStatus Boundary Value Test', function () {
        this.beforeAll(function () {
            getAgeFactorStub
                .returns(1);
            getBalanceFactorStub
                .onCall(0).returns(-1)
                .onCall(1).returns(0)
                .onCall(2).returns(50)
                .onCall(3).returns(100)
                .onCall(4).returns(150)
                .onCall(5).returns(300)
                .onCall(6).returns(500)
                .onCall(7).returns(700)
                .onCall(8).returns(900)
                .onCall(9).returns(1000)
                .onCall(10).returns(2000)
                .returns(0);
        });
        this.afterAll(function () {
            getAgeFactorStub.restore();
            getBalanceFactorStub.restore();
        });

        describe('accountStatus BVT', function () {
            it('should return error when accountFactor = -1', function () {
                try{
                    assert.equal(code.accountStatus('account'), 'very-low');
                }
                catch(error){
                    console.log(error);
                }
            });
            it('should return very-low when accountFactor = 0', function () {
                assert.equal(code.accountStatus('account'), 'not-eligible');    
            });
            it('should return very-low when accountFactor = 50', function () {
                assert.equal(code.accountStatus('account'), 'very-low');
            });
            it('should return low when accountFactor = 100', function () {
                assert.equal(code.accountStatus('account'), 'low');
            });
            it('should return low when accountFactor = 150', function () {
                assert.equal(code.accountStatus('account'), 'low');
            });
            it('should return medium when accountFactor = 300', function () {
                assert.equal(code.accountStatus('account'), 'medium');
            });
            it('should return medium when accountFactor = 500', function () {
                assert.equal(code.accountStatus('account'), 'medium');
            });
            it('should return high when accountFactor = 700', function () {
                assert.equal(code.accountStatus('account'), 'high');
            });
            it('should return high when accountFactor = 900', function () {
                assert.equal(code.accountStatus('account'), 'high');
            });
            it('should return excellent when accountFactor = 1000', function () {
                assert.equal(code.accountStatus('account'), 'excellent');
            });
            it('should return excellent when accountFactor = 2000', function () {
                assert.equal(code.accountStatus('account'), 'excellent');
            });
        });
    })
});