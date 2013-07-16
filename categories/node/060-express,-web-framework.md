# Express, Web Framework

2011-05-26 15:27

### Express

<http://expressjs.com>

Express 는 Connect 에 미들웨어를 낑궈서 HTTP Request 를 적당한 컨트롤러로 라우팅해주는 프레임웍입니다. 뷰엔진은 Express 에 포함되어 있지 않고 Jade 나 기타 뷰엔진을 쓰도록 되어 있습니다.

다음 명령으로 적당한 위치에 express 와 jade 를 설치해 놓습니다. Connect 는 Express 설치시 같이 설치되는데 Jade 는 별도로 설치해야합니다.

	npm install express
	npm install jade

npm 이 관리하는 `bin` 디렉토리를 보면 `express` 라는 실행 파일이 들어가있을 겁니다.
이 명령은 Express 프로젝트 뼈대를 만들어 줍니다.

	express demo-site

서버 띄우기는 아래와 같이.

	cd demo-site
	node app.js

### Code

아래 코드는 초기 app.js 에 제가 몇 가지 첨삭해 놓은 코드입니다.
기본은 이전 Connect 글에서 설명한 구조를 하고 있습니다.
서버 생성, 미들웨어 세팅, 리슨.

	var express = require('express');
	var app = module.exports = express.createServer();
	
	app.configure(function() {
		app.set('views', __dirname + '/views');
		app.set('view engine', 'jade');
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'cookie viky' , cookie: { expires: null } }));
		app.use(express.bodyParser());
		app.use(app.router);
		app.use(express.static(__dirname + '/public'));
	});
	
	app.configure('development', function() {
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});
	
	app.configure('production', function() {
		app.use(express.errorHandler());
	});
	
	app.get('/', function(req, res) {
		res.render('index', {title: 'RaPixel'});
	});
	
	app.get('/user/:id/:op?', function(req, res) {
		res.send("user: " + req.params.id + ", op: " + req.params.op + "\n");
	})
	
	if (!module.parent) {
		app.listen(3000);
		console.log("Express server listening on port %d", app.address().port);
	}


### Code 설명

	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');

뷰엔진 설정하는 부분입니다.
기본은 jade 엔진을 쓰도록 되어 있고, 기본 뷰 디렉토리 지정하는 코드도 보입니다.

	app.use(app.router);

Connect 설명할 때 구성했던 미들웨어 스택과 하나 다른 점은 `app.router` 가 중간에 낑긴다는 겁니다.
이 놈이 URL 을 적절한 컨트롤러에 매핑해줍니다.
매핑 설정은 아래에.

	app.configure('development', ...)
	app.configure('production', ...)

Connect 설명할 때는 `app.configure` 문장이 한번만 있었는데 여기는 3 가지입니다.
기본, development 환경용, production 환경용.
변경하지 않으면 기본적으로 Express 는 development 환경에서 동작한다고 가정합니다.
production 모드로 변경하기 위해서는 아래와 같이 환경 변수를 설정하고 실행합니다.

	node_ENV=production node app.js

production 모드로 지정되면 Express 내부의 케슁 키능들이 작동하기 시작하므로
실 서비스로 돌릴 때는 반드시 production 지정을 해야합니다.

	app.get('/', function(req, res) { ... } )
	app.get('/user/:id/:op?', function(req, res) { ... } )

라우팅 설정 방법입니다.
추가 설명이 필요 없을 정도로 간단합니다.
HTTP Request 의 URL 이 해당 패스 수식에 맞을 경우 지정된 컨트롤러 펑션이 실행됩니다.
URL 안의 특정 파트를 인자로 뽑고 싶을 경우 `:id`, `:op` 등의 수식을 적어줍니다.
`:op` 뒤에는 `?` 가 붙었는데 있어도 되고 없어도 된다는 뜻입니다.

	res.render('index', {title: 'RaPixel'});
 
외부 뷰를 부르는 예입니다. 여기서 `index` 가 뷰 이름이 됩니다.
Express 가 기본 생성한 프로젝트의 views 디렉토리를 보시면 `index.jade` 라는 파일이 있습니다.
뒤에 옵션으로 들어가는 오브젝트는 뷰의 인자로 사용됩니다.
여기서는 `title` 을 넘기고 있습니다.

	res.send("user: " + req.params.id + ", op: " + req.params.op + "\n");

