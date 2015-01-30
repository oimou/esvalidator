# ESValidator

[![Build Status](https://travis-ci.org/oimou/esvalidator.svg)](https://travis-ci.org/oimou/esvalidator)

ESValidator is a simple static validation tool powered by [esprima](http://esprima.org/).
It makes validating code structure easier.

## Installation

```
npm install esvalidator
```

## Usage

```
var fs = require("fs");
var ESValidator = require("esvalidator");

var code = fs.readFileSync("someCode.js").toString();
var validator = new ESValidator(code);

if (validator.contain("outerMethod", "innerMethod")) {
    console.log("There is CallExpression of innerMethod in outerMethod!");
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

0.0.1

* The first version

## License

MIT License
