var assert = require('assert');

assert.equal(typeof true, 'boolean');  // primitive, not object
assert.equal(typeof false, 'boolean');

assert.equal(typeof new Boolean(false), 'object'); // don't use new Boolean.
assert.equal(!!new Boolean(false), true);
