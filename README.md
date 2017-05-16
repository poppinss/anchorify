# Anchorify

Convert all links inside a string to HTML **anchor tags**. It supports.

[![Travis](https://img.shields.io/travis/poppinss/anchorify.svg?style=flat-square)](https://travis-ci.org/poppinss/anchorify)

1. URLs with(out) protocol.
2. Detect email vs plain URLs.
3. Adds `rel="noreferrer noopener"` as a security measure.
4. Normalizes urls without procotol or `www`.
5. Recognize existing anchor tags.


## Installation

The code is hand-written in ES5 and is supposed to work with all major browsers. It makes use of `var` over `let or const` and `for` over `forEach`.

But you will need a commonjs module loader to make use of it.

```bash
npm i --save anchorify
```

## Usage


```js
const anchorify = require('anchorify')

assert.equal(
  anchorify('Visit google.com'),
  'Visit <a href="http://google.com"> google.com </a>'
)

// Set custom target
assert.equal(
  anchorify('Visit google.com', { target: '_blank' }),
  'Visit <a href="http://google.com" target="_blank" ref="noreferrer noopener"> google.com </a>'
)

// Do not touch existing anchor tags
assert.equal(
  anchorify('Visit <a href="http://google.com"> google.com </a>', { target: '_blank' }),
  'Visit <a href="http://google.com"> google.com </a>'
)

// Detect email
assert.equal(
  anchorify('You can reach me at foo@bar.com'),
  'You can reach me at <a href="mailto:foo@bar.com"> foo@bar.com </a>'
)

// Let browser decide the protocol
assert.equal(
  anchorify('Open //google.com'),
  'Open <a href="//google.com"> google.com </a>'
)
```
