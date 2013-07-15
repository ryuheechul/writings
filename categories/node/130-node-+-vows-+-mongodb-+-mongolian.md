Node + Vows + MongoDB + Mongolian
2011-07-27 18:48

### Vows

Node 는 V8 엔진과 async 라이브러리를 결합해 놓은 서버 사이트 자바스크립트 실행환경입니다.
Vows 는 node 용 BDD 프레임웍입니다.
async 지원이 아주 훌륭하고 사용법도 간단합니다.
MongoDB 는 요즘 관심을 받고 있는 도큐먼트 디비입니다.
Mongolian 은 Node 용 MongoDB 드라이버입니다.
이것들을 결합해 Vows 유닛 테스트 셈플을 만들어 보았습니다.

코드 실행법은 쉘에서.

	vows user-test.js

### Code

	var vows = require('vows');
	var assert = require('assert');
	var bcrypt = require('bcrypt');
	
	var dao = require('../main/dao.js');
	
	vows.describe('user collection test').addBatch({
		'with initialized dao,': {
			topic: function () {
				dao.prepareTestDb();
				dao.db.dropDatabase();
				dao.ensureIndex();
				return dao;
			}
			,'initialized': function (dao) {
				assert.isObject(dao.server);
				assert.isObject(dao.db);
			}
			,'db name is right': function(dao) {
				assert.equal(dao.db.name, 'rapixel-test');
			}
			,'user collection,': {
				topic: function (dao) {
					return dao.userColl;
				}
				,'is object': function (userColl) {
					assert.isObject(userColl);
				}
				,'3 inserted users,': {
					topic: function (userColl) {
						var salt = bcrypt.gen_salt_sync(10);
						userColl.insert({
							loginDt: new Date(),
							photoDt: new Date(0), // photoUploadDate
							photoCnt: 0,
							fingCnt: 0, // followingCnt
							ferCnt: 0, // followerCnt
							disAb: true, // dislikable
							uploadAb: true, // uploadable
							termed: false, // terminated
							diskMax: 74 * 1000, // kb
							diskUsed: 0,
							realName: 'kyuhyun park',
							userName: 'drypot',
							email: 'drypot@gmail.com',
							pw: bcrypt.encrypt_sync('himan', salt), // password
							tel: '',
							web: '',
							bio: ''
							// admin: false
						});
						userColl.insert({
							userName: 'snowman',
							email: 'somewhere@hotmail.com'
						});
						userColl.insert({
							userName: 'guest',
							email: 'somewhere@facebook.com'
						});
						return userColl;
					}
					,'length': {
						topic: function (userColl) {
							userColl.find().toArray(this.callback);
						},
						'is 3': function (users) {
							assert.isArray(users);
							assert.length(users, 3);
						}
					}
					,'finding drypot' : {
						topic: function (userColl) {
							userColl.findOne({ userName: 'drypot'}, this.callback);
						}
						,'success': function (user) {
							assert.equal(user.userName, 'drypot');
						}
						,'password match': function (user) {
							assert.isTrue(bcrypt.compare_sync('himan', user.pw));
						}
					}
					,'inserting drypot again': {
						topic: function (userColl) {
							userColl.insert({
								userName: 'drypot',
								email: 'another@world'
							}, this.callback);
						}
						,'must fail': function(err, result) {
							assert.isNotNull(err);
						}
					}
					,'inserting drypot@gmail.com again': {
						topic: function (userColl) {
							userColl.insert({
								userName: 'anotherman',
								email: 'drypot@gmail.com'
							}, this.callback);
						}
						,'must fail': function(err, result) {
							assert.isNotNull(err);
						}
					}
					,'inserting kyuhyun park again': {
						topic: function (userColl) {
							userColl.insert({
								userName: 'anotherman',
								realName: 'kyuhyun park',
								email: 'another@gmail.com'
							});
							userColl.find({ realName: 'kyuhyun park' }).toArray(this.callback);
						}
						,'lenth must be 2': function(users) {
							assert.length(users, 2);
						}
						,'removing second kyuhyun park': {
							topic: function (users, userColl) {
								userColl.remove({ email: 'another@gmail.com' });
								userColl.find({ realName: 'kyuhyun park' }).toArray(this.callback);
							}
							,'lenth must be 1': function(users) {
								assert.length(users, 1);
							}
						}
					}
					,'$inc photoCnt': {
						topic: function (userColl) {
							userColl.update({ userName: 'drypot'}, { $inc: { photoCnt: 1 } });
							userColl.findOne({ userName: 'drypot'}, this.callback);
						},
						'must be 1': function (user) {
							assert.equal(user.photoCnt, 1);
						}
					}
					,'$set loginDt': {
						topic: function (userColl) {
							userColl.update({ userName: 'drypot'}, { $set: { loginDt: new Date(2011, 0, 1) } });
							userColl.findOne({ userName: 'drypot'}, this.callback);
						}
						,'must equal': function (user) {
							assert.deepEqual(user.loginDt, new Date(2011, 0, 1));
						}
					}
				}
			}
		}
	}).export(module);

위 테스트 코드에서 호출하는 dao.js.

	var ex = module.exports;
	
	ex.mongolian = require('mongolian');
	
	var setDb = function (serverName, dbName) {
		ex.server = new ex.mongolian(serverName);
		ex.db = ex.server.db(dbName);
		ex.userColl = ex.db.collection('user');
		//counterColl = exports.userColl = db.collection('counter');
	}
	
	ex.prepareDevDb = function () {
		setDb('localhost:27017', 'rapixel');
	}
	
	ex.prepareTestDb = function () {
		setDb('localhost:27017', 'rapixel-test');
	}
	
	ex.prepareLiveDb = function () {
		setDb('localhost:27017', 'rapixel');
	}
	
	ex.ensureIndex = function () {
		ex.userColl.ensureIndex({ realName: 1 });
		ex.userColl.ensureIndex({ userName: 1 }, { unique: true });
		ex.userColl.ensureIndex({ email: 1 }, { unique: true });
	}
	
	