var assert = require('assert');

// string literal

assert.equal(typeof 'abc', 'string'); // all characters in JavaScript are 16 bits wide.
assert.equal(typeof "abc", 'string');

assert.equal(typeof '\" \' \\ \/ \b \f \n \r \t \377 \xA9 \u00A9', 'string');

assert.equal(typeof 'this string \
is broken \
across multiple\
lines.', 'string');

assert.equal('The answer is ' + 42, 'The answer is 42');
assert.equal(42 + ' is the answer', '42 is the answer');

assert.equal('37' - 7, 30);
assert.equal('37' + 7, '377');


// string object

assert.equal(typeof new String('abc'), 'object'); // don’t use new Boolean, new Number, new String.

assert.equal('seven'.length, 5); // string literal automatically converted to a temporary String object.

assert.equal('abc'.charAt(1), 'b');
assert.equal('abc'.charCodeAt(1), 98);
assert.equal(String.fromCharCode(98), 'b');
assert.equal(String.fromCharCode(97, 98, 99), 'abc');

assert.equal('ababab'.indexOf('ba'), 1);
assert.equal('ababab'.indexOf('x'), -1);

assert.equal(!!~'ababab'.indexOf('ba'), true);
assert.equal(!!~'ababab'.indexOf('x'), false);

assert.equal('ababab'.lastIndexOf('ba'), 3);

assert.equal('ab'.concat('cd', 'ef'), 'abcdef');

assert.deepEqual('a,b,c,d'.split(','), [ 'a', 'b', 'c', 'd' ]);
assert.deepEqual('a,b,c,d'.split(',', 3), [ 'a', 'b', 'c' ]); // limit

assert.deepEqual('a,b.c-d'.split(/[,.-]/), [ 'a', 'b', 'c', 'd' ]);
assert.deepEqual('a,b.c-d'.split(/([,.-])/), [ 'a', ',', 'b', '.', 'c', '-', 'd' ]);

assert.equal('01234'.slice(2), '234');
assert.equal('01234'.slice(2, 4), '23');
assert.equal('01234'.slice(2, 0), '');
assert.equal('01234'.slice(2, -1), '23');
assert.equal('01234'.slice(-2, -1), '3');
assert.equal('01234'.slice(-2), '34');

assert.equal('01234'.substring(2, 4), '23'); // DO NOT USE THIS, USE slice.
assert.equal('01234'.substr(2, 2), '23');    // DO NOT USE THIS, USE slice.

assert.equal('cat'.toUpperCase(), 'CAT');
assert.equal('DOG'.toLowerCase(), 'dog');

// for match, search, replace, see regexp.js.