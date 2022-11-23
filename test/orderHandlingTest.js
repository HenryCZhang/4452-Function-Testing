const assert = require("assert");
const sinon = require("sinon");
const code = require("../code");
var accountStatusStub = sinon.stub(code, "accountStatus");
var creditStatusStub = sinon.stub(code, "creditStatus");
var productStatusStub = sinon.stub(code, "productStatus");
/*establish stubs so that we can pass testing arduments to the functions 
and get the desired output without calling the actual function 
in order to effeciently perform specific function unit testing
*/

describe("orderHandling Unit Test", function () {
  describe("1. orderHandling Equivalence Class Test", function () {
    //establish stubs so that we can pass testing arguments to the functions
    this.beforeAll(function () {
      accountStatusStub //(clientAccount)
        .withArgs(0)
        .returns("not-eligible")
        .withArgs(1)
        .returns("very-low")
        .withArgs(2)
        .returns("low")
        .withArgs(3)
        .returns("medium")
        .withArgs(4)
        .returns("high")
        .withArgs(5)
        .returns("excellent");

      creditStatusStub //(clientAccount, creditCheckMode)
        .withArgs(sinon.match.any, 0)
        .returns("not-allowed")
        .withArgs(sinon.match.any, 1)
        .returns("low")
        .withArgs(sinon.match.any, 2)
        .returns("high");

      productStatusStub //(product, inventory, inventoryThreshold)
        .withArgs(0, sinon.match.any, sinon.match.any)
        .returns("soldout")
        .withArgs(1, sinon.match.any, sinon.match.any)
        .returns("limited")
        .withArgs(2, sinon.match.any, sinon.match.any)
        .returns("available-to-all")
        .withArgs(3, sinon.match.any, sinon.match.any)
        .returns("invalid");
    });
    //after all tests are done, restore the stubs to their original state
    this.afterAll(function () {
      accountStatusStub.reset();
      creditStatusStub.reset();
      creditStatusStub.reset();
    });

    describe("orderHandling TC1", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = high, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 2, 0, 0, 2), "accepted");
      });
    });
    describe("orderHandling TC2", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = high, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 1, 0, 0, 2), "accepted");
      });
    });
    describe("orderHandling TC3", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = low, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 2, 0, 0, 1), "accepted");
      });
    });
    describe("orderHandling TC4", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = low, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 1, 0, 0, 1), "accepted");
      });
    });
    describe("orderHandling TC5", function () {
      it("should return accepted when accountStatus = high, creditStatus = high, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 2, 0, 0, 2), "accepted");
      });
    });
    describe("orderHandling TC6", function () {
      it("should return accepted when accountStatus = high, creditStatus = high, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 2, 0, 0, 1), "accepted");
      });
    });
    describe("orderHandling TC7", function () {
      it("should return accepted when accountStatus = high, creditStatus = low, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 1, 0, 0, 2), "accepted");
      });
    });
    describe("orderHandling TC8", function () {
      it("should return accepted when accountStatus = medium, creditStatus = high, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(3, 2, 0, 0, 2), "accepted");
      });
    });
    describe("orderHandling TC9", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = high, productStatus = soldout", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 0, 0, 0, 2), "pending");
      });
    });
    describe("orderHandling TC10", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = low, productStatus = soldout", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 0, 0, 0, 1), "pending");
      });
    });
    describe("orderHandling TC11", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = not-allowed, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 1, 0, 0, 0), "pending");
      });
    });
    describe("orderHandling TC12", function () {
      it("should return accepted when accountStatus = excellent, creditStatus = not-allowed, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(5, 2, 0, 0, 0), "pending");
      });
    });
    describe("orderHandling TC13", function () {
      it("should return accepted when accountStatus = high, creditStatus = high, productStatus = soldout", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 0, 0, 0, 2), "pending");
      });
    });
    describe("orderHandling TC14", function () {
      it("should return accepted when accountStatus = high, creditStatus = low, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 1, 0, 0, 1), "pending");
      });
    });
    describe("orderHandling TC15", function () {
      it("should return accepted when accountStatus = medium, creditStatus = high, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(3, 1, 0, 0, 2), "pending");
      });
    });
    describe("orderHandling TC16", function () {
      it("should return accepted when accountStatus = low, creditStatus = high, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(2, 2, 0, 0, 2), "pending");
      });
    });
    describe("orderHandling TC17", function () {
      it("should return accepted when accountStatus = low, creditStatus = high, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(2, 1, 0, 0, 2), "pending");
      });
    });
    describe("orderHandling TC18", function () {
      it("should return accepted when accountStatus = very-low, creditStatus = high, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(1, 2, 0, 0, 2), "pending");
      });
    });
    describe("orderHandling TC19", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = high, productStatus = soldout", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 0, 0, 0, 2), "rejected");
      });
    });
    describe("orderHandling TC20", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = high, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 1, 0, 0, 2), "rejected");
      });
    });
    describe("orderHandling TC21", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = high, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 2, 0, 0, 2), "rejected");
      });
    });
    describe("orderHandling TC22", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = high, productStatus = invalid", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 3, 0, 0, 2), "rejected");
      });
    });
    describe("orderHandling TC23", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = low, productStatus = soldout", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 0, 0, 0, 1), "rejected");
      });
    });
    describe("orderHandling TC24", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = low, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 1, 0, 0, 1), "rejected");
      });
    });
    describe("orderHandling TC25", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = low, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 2, 0, 0, 1), "accepted");
      });
    });
    describe("orderHandling TC26", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = low, productStatus = invalid", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(4, 3, 0, 0, 1), "rejected");
      });
    });
    describe("orderHandling TC27", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = not-allowed, productStatus = soldout", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 0, 0, 0, 0), "rejected");
      });
    });
    describe("orderHandling TC28", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = not-allowed, productStatus = limited", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 1, 0, 0, 0), "rejected");
      });
    });
    describe("orderHandling TC29", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = not-allowed, productStatus = available-to-all", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 2, 0, 0, 0), "rejected");
      });
    });
    describe("orderHandling TC30", function () {
      it("should return accepted when accountStatus = not-eligible, creditStatus = not-allowed, productStatus = invalid", function () {
        //orderHandling(clientAccount, product, inventory, inventoryThreshold, creditCheckMode)
        assert.equal(code.orderHandling(0, 3, 0, 0, 0), "rejected");
      });
    });
  });
});
