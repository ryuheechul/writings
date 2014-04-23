
// comment.

/*
	multiline comment.
*/


// names

var abc, abc123, abc_def, _abc, $abc;

// variables

var x = 42;
var y;
var z, z;

console.log(x); // 42
console.log(y); // undefined

var x;
console.log(x); // 42


// there is no block scope

var noBlock = 1;
{
	var noBlock = 2;
}

console.log(noBlock); // 2


// global variables are properties of the global object

globalX = 10;
console.log(global.globalX);   // 10, global.X for node, window.X for browser

delete globalX;
console.log(global.globalX);   // undefined


// const

const const1 = '212';

console.log(const1); // 212
//const1 = 414;
//console.log(const1); // 212


// statements, separated by semicolons

void 0;


// if

if (false) { // falsy values: false, null, undefined, '', 0, NaN
	;
} else if (false) {
	;
} else {
	console.log('end if');
}


// switch

switch ('def') {
	case 'abc':
		;
		break;

	case 'def':
		;
		break;

	default:
		;
}


// for

for (var i = 0; i < 5; i++) {
	console.log(i); // 0, 1, 2, 3, 4
}

for (var i = 0; ; i++) {  // if omitted, true.
	console.log('infinite');
	break;
}

var foo = { a: 10, b: 20 };

for (var prop in foo) {
	console.log(prop); // a, b
}


// while

do {
	console.log('in do while');
	break;
} while (true);

while (true) {
	console.log('in while');
	break;
}


// break, label

outer: for (var i = 0; i < 2; i++) {
	for (var j = 0; ; j++) {
		console.log(i, j); // 0 0, 0 1, 0 2
		if (j === 2) break outer;
	}
}


// continue, label

outer: for (var i = 0; i < 2; i++) {
	for (var j = 0; ; j++) {
		console.log(i, j); // 0 0, 0 1, 0 2, 1 0, 1 1, 1 2
		if (j === 2) continue outer;
	}
}


// try

try {
	console.log('before throw');
	throw new Error('some error');
	console.log('after throw');
} catch (e) {
	console.log(e); // [Error: some error]
} finally {
	console.log('finally');
}

