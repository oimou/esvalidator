"use strict";

var esprima = require("esprima");
var validate = require("jsonschema").validate;

/**
 * ESValidator
 *
 * @class
 * @exports ESValidator
 * @constructor
 * @param {String} content
 */
var ESValidator = function ESValidator(content) {
    console.assert(typeof content === "string", "content should be a string");

    this.tree = esprima.parse(content);
};

/**
 * Check whether outerMethod contains innerMethod in the function body
 *
 * @param {String} outerMethod
 * @param {String} innerMethod
 * @return {Object}
 */
ESValidator.prototype.contain = function (outerMethod, innerMethod) {
    console.assert(typeof outerMethod === "string", "outerMethod should be a string");
    console.assert(typeof innerMethod === "string", "innerMethod should be a string");

    function traverse(node, hasExpectedStructure, onFound) {
        var found = false;
        var res;

        if (hasExpectedStructure(node)) {
            return node;
        } else {
            for (var key in node) {
                if (typeof node[key] === "object") {
                    res = traverse(node[key], hasExpectedStructure, onFound);
                    found = res || found;
                }
            }
        }

        return found;
    }

    function onFoundOuter(node) {
        var body = node.value.body.body;

        return traverse(
            body,

            function hasExpectedStructure(obj) {
                return !validate(
                    obj,

                    {
                        "type" : "object",
                        "properties" : {
                            "type" : {
                                "type" : "string",
                                "pattern" : "CallExpression",
                                "required" : true
                            },

                            "callee" : {
                                "type" : "object",
                                "properties" : {
                                    "type" : {
                                        "type" : "string",
                                        "pattern" : "MemberExpression",
                                        "required" : true
                                    },

                                    "property" : {
                                        "type" : "object",
                                        "properties" : {
                                            "type" : {
                                                "type" : "string",
                                                "patern" : "Identifier",
                                                "required" : true
                                            },

                                            "name" : {
                                                "type" : "string",
                                                "patern" : innerMethod,
                                                "required" : true
                                            }
                                        },
                                        "required" : true
                                    }
                                },
                                "required" : true
                            }
                        }
                    }
                ).errors.length && obj.callee.property.name === innerMethod;
            }
        );
    }

    var outer = traverse(
        this.tree,

        function hasExpectedStructure(obj) {
            return !validate(
                obj,

                {
                    "type" : "object",
                    "properties" : {
                        "type" : {
                            "type" : "string",
                            "pattern" : "Property",
                            "required" : true
                        },

                        "key" : {
                            "type" : "object",
                            "properties" : {
                                "name" : {
                                    "type" : "string",
                                    "pattern" : outerMethod,
                                    "required" : true
                                }
                            },
                            "required" : true
                        }
                    }
                }
            ).errors.length;
        }
    );

    if (!outer) {
        return false;
    }
    var inner = onFoundOuter(outer);

    if (!inner) {
        return false;
    }

    return inner;
};

module.exports = ESValidator;
