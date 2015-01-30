"use strict";

var fs = require("fs");
var path = require("path");
var assert = require("assert");

describe("ESValidator", function () {
    var ESValidator = require("../");

    describe("#contain", function () {
        var content = fs.readFileSync(path.join(__dirname, "fixture/index.js")).toString();
        var validator;

        beforeEach(function () {
            validator = new ESValidator(content);
        });

        it("should return true if there is CallExpression of innerMethod in outerMethod", function () {
            var res = validator.contain("someOuterMethod", "someInnerMethod");

            assert.ok(res);
        });
    });
});
