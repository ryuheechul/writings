var assert = require('assert');

// creating named function

function funcNamed() {
	return;
}

assert.equal(typeof funcNamed, 'function');
assert.equal(funcNamed.__proto__, Function.prototype);

assert.equal(funcNamed.name, 'funcNamed');
assert.equal(funcNamed.length, 0);
assert.equal(funcNamed(), undefined);


// creating anonymous function

var func = function () {
	return;
};

assert.equal(func.name, '');
assert.equal(func.length, 0);
assert.equal(func(), undefined);

var func = function (x) {
	return x;
};

assert.equal(func.name, '');
assert.equal(func.length, 1);
assert.equal(func(10), 10);


// named anonymous function to refer itself

var func = function fac(n) { //
	return n < 2 ? 1 : n * fac(n - 1);
};

assert.equal(func.name, 'fac');
assert.equal(func(3), 6);


// creating function with closure

var func = function (x) {

	assert.equal(y, undefined);
	//assert.equal(r, undefined); // throws error, r is not defined.

	var y = 20;

	assert.equal(y, 20);

	var inner = function () {
		assert.equal(x, 10);
		assert.equal(y, 20);
		assert.equal(z, 30);
		assert.equal(t, undefined);
		return 'ok';
	};

	var z = 30;

	return inner;

	var t = 40;
}

assert.equal(func(10)(), 'ok');


// creating function with constructor, inefficient.

var func = new Function('a', 'return a * a * a;');

assert.equal(func.name, '');
assert.equal(func(2), 8);


// function as normal

var func = function () {
	return this;
}

assert.equal(func(), global);


// function as constructor

var Obj = function () {
	this.x = 10;
}

assert.equal(new Obj().x, 10);


// function as method

var obj = {
	method1: function () {
		return this;
	},
	method2: function () {
		function inner() {
			return this;
		}
		return inner();
	},
	method3: function () {
		var _this = this;
		function inner() {
			return _this;
		}
		return inner();
	}
}

assert.equal(obj.method1(), obj);
assert.equal(obj.method2(), global);
assert.equal(obj.method3(), obj);


// function through apply

var obj = { x: 10, y: 20 };

var func = function (c, d) {
	return this.x + this.y + c + d;
}

assert.equal(func.apply(obj, [ 30, 40 ]), 100);
assert.equal(func.call(obj, 30, 40), 100);


// function as arguments

var callback = function (x) {
	return x * 10;
}

var func = function (fn) {
	return fn(10);
}


assert.equal(func(callback), 100);


// arguments are maintained in an array-like object.

var func = function () {
	var r = [];
	for (var i = 0; i < arguments.length; i++) {
		r.push(arguments[i]);
	}
	return r;
}

assert.deepEqual(func('a', 'b', 'c'), [ 'a', 'b', 'c' ]);


// passing arguments through

var func = function () {
	return String.prototype.concat.apply('abc', arguments);
}

assert.equal('abc'.concat('d', 'e', 'f'), 'abcdef');
assert.equal(func('d', 'e', 'f'), 'abcdef');


// making arguments as array

var func = function () {
	var _args = Array.prototype.slice.call(arguments);
	return _args.concat([4, 5, 6]);
};

assert.deepEqual(func(1, 2, 3), [ 1, 2, 3, 4, 5, 6 ]);


// bind

var obj = {
	x : 'x'
};

var func = function (y, z) {
	return this.x + y + z;
};

assert.equal(func.bind(obj)('y' ,'z'), 'xyz');
assert.equal(func.bind(obj, 'y')('z'), 'xyz');


// function declaration can be below the call

assert.equal(funcBelow(), 'below');

function funcBelow(){
	return 'below';
}


// functions should be at top level, SO, DO NOT THIS

if (true){
	function doNotThis() {
	}
}


// dump function source

assert.equal(typeof func.toString(), 'string');


// function object creation

var r1 = [];
var r2 = [];
var r3 = [];

function makeFunction() {

	function inner1() {
	}

	var inner2 = function () {
	}

	r1.push(inner1);
	r2.push(inner2);
	r3.push(makeFunction);
}

makeFunction();
makeFunction();

assert.notEqual(r1[0], r1[1]);
assert.notEqual(r2[0], r2[1]);
assert.equal(r3[0], r3[1]);
