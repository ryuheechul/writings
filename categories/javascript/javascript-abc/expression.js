var assert = require('assert');


// literal, name

assert.equal(typeof 0, 'number');

assert.equal(typeof console, 'object');


// ()

assert.equal(typeof ((10 + 20) * 30), 'number');


// member, new

assert.equal(typeof Math.PI, 'number');
assert.equal(typeof Math['PI'], 'number');

assert.equal(typeof new Object, 'object');


// function call

assert.equal(parseInt('200'), 200);


// increment, decrement

var x = 300;
assert.equal(++x, 301);
assert.equal(--x, 300);


// unary

assert.equal(!true, false); // logical not
assert.equal(~1, -2); // bitwise not

assert.equal(+10, 10);
assert.equal(-10, -10);

assert.equal(typeof 10, 'number');

assert.equal(delete { x: 10 }.x, true);
assert.equal(delete { x: 10 }.y, true);

assert.equal(void 'I am here', undefined);


// multiplication

assert.equal(55 * 10, 550);
assert.equal(55 / 10, 5.5);
assert.equal(55 % 10, 5);


// addition

assert.equal(55 + 10, 65);
assert.equal(55 - 10, 45);


// bitwise shift

assert.equal(1 << 3, 8);
assert.equal(8 >> 3, 1);

assert.equal(-1 << 3, -8);
assert.equal(-8 >> 3, -1); // sign reserved
assert.equal(-8 >>> 3, 536870911); // zero filled


// relational

assert.equal(10 >= 5, true);
assert.equal(10 <= 5, false);
assert.equal(10 > 5, true);
assert.equal(10 < 5, false);

assert.equal('NaN' in global, true);

assert.equal('string' instanceof String, false);
assert.equal(new String('string') instanceof String, true);


// equality

assert.equal(10 == '10', true);
assert.equal(10 != '10', false);

assert.equal(10 === '10', false);
assert.equal(10 !== '10', true);


// bitwise and

assert.equal(7 & 2, 2); // bitwise operators treat operands as 32 bits


// bitwise xor

assert.equal(7 ^ 2, 5);


// bitwise or

assert.equal(4 | 2, 6);


// logical and

assert.equal(true && 10, 10);
assert.equal(false && 10, false);


// logical or

assert.equal(10 || 20, 10);
assert.equal(false || 20, 20);


// conditional

assert.equal(true ? 40 : 50, 40);


// assignment

var x;

assert.equal(x = 60, 60);


// comma

assert.equal((70, 80, 90), 90);