이건 뷰를 쓰지 않고 컨트롤러에서 바로 텍스트를 출력하는 예입니다.
JSON 이나 바이너리 버퍼 출력도 `send` 명령으로 합니다.
`send` 는 딱 한번만 콜할 수 있습니다.

	app.listen(3000);

미들웨어와 라우터 세팅이 끝나면 웹 서버를 띄웁니다.
다른 개발 언어나 프레임웍으로 했으면 매우 복잡했을 작업이 아주 간단히 끝났습니다.

### Express 단편 정보들

라우팅 수식에 RegExp 를 쓸 수 있습니다.
	
	app.get(/^\/users?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res){ ...

URL 인자에 제한을 주려면, 예를들어 정수인 경우만 매칭,

	app.get("/user/:id([0-9]+)", function(req, res) { ...

당연히 POST 도 받을 수 있습니다.

	app.post('/', function(req, res){ ...

URL 이 여러 컨트롤러와 매칭 가능할 경우 다음 컨트롤러도 실행하게 할 수 있습니다.
컨트롤러에서 세번째 `next` 인자를 받아서 콜합니다.

	app.get('/users/:id?', function(req, res, next){
		// do something
		next();
	});

GET, POST 에 대해 공통으로 처리해야할 코드가 있다면 뽑아서 `all` 에 매핑하고
작업이 끝나면 `next` 를 콜합니다.

	app.all('/user/:id/:op?', function(req, res, next){
		req.user = users[req.params.id];
		if (req.user) {
			next();
		} else {
			next(new Error('cannot find user ' + req.params.id));
		}
	});

콜백 펑션은 하나가 아니라 여러개를 지정할 수 있습니다.
사용자 정보를 읽는 기능같이 여러 곳에서 사용되는 기능은 별도 펑션으로 분리해 뽑아낼 수 있습니다.

	function loadUser(req, res, next) {
		var user = users[req.params.id];
		if (user) {
			req.user = user;
			next();
		} else {
			next(new Error('Failed to load user ' + req.params.id));
		}
	}

	app.get('/user/:id', loadUser, function(req, res) {
		res.send('Viewing user ' + req.user.name);
	}); 

사용자 권한 제한은 `loadUser` 다음에 펑션을 하나 더 끼우면 될 겁니다.

	function checkRole(req, res, next) {
		( ... some mystic logic ... )
		? next()
		: next(new Error('Unauthorized'));
	}

	app.get('/user/:id/edit', loadUser, checkRole, function(req, res) {
		res.send('Editing user ' + req.user.name);
	});

라우팅 미들웨어는 어레이로 만들어 넘길 수도 있습니다.

	var checker = [ loadUser, checkRole ];
	app.get('/user/:id/edit', checker, function(req, res) { ...

POST 인자 파싱 결과는 req.body 에 들어갑니다.

	<form method="post" action="/">
		<input type="text" name="user[name]" />
		<input type="text" name="user[email]" />
		<input type="submit" value="Submit" />
	</form>

	app.post('/', function(req, res){
	   console.log(req.body.user);
	   console.log(req.body.user.name);
	   console.log(req.body.user.email);
	   res.redirect('back');
	});

여러 곳에서 공통으로 발견되는 인자 처리 코드는 `app.param` 으로 뽑아 낼 수 있습니다.

	app.param('userId', function(req, res, next, id) {
		User.get(id, function(err, user) {
			if (err) return next(err);
			if (!user) return next(new Error('failed to find user'));
			req.user = user;
			next();
		});
	});

	app.get('/user/:userId', function(req, res) {
		res.send('user ' + req.user.name);
	});

정수여야 하는 인자의 필터링은

	app.param('num', function(n){ return parseInt(n, 10); });
	app.param(['num1', 'num2', 'num3'], function(n){ return parseInt(n, 10); });

세션은 `req.session` 오브젝트를 쓰시면 됩니다.

`req.params`, `req.query`, `req.body` 를 한꺼번에 찾으시려면 `req.param(name[, default])` 펑션을 쓰시면 됩니다.

출력의 기본 인코딩은 UTF8 인데 변경하려면.

	res.charset = 'ISO-8859-1';
	res.render( ... );

Response 에 파일 보내기는.

	res.download('path/to/image.png');

Response 로 JSON 출력은 걍 `send`.

	res.send(new Buffer('wahoo'));
	res.send({ some: 'json' });
	res.send('<p>some html</p>');
	res.send('Sorry, cant find that', 404);
	res.send('text', { 'Content-Type': 'text/plain' }, 201);
	res.send(404);