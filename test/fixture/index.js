"use strict";

var Backbone = require("backbone");

/**
 * SomeClass
 *
 * @class
 */
var SomeClass = Backbone.Model.extend({
    someProperty: "someValue",

    someOuterMethod : function () {
        if (someCondition) {
            // someInnerMethod will be called here.
            i.want.to.call.someInnerMethod();
        }
    }
});
