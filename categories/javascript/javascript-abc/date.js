var assert = require('assert');

// Today

assert.equal(typeof new Date(), 'object');           // ex: 'Tue Mar 12 2013 09:02:56 GMT+0900 (KST)'

assert.equal(typeof new Date().getTime(), 'number'); // ex: 1363046619852
assert.equal(typeof Date.now(), 'number');           // ex: 1363046619852

// Specific

// month: 0 ~ 11

assert.equal(new Date(1995, 11, 25),                 'Mon Dec 25 1995 00:00:00 GMT+0900 (KST)');
assert.equal(new Date(1995, 11, 25, 13, 30, 0),      'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)');
assert.equal(new Date('December 25, 1995'),          'Mon Dec 25 1995 00:00:00 GMT+0900 (KST)');
assert.equal(new Date('December 25, 1995 13:30:00'), 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)');
assert.equal(new Date('1995-12-25 13:30:00'),        'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)');
assert.equal(new Date(819865800000),                 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)');

assert.equal(Date.parse('December 25, 1995 13:30:00'),       819865800000);
assert.equal(Date.parse('1995-12-25 13:30:00'),              819865800000);

assert.equal(Date.parse('December 25, 1995 13:30:00 GMT+0'), 819898200000);
assert.equal(Date.parse('1995-12-25T13:30:00+00:00'),        819898200000);
assert.equal(Date.parse('1995-12-25T13:30:00Z'),             819898200000);

assert.equal(Date.UTC(1995, 11, 25, 13, 30, 0),              819898200000);

// gets

var d = new Date(1995, 11, 25, 13, 30, 0);

assert.equal(d.getFullYear(), 1995);
assert.equal(d.getMonth(), 11); // 0 ~ 11, not 1 ~ 12
assert.equal(d.getDate(), 25);

assert.equal(d.getDay(), 1); // sunday: 0, 0 ~ 6

assert.equal(d.getHours(), 13);
assert.equal(d.getMinutes(), 30);
assert.equal(d.getSeconds(), 0);

assert.equal(d.getMilliseconds(), 0);

assert.equal(d.getTime(), 819865800000);
assert.equal(d.getTimezoneOffset(), -540); // time-zone offset in minutes

// gets, UTC

assert.equal(d.getUTCFullYear(), 1995);
assert.equal(d.getUTCMonth(), 11); // 0 ~ 11, not 1 ~ 12
assert.equal(d.getUTCDate(), 25);

assert.equal(d.getUTCDay(), 1); // sunday: 0, 0 ~ 6

assert.equal(d.getUTCHours(), 4);
assert.equal(d.getUTCMinutes(), 30);
assert.equal(d.getUTCSeconds(), 0);

assert.equal(d.getUTCMilliseconds(), 0);

// sets

// d.setXXX(...);
// d.setUTCXXX(...);

// toString

assert.equal(d.toString(),       'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)');
assert.equal(d.toLocaleString(), 'Mon Dec 25 1995 13:30:00 GMT+0900 (KST)');
assert.equal(d.toUTCString(),    'Mon, 25 Dec 1995 04:30:00 GMT');
assert.equal(d.toISOString(),    '1995-12-25T04:30:00.000Z');

assert.equal(d.toDateString(),       'Mon Dec 25 1995');
assert.equal(d.toLocaleDateString(), 'Monday, December 25, 1995');

assert.equal(d.toTimeString(),       '13:30:00 GMT+0900 (KST)');
assert.equal(d.toLocaleTimeString(), '13:30:00');

// toString, Custom

function pad(n) {
	var s = "0" + n;
	return s.substr(s.length - 2, 2);
}

function formatDateTime (d) {
	return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
};

assert.equal(formatDateTime(d), '1995-12-25 13:30');