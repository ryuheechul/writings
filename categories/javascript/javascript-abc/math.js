var assert = require('assert');

assert.equal(Math.ceil(6.5), 7);
assert.equal(Math.floor(6.5), 6);

assert.equal(Math.min(10, 20), 10);
assert.equal(Math.max(10, 20), 20);

assert.equal(typeof Math.random(), 'number'); // [0, 1)

