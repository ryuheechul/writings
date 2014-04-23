var assert = require('assert');


// creating

var re = /abc/; // compiled when the script is evaluated
var re = new RegExp("abc");


// flag

var re = /abc/g; // global
var re = /abc/m; // multi line, ^ and $ matches each line delimited by \n or \r.
var re = /abc/i; // ignore case


// regexp methods

assert.equal(/y/.test('xyz'), true);
assert.equal(/c/.test('xyz'), false);

var re = /(1+)(2+)/g;
var str = 'x12y1122z';

assert.deepEqual(re.exec(str), { 0: '12', 1: '1', 2: '2', index: 1, input: 'x12y1122z' });
assert.equal(re.lastIndex, 3);

assert.deepEqual(re.exec(str), { 0: '1122', 1: '11', 2: '22', index: 4, input: 'x12y1122z' });
assert.equal(re.lastIndex, 8);

assert.deepEqual(re.exec(str), null);
assert.equal(re.lastIndex, 0);

assert.deepEqual(re.exec(str), { 0: '12', 1: '1', 2: '2', index: 1, input: 'x12y1122z' });
assert.equal(re.lastIndex, 3);


// string

assert.equal('abcd'.search(/cd/), 2);
assert.equal('xxxx'.search(/cd/), -1);

assert.deepEqual('xxcdexxcde'.match(/c(d)(e)/), { 0: 'cde', 1: 'd', 2: 'e', index: 2, input: 'xxcdexxcde' });
assert.deepEqual('xxcdexxcde'.match(/c(d)(e)/g), [ 'cde', 'cde' ]);
assert.deepEqual('xxcdexxcde'.match(/cdexx/g), [ 'cdexx' ]);
assert.deepEqual('xxcdexxcde'.match(/zzz/g), null);

assert.equal('xxyyxxyx'.replace(/y+/, 'Y'), 'xxYxxyx');
assert.equal('xxyyxxyx'.replace(/y+/g, 'Y'), 'xxYxxYx');

assert.equal('aabbcc'.replace(/b+/, '$$'), 'aa$cc'); // insert $
assert.equal('aabbcc'.replace(/b+/, '$&'), 'aabbcc'); // insert matched
assert.equal('aabbcc'.replace(/b+/, '$`'), 'aaaacc'); // insert preceding
assert.equal('aabbcc'.replace(/b+/, '$\''), 'aacccc'); // insert following
assert.equal('aa12cc'.replace(/(1)(2)/, '$2$1'), 'aa21cc'); // insert remembered

assert.equal('backgroundColor'.replace(/[A-Z]/g, function (match) {
	return '-' + match.toLowerCase();
}), 'background-color');

'backgroundColor'.replace(/(ground)(C)/g, function (match, p1, p2, offset, str) {
	assert.equal(match, 'groundC');
	assert.equal(p1, 'ground');
	assert.equal(p2, 'C');
	assert.equal(offset, 4);
	assert.equal(str, 'backgroundColor');
});

assert.deepEqual('xxyyzz'.split(/y+/), [ 'xx', 'zz' ]);


// pattern

// regexp choice : regexp sequence | regexp sequence

assert.equal(/abc|def/.test('abc'), true);
assert.equal(/abc|def/.test('def'), true);
assert.equal(/abc|def/.test('xyz'), false);


// regexp sequence : (regexp factor (regexp quantifier)) *

assert.equal(/a+bc?/.test('ab'), true);
assert.equal(/a+bc?/.test('aab'), true);
assert.equal(/a+bc?/.test('aabc'), true);


// regexp factor : charactor, escape, class, group

// character

assert.equal(/A/.test('A'), true); // characters

assert.equal(/^abc/.test('abc def'), true); // match beginning of line
assert.equal(/^abc/.test('def abc'), false);

assert.equal(/abc$/.test('abc def'), false); // match end of line
assert.equal(/abc$/.test('def abc'), true);

assert.equal(/a.c/.test('abc'), true); // match any single character except the newline

// escape

assert.equal(/\u0041/.test('\u0041'), true); // unicode
assert.equal(/\xAF/.test('\xAF'), true); // hex

