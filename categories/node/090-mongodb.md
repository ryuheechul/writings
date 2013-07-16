# Node + MongoDB

2011-05-31 12:45

10gen 에서는 (오늘 기준) 아직 node 용 공식 MongoDB Driver 를 제공하지 않고 있습니다.
그래서, 개인들이 제작한 로우 레벨 API 가 몇 가지, 쓰기 편하게 한겹 씌운 API 가 몇 가지 소개되고 있습니다.

### node-mongodb-native

일단 로우 레벨 API 중에는 node-mongodb-native 가 제일 많이 쓰이고 있고,
아래 설명할 node-mongolian 에서도 불러쓰니 설치를 하셔야 합니다.
<https://github.com/christkv/node-mongodb-native>

설치는 `npm install mongodb` 하시던지,
`git` 로 `node_modules` 서브 리렉토리에 직접 받으신 다음 `make` 하셔도 됩니다.
`make` 가 필요한 이유는 BSON C 파서가 따라오기 때문에.

문제는 펑션 체이닝이 많아져서 node-mongodb-native 를 직접 쓰기는 매우 불편합니다.
그러니, 있다는 것만 확인하시고, 상위 레벨 패키지를 쓰시는 것이 유리합니다.

node-mongodb-native 의 속도는 현재 꽤 좋지 않습니다.
PHP 용 mongo 드라이버에 비해서도 몇 배 느리다는 벤치 결과.
당장은 별다른 수가 없으니 걍 씁니다. =,=

node-mongodb-native 는 디비 별로 컨섹션 한 개만 유지하는 정책으로 프로그래밍 해야 합니다.
프로세스 시작시 디비 연결하고, 연결 닫을 필요도 없어 보입니다.

### Code

아래는 node-mongodb-native 써서 만들어 본 간단 스크립트.

	var mongo = require("mongodb")
	var mongoServer = new mongo.Server("localhost", mongo.Connection.DEFAULT_PORT, {})
	var mongoDBConn = new mongo.Db('test', mongoServer, {})
	var db = null
	
	function drop1() {
		db.collection("t1", function(err, coll) {
			coll.drop()
		})
	}
	
	function insert1() {
		db.collection("t1", function(err, coll) {
			coll.insert({name : "snowman1", address : "123"})
			coll.insert({name : "snowman2", address : "456"})
			coll.insert({name : "snowman3", address : "789"})
		})
	}
	
	function dump1() {
		db.collection("t1", function(err, coll) {
			coll.find(function(err, cursor) {
				cursor.each(function(err, item) {
					if (item) {
						console.log(item)
					} else {
						console.log("loop end")
					}
				})
			})
		})
	}
	
	mongoDBConn.open(function(err, db_) {
		db = db_
		drop1()
		insert1()
		dump1()
	})
	
	console.log("start")

결과

	start
	{ name: 'snowman1', address: '123', _id: 4de46249035a8b9f2e000001 }
	{ name: 'snowman2', address: '456', _id: 4de46249035a8b9f2e000002 }
	{ name: 'snowman3', address: '789', _id: 4de46249035a8b9f2e000003 }
	loop end

### node-mongolian

위에 적은 node-mongodb-native 는 직접 쓰기 불편합니다.
현재 대안이 몇 가지 있는데 node-mongoskin 과 node-mongolian 이 좋아보입니다.
제 눈에는 그중 node-mongolian 이 더 좋아보이는데
펑셔널 언어에서 클로저 콜 쌓았다가 나중에 한방으로 실행하는 식으로 만들어져 있고, (Lazy Execution) 
이것을 일반 펑션으로 잘 포장해 놔서 사용자가 직접 클로져 체이닝을 만드는 일이 많이 줄어들기 때문입니다.
또, 목표가 mongo shell 과 API 를 거의 같게 만드는 것이라 사용 편의성이 여러 모로 좋을 것 같습니다.
<https://github.com/marcello3d/node-mongolian>

설치는 `npm install mongolian` 하셔도 되고,
업데이트가 빨라서 npm 에 적용되는 시차가 생기니 전 github 에서 직접 받았습니다.
github 에서 받으실 때는 `taxman`, `waiter` 패키지를 수작업으로 추가해 주셔야 합니다.

### Code

	var mongolian = require("mongolian")
	var mongoServer = new mongolian("localhost:27017")
	var db = mongoServer.db("test")
	var col = db.collection("t1")
	
	col.drop()
	
	col.insert({name : "snowman1", addr : "123"})
	col.insert({name : "snowman2", addr : "456"})
	col.insert({name : "snowman3", addr : "789"})
	
	col.find().forEach(
		function (doc) {
			console.log(doc)
		},
		function () {
			console.log("loop end")
		}
	)
	
	console.log("start")


결과

	start
	mongo://localhost:27017: Connected
	mongo://localhost:27017: Initialized as primary
	mongo://localhost:27017: Connected to primary
	Finished scanning... primary? mongo://localhost:27017
	{ name: 'snowman1', addr: '123', _id: 4de467784192fe592f000001 }
	{ name: 'snowman2', addr: '456', _id: 4de467784192fe592f000002 }
	{ name: 'snowman3', addr: '789', _id: 4de467784192fe592f000003 }
	loop end

### API

추가 API 설명은  github 에서 보셔야 할 것 같네요.
그리고 말씀드렸다시피 API 가 mongo shell 하고 비슷하니 일반 몽고 책을 보시면 직접 도움이 됩니다.
근데, 팩토리 펑션을 한단계 더 안 만들어 놓고, 패키지에 클래스를 바로 연결시켜놔서, =,=.
서버 오브젝트 생성하는 구문이 살짝 어글리함.
왜 저랬을까. =,=.
