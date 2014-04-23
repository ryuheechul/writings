var assert = require('assert');

assert.equal(typeof 0, 'number');        // there is no integer type.
assert.equal(typeof 42, 'number');       // always 64bit floating point.
assert.equal(typeof 3.14, 'number');
assert.equal(typeof 1e2, 'number');      // 100
assert.equal(typeof NaN, 'number');      // global.NaN
assert.equal(typeof Infinity, 'number'); // global.Infinity, greater than 1.79769313486231570e+308

assert.equal(10, 10);   // base 10
assert.equal(010, 8);   // base 8
assert.equal(0x10, 16); // base 16

assert.equal(parseInt('11'), 11); // bad
assert.equal(parseInt('11.1'), 11);
assert.equal(parseInt('11xx'), 11);
assert.equal(isNaN(parseInt('xx')), true);
assert.equal(isNaN(parseInt('')), true);

assert.equal(parseInt('08'), 0); // bad
assert.equal(parseInt('08', 10), 8); // good

assert.equal(parseFloat('11.1'), 11.1);

assert.equal(Number('11'), 11);
assert.equal(Number('11.1'), 11.1);
assert.equal(isNaN(Number('11xx')), true);
assert.equal(isNaN(Number('xx')), true);
assert.equal(Number(''), 0); // cf:parseInt('') is NaN

assert.equal(typeof new Number('11.1'), 'object'); // DO NOT USE
assert.equal(new Number('11.1').valueOf(), 11.1);

assert.equal(typeof '11', 'string');
assert.equal(typeof +'11', 'number');

assert.equal(typeof (84.5283).toFixed(0), 'string'); //
assert.equal((84.5283).toFixed(0), '85');
assert.equal((84.5283).toFixed(2), '84.53');

assert.equal(typeof (84.5283).toPrecision(1), 'string');
assert.equal((84.5283).toPrecision(1), '8e+1');
assert.equal((84.5283).toPrecision(2), '85');
assert.equal((84.5283).toPrecision(4), '84.53');

assert.equal((123).toString(), '123');
assert.equal((16).toString(16), '10'); // radix

assert.equal((123).toString(), String(123));
