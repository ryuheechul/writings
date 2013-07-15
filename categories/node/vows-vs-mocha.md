Vows vs. Mocha

같은 기능을 하는 간단한 테스트 케이스를 Vows 와 Mocha 버전으로 만들어 보았다.

### Vows

	var vows = require('vows');
	var assert = require('assert')
	
	var model = require('../js/model.js');
	
	vows.describe('model').addBatch({
		'db': {
			topic: function () {
				model.init('sleek-test', this.callback);
			}
			,'initialized': function () {
				assert.isObject(model.db);
			}
			,'name': function () {
				assert.equal(model.db.name, 'sleek-test');
			}
		}
	}).addBatch({
		'thread collection': {
			topic: function () {
				return model.threadCol;
			}
			,'is object': function (col) {
				assert.isObject(col);
			}
			,'indexList': {
				topic : function (col) {
					col.indexes(this.callback);
				}
				,'index count' : function (indexList) {
					assert.isArray(indexList);
					assert.lengthOf(indexList, 3);
				}
			}
		}
	}).export(module);

### Mocha

	require('should');

	var model = require('../js/model.js');

	describe('model', function() {

		describe('db', function () {
			before(function (done) {
				model.init('sleek-test', done);
			});

			it('should be ok', function () {
				model.db.should.be.ok;
			});

			it('should have name', function () {
				model.db.name.should.equal('sleek-test');
			});
		});

		describe('thread collection', function() {
			var col;

			before(function () {
				col = model.threadCol;
			});

			it('should be ok', function () {
				col.should.be.ok;
			});

			describe('indexList', function () {
				var indexList;

				before(function (done) {
					col.indexes(function (err, value) {
						indexList = value;
						done(err);
					})
				})

				it('should be array', function () {
					indexList.should.be.an.instanceof(Array);
					indexList.should.be.length(3);
				});
			});
		});

	});