//assert.equal(/\0101/.test('\101')); // octal pattern not compatible between engines, don't use.
//assert.equal(/\0/.test('\u0000'));

assert.equal(/\./.test('.'), true); // special characters : \ / [ ] ( ) { } ? + * | . ^ $

assert.equal(/\f\n\r\t\v/.test('\f\n\r\t\v'), true);

assert.equal(/\bcd/.test('ab cd'), true); // word boundary, USELESS for multilingual applications
assert.equal(/\bcd/.test('abcd'), false);
assert.equal(/\Bcd/.test('abcd'), true);

assert.equal(/\d+/.test('123'), true); // [0-9]
assert.equal(/\D+/.test('abc'), true);

assert.equal(/\s+/.test(' \n\t'), true); // [\f\n\r\t\u000B\u0020\u00A0\u2028\u2029], partial of unicode whitespaces.
assert.equal(/\S+/.test('abc'), true);

assert.equal(/\w+/.test('0A_'), true); // [0-9A-Z_a-z]
assert.equal(/\W+/.test('-!@'), true);

assert.equal(/\cJ/.test('\n'), true); // control character

// group

assert.equal(/(abc) \1/.test('abc abc'), true); // capturing, \1 \2 \3 ... : back reference

assert.equal(/(?:abc)/.test('abc'), true); // noncapturing, faster

assert.equal(/abc(?=123)/.test('abc123'), true); // lookahead. matches x only if y follows.
assert.equal(/abc(?=123)/.test('abcdef'), false);

assert.equal(/abc(?!123)/.test('abc123'), false); // negative lookahead. matches x only if y does not follow.
assert.equal(/abc(?!123)/.test('abcdef'), true);

// class

assert.equal(/[abcd]+/.test('aabbccdd'), true);
assert.equal(/[a-d]+/.test('aabbccdd'), true); // range
assert.equal(/[^a-d]+/.test('123!*'), true); // negative

assert.equal(/[\u0061-\u0064]+/.test('aabbccdd'), true);

assert.equal(/[x\-]+/.test('x---x'), true);  // class specials      : \ / [ ] - ^
assert.equal(/[x?+*]+/.test('x?+*x'), true); // cf, factor specials : \ / [ ] ( ) { } ? + * | . ^ $

assert.equal(/[x\f\n\r\t\v]+/.test('x\f\n\r\t\vx'), true);
assert.equal(/[x\b]+/.test('x\bx'), true); // backspace

assert.equal(/[x\d]+/.test('x123x'), true);
assert.equal(/[x\s]+/.test('x \n\tx'), true);
assert.equal(/[#\w]+/.test('#0aA_#'), true);


// regexp quantifier

assert.equal(/x*y/.test('y'), true); // { 0, }
assert.equal(/x*y/.test('xy'), true);
assert.equal(/x*y/.test('xxy'), true);

assert.equal(/x+y/.test('y'), false); // { 1, }
assert.equal(/x+y/.test('xy'), true);
assert.equal(/x+y/.test('xxy'), true);

assert.equal(/x?y/.test('y'), true); // { 0, 1 }
assert.equal(/x?y/.test('xy'), true);

assert.equal(/x{3}y/.test('xy'), false); // exactly n occurrences of x.
assert.equal(/x{3}y/.test('xxxy'), true);

assert.equal(/x{2,3}y/.test('xy'), false);
assert.equal(/x{2,3}y/.test('xxy'), true);
assert.equal(/x{2,3}y/.test('xxxy'), true);

assert.deepEqual('aaa'.match(/a+/g), [ 'aaa' ]); // greedy
assert.deepEqual('aaa'.match(/a+?/g), [ 'a', 'a', 'a' ]); // lazy, as few as possible


// sample

// URL 파서. 괴상한 문자들 처리에 완벽하진 않다. 참고만.
var parseUrl = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var parseNumber = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i;

// 32 ASCII special characters
var specials = /(?:!|"|#|\$|%|&|'|\(|\)|\*|\+|,|-|\.|\/|:|;|<|=|>|@|\[|\\|]|\^|_|`|\{|\||\}|~)/;
var specials = /[!-\/:-@\[-`{-~]/;

