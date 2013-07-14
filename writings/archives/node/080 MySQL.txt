Node + MySQL
2011-05-28 19:03

### DBSlayer

대부분의 DB 라이브러리가 그렇겠지만 MySQL 공식 C 라이브러리도 Async 하게 만들어지지 않았습니다.
그래서, Async 한 node 와 Sync 한 MySQL 공식 C 라이브러리 간을 완충해 주는 장치가 필요합니다.

이런 Sync/Async 완충장치들은 자체 Thread Pool 을 내장하고 있어야 하는데
node 전용은 아니지만 뉴욕타임즈에서 특정 목적으로 자체적으로 사용하려고 만든 DBSlayer 라는 것이 있더군요.
DBSlayer 는 독립 프로세서로 도는 서버이고, MySQL 로 접근하는 ThreadPool 을 내장하고 있고,
DBSlayer 클라이언트들과는 JSON 으로 통신합니다.
몇몇 재빠른 사람들은 이놈을 쓰면 큰 노력을 들이지 않고 node 에서 MySQL 로의 연결을 구현할 수 있다는 것을 발견하고 
DBSlayer 라이브러리를 node 용으로 구현했습니다.
근데, 기분이 나쁩니다.
DBSlayer 를 통하면 일단 MySQL 을 쓸 수는 있겠지만 중간에 먼가 낑긴다는 것이 기분이 나쁩니다.

### mysql.js

더 찾아 봤더니 node core 만 가지고 아예 MySQL 드라이버 기능을 JavaScript 로 구현한 것이 있더군요.
아래 명령으로 설치합니다.

	npm install mysql

아래 명령으로 잘 설치되었는지 확인할 수 있습니다.

	npm ls
	
### Code

	var mysql = require('mysql');
	
	var client = new mysql.Client();
	
	client.host = "localhost";
	client.user = "root";
	client.database = "sleek";
	
	client.connect();
	
	client.query(
		'select * from postthread where id between ? and ?', [50, 60], function (err, results, fields) {
			if (err) throw err;
			console.log(results);
			//console.log(fields);
			client.end();
		}
	);

결과. UTF8 로 인코딩된 디비였는데 한글도 잘 나옵니다.

	[ { id: 50,
		postcategoryid: 100,
		hit: 55,
		length: 3,
		cdate: Mon, 18 Sep 2000 13:17:00 GMT,
		udate: Tue, 19 Sep 2000 08:59:00 GMT,
		username: '.....',
		title: '.....' },
	  { id: 51,
		postcategoryid: 110,
		hit: 32,
		length: 3,
		cdate: Mon, 18 Sep 2000 13:23:00 GMT,
		udate: Tue, 19 Sep 2000 15:58:00 GMT,
		username: '.....',
		title: '.....' },
		....
	]

### auto_increment id 받기

	client.query(
		'insert into t1(title) values ("hello")', function (err, info) {
			console.log(info.insertId);
		}
	);

참고로 info 오브젝트의 풀 덤프는 아래와 같았습니다.

	{ affectedRows: 1,
	  insertId: 6,
	  serverStatus: 2,
	  warningCount: 0,
	  message: '',
	  setMaxListeners: [Function],
	  emit: [Function],
	  addListener: [Function],
	  on: [Function],
	  once: [Function],
	  removeListener: [Function],
	  removeAllListeners: [Function],
	  listeners: [Function] }

### 컨넥션 운영법에 대해서

만든 사람은 라이브서비스에서 컨넥션을 1 개만 사용한다고 합니다.
컨넥션은 1 개를 사용하고 query 오브젝트들이 여기에 큐로 쌓여서 차례차례 실행되는 듯.
첫 예에서는 쿼리 끝에 client.end() 를 불렀는데,
어플리케이션 서버 구성에서는 서버 닫을 때만 불러주면 될 듯 합니다.

트랜젝션을 상상하니 머리가 복잡해 집니다.
저는, 트랜젝션 기능이 없는 MyISAM 을 쓰던지, Auto Commit 을 하던지, 아예 DocumentDB 로 도망가렵니다. ^^