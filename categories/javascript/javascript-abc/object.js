var assert = require('assert');

// null

assert.equal(null + '', 'null');
assert.equal('null' in global, false, 'null is keyword');

assert.equal(undefined + '', 'undefined');
assert.equal('undefined' in global, true, 'undefined is a property of global');


// creating object with literal

var obj = {};

assert.equal(obj.__proto__, Object.prototype);
assert.equal(obj.hasOwnProperty('constructor'), false);

assert.equal(Object.prototype.constructor, Object);
assert.equal(Object.prototype.hasOwnProperty('constructor'), true);


var obj = {
	x: 10,
	getX: function () {
		return this.x + 1;
	}
};

assert.equal(obj.x, 10);
assert.equal(obj.getX(), 11);


// creating object with constructor

var Obj = function () {
	this.x = 10;
}

Obj.prototype.getX = function () {
	return this.x + 1;
};

var obj = new Obj();

assert.equal(obj.__proto__, Obj.prototype);
assert.equal(Obj.prototype.constructor, Obj);

assert.equal(obj.x, 10);
assert.equal(obj.getX(), 11);


// inheritance type 0

var proto = {
	x: 10,
	y: 20
};

var obj = {
	x: 30,
	__proto__: proto
};

assert.equal(obj.x, 30);
assert.equal(obj.y, 20);

obj.y = 50;

assert.equal(obj.y, 50);
assert.equal(proto.y, 20);


// inheritance type 1

var Proto = function () {
	this.x = 10;
	this.y = 20;
}

var Obj = function () {
	this.x = 30;
}

Obj.prototype = new Proto(); // constructor 프로퍼티가 소실되는데 쓰이는 곳이 거의 없는 듯 하다.

var obj = new Obj();

assert.equal(obj instanceof Obj, true);
assert.equal(obj.__proto__, Obj.prototype);

assert.equal(obj instanceof Proto, true);
assert.equal(obj.__proto__.__proto__, Proto.prototype);

assert.equal(obj.constructor, Proto.prototype.constructor);

assert.equal(obj.x, 30);
assert.equal(obj.y, 20);


// inheritance type 2

var Proto = function () {
	this.x = 10;
	this.y = 20;
}

var Obj = function () {
	Proto.call(this);
	this.x = 30;
}

var obj = new Obj();

assert.equal(obj instanceof Obj, true);
assert.equal(obj.__proto__, Obj.prototype);

assert.equal(obj.x, 30);
assert.equal(obj.y, 20);


// creating object with closure

var obj = (function () {
	var x = 30;

	return {
		getX: function () {
			return x + 1;
		}
	}
})();

assert.equal(obj.getX(), 31);


// creating object with Object.create

// very slow on Chrome ~26.
// http://jsperf.com/create-new/2


// properties

var obj = {};

obj.type = 'dot syntax';
obj['date created'] = 'string with space';
obj[''] = 'even an empty string';

assert.deepEqual(obj, {
	type: 'dot syntax',
	'date created': 'string with space',
	'': 'even an empty string'
});


// safely accessing properties

var obj = {};

assert.equal(obj.missed, undefined);
assert.equal(obj.missed || 'default', 'default');

var obj = undefined;

assert.throws(function () { obj.prop; });
assert.equal(obj && obj.prop, undefined);


// enumerating properties

var obj = { x: 30, __proto__: { x: 10, y: 20 }};

var r = [];
for (var p in obj) {
	r.push(p);
}

assert.deepEqual(r, [ 'x', 'y' ]);

var r = [];
for (var p in obj) {
	if (obj.hasOwnProperty(p)) {
		r.push(p);
	}
}

assert.deepEqual(r, [ 'x' ]);
assert.deepEqual(Object.keys(obj), [ 'x' ]);


// enumerating undefined

var count = 0;
for (var p in undefined) {
	count++;
}

assert.equal(count, 0);


// enumerating properties selectively

var obj = { a: 10, b: 20, c: 30 };
var pl = [ 'b', 'c' ];
var r = [];

for (var i = 0; i < pl.length; i ++) {
	r.push(pl[i]);
	r.push(obj[pl[i]]);
}

assert.deepEqual(r, [ 'b', 20, 'c', 30 ]);


// getters, setters

var obj = {
	a: 5,
	get b() {
		return this.a + 1;
	},
	set c(x) {
		this.a = x / 2;
	}
};

assert.equal(obj.a, 5);
assert.equal(obj.b, 6);
//assert.equal(obj.c, undefined);

obj.c = 20;

assert.equal(obj.a, 10);
assert.equal(obj.b, 11);
//assert.equal(obj.c, undefined);


// deleting property

var obj = { a: 10, b: 20 };

delete obj.a;
assert.deepEqual(obj, { b: 20 });


// defineProperty

var obj = {};

assert.equal(obj.x, undefined);

Object.defineProperty(obj, "x", {
	enumerable: true,
	configurable: false,
	writable: true,
	value: 10
});

Object.defineProperty(obj, "xx", {
	enumerable: false,
	configurable: false,
	get: function () { return this.x + 5; },
	set: function (value) { this.x = value - 5}
});

assert.equal('x' in obj, true);
assert.equal('xx' in obj, true);
assert.equal('xxx' in obj, false);

assert.deepEqual(obj, { x: 10 });

obj.x = 20;
assert.equal(obj.x, 20);
assert.equal(obj.xx, 25);

obj.xx = 50;
assert.equal(obj.x, 45);
assert.equal(obj.xx, 50);


// http://ejohn.org/blog/simple-javascript-inheritance/

(function () {

	var initializing = false,
		superPattern = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

	Object.subClass = function (properties) {
		var _super = this.prototype;

		initializing = true;
		var proto = new this();
		initializing = false;

		for (var name in properties) {
			proto[name] = typeof properties[name] == "function" &&
				typeof _super[name] == "function" &&
				superPattern.test(properties[name]) ?
				(function (name, fn) {
					return function () {
						var tmp = this._super;
						this._super = _super[name];
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, properties[name]) :
				properties[name];
		}

		function Class() {
			// All construction is actually done in the init method
			if (!initializing && this.init)
				this.init.apply(this, arguments);
		}

		Class.prototype = proto;
		Class.constructor = Class;
		Class.subClass = arguments.callee;
		return Class;
	}
})();

var Proto = Object.subClass({
	init: function(name) {
		this.name = name;
	},
	getColored: function() {
		return 'red ' + this.name;
	}
});

var Obj = Proto.subClass({
	init: function() {
		this._super('bird');
	},
	getColored: function() {
		return 'blue ' + this._super();
	},
	flyable: function() {
		return true;
	}
});

var proto = new Proto('dog');

assert.equal(proto.name, 'dog');
assert.equal(proto.getColored(), 'red dog');

var obj = new Obj();

assert.equal(obj.name, 'bird');
assert.equal(obj.getColored(), 'blue red bird');
assert.equal(obj.flyable(), true);
