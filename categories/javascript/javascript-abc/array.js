var assert = require('assert');

// creating array

var a1 = new Array(3);
var a2 = Array(3);
var a3 = []; a3.length = 3;

assert.equal(a1[0], undefined);
assert.equal(a1[1], undefined);
assert.equal(a1[2], undefined);
assert.equal(a1.length, 3);

assert.deepEqual(a1, a2);
assert.deepEqual(a2, a3);
assert.notDeepEqual(a1, [ undefined, undefined, undefined ]);

assert.equal([ , , ].length, 2); // not 3

var a1 = [ 'a', 'b', 'c' ];
var a2 = new Array('a', 'b', 'c');
var a3 = Array('a', 'b', 'c');

assert.equal(a1[0], 'a');
assert.equal(a1[1], 'b');
assert.equal(a1[2], 'c');
assert.equal(a1.length, 3);

assert.deepEqual(a1, a2);
assert.deepEqual(a2, a3);

var a = [ 'a', , 'c' ];

assert.equal(a[0], 'a');
assert.equal(a[1], undefined);
assert.equal(a[2], 'c');
assert.equal(a.length, 3);


// is array ?

assert.equal(Array.isArray([]), true);
assert.equal(Array.isArray({}), false);

assert.equal(typeof [], 'object');
assert.equal(Object.prototype.toString.apply([]), '[object Array]');


// length

var a = [ 'a', 'b', 'c' ];

assert.equal(a.length, 3);

a.length = 2;
assert.deepEqual(a, [ 'a', 'b' ]);

a.length = 0;
assert.deepEqual(a, []);

a.length = 3;
assert.deepEqual(a, new Array(3));


// enumerating

var colors = [ 'red', 'green', 'blue' ];

var r = [];
for (var i = 0; i < colors.length; i++) {
	r.push(colors[i]);
}

assert.deepEqual(r, [ 'red', 'green', 'blue' ]);

var r = [];
colors.forEach(function(color) {
	r.push(color);
});

assert.deepEqual(r, [ 'red', 'green', 'blue' ]);


// functional operation

assert.deepEqual([ 'a', 'b', 'c' ].map(function (item) {
	return item.toUpperCase();
}), [ 'A', 'B', 'C' ]);

assert.deepEqual([ 'a', 10, 'b', 20 ].filter(function (item) {
	return typeof item === 'number';
}), [ 10, 20 ]);

function isNumber(value){
	return typeof value == 'number';
}

assert.equal([ 1, 2, 3 ].every(isNumber), true);
assert.equal([ 1, '2', 3 ].every(isNumber), false);

assert.equal([ 1, 2, 3 ].some(isNumber), true);
assert.equal([ 1, '2', 3 ].some(isNumber), true);
assert.equal([ '1', '2', '3' ].some(isNumber), false);

assert.equal([ 1, 2, 3].reduce(function(first, second) {
	return first + second;
}, 0), 6);

assert.equal([ 1, 2, 3].reduceRight(function(first, second) {
	return first + second;
}, 0), 6);


// sorting

var arr = [ 52, 97, 3, 62, 10, 63, 64, 1, 9, 3, 4 ];

arr.sort()

assert.deepEqual(arr, [ 1, 10, 3, 3, 4, 52, 62, 63, 64, 9, 97 ]);

arr.sort(function(a,b) {
	if (a < b) {
		return -1; }
	if (a > b) {
		return 1;
	}
	return 0;
});

assert.deepEqual(arr, [ 1, 3, 3, 4, 9, 10, 52, 62, 63, 64, 97 ]);

assert.deepEqual([ 1, 2, 3 ].reverse(), [ 3, 2, 1 ]);


// push, pop

var a = [ 1, 2, 3 ];

a.push(10);
assert.deepEqual(a, [ 1, 2, 3, 10 ]);

assert.equal(a.pop(), 10);
assert.deepEqual(a, [ 1, 2, 3 ]);

var a = [ 1, 2, 3 ];

assert.deepEqual(a.shift(), 1);
assert.deepEqual(a, [ 2, 3 ]);

var a = [ 1, 2, 3 ];

a.unshift(99)
assert.deepEqual(a, [ 99, 1, 2, 3 ]);


// concat, slice

var a = [ 1, 2, 9 ];

assert.deepEqual(a.concat(4, 5), [ 1, 2, 9, 4, 5 ]);
assert.deepEqual(a.concat([ 4, 5 ]), [ 1, 2, 9, 4, 5 ]);
assert.deepEqual(a.concat([ 4, 5 ], [ 6, 7 ]), [ 1, 2, 9, 4, 5, 6, 7 ]);

assert.deepEqual(a.join('-'), '1-2-9');

var a = [ 0, 1 , 2, 3, 4 ];

assert.deepEqual(a.slice(), [ 0, 1, 2, 3, 4 ]);
assert.deepEqual(a.slice(1), [ 1, 2, 3, 4 ]);
assert.deepEqual(a.slice(1, 3), [ 1, 2 ]);
assert.deepEqual(a, [ 0, 1, 2, 3, 4 ]);

var a = [ 0, 1, 2, 3, 4 ];

assert.deepEqual(a.splice(1, 3), [ 1, 2, 3 ]);
assert.deepEqual(a, [ 0, 4 ]);

var a = [ 0, 1, 2, 3, 4 ];

assert.deepEqual(a.splice(1, 3, 77, 99), [ 1, 2, 3 ]);
assert.deepEqual(a, [ 0, 77, 99, 4 ]);

var a = [ 0, 1, 2, 3, 4 ];

assert.deepEqual(a.splice(1, 3, [ 77, 99 ]), [ 1, 2, 3 ]);
assert.deepEqual(a, [ 0, [ 77, 99 ], 4 ]);


// searching

assert.equal([ 'a', 'b', 'a', 'b', 'a' ].indexOf('b'), 1);
assert.equal([ 'a', 'b', 'a', 'b', 'a' ].indexOf('b', 2), 3);
assert.equal([ 'a', 'b', 'a', 'b', 'a' ].indexOf('z'), -1);

assert.equal([ 'a', 'b', 'a', 'b', 'a' ].lastIndexOf('b'), 3);
