Connect, Web Server
2011-05-25 22:33

### Connect

node 에서 웹 어플리케이션을 돌리기 위해서는 DB 외에  3 가지 모듈이 필요합니다. Connect Web Server, Express MVC Framework, Jade Template Engine. 다행히 세 가지 기술 모두 단순해서 배우기 쉽고, 기능이 강력하고, 디자인이 매우 우아합니다. 한 사람이 핵심 개발자여서 그런지 연결도 매우 깔끔합니다. 이제 보시면 아시겠지만 군더더기도 하나 없습니다. 이 글에서는 Connect 부분에 대한 내용만 다루겠습니다.

npm 편에서 설명한 적절한 장소에 express 패키지를 먼저 설치해 주세요.
Connect 는 Express 와 함께 자동으로 설치됩니다.

	npm install express

### Code

	var express = require('express');
	
	var app = express.createServer();
	
	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'secret key' , cookie: { expires : null } }));
		app.use(express.bodyParser());
		app.use(express.static(__dirname + '/public'));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});
	
	app.listen(8080);
	console.log("Express server listening on port %d", app.address().port);

위 코드를 `app.js` 파일로 저장합니다.
`public` 서브 디렉토리를 만들어 `index.html` 파일을 하나 넣어주세요.
디렉토리 구성은 이렇게 됩니다.

	./app.js
	./public/index.html

그리고 `app.js` 를 실행하면 웹 서버가 동작합니다.

	node app.js


### Code 설명

	require('express');

먼저 Connect 를 설명한다고 하고 express 패키지를 사용하고 있습니다. reqruire('connect') 로 시작해도 되는데 express 패키지가 connect 의 모든 exports 를 다시 export 하기 때문에 express 패키지를 통해서도 Connect 의 모든 기능을 사용할 수 있습니다. 그리고 다음편에 볼 express 프로젝트 생성툴에서 생성 되는 코드가 connect 대신 위에 처럼 express 패키지를 사용합니다. 해서 제작자의 의도에 따라 Connect 설명을 express 패키지를 통해서 하도록 하겠습니다. (저라면 이렇게 안하고 connect 를 명시적으로 썼을 듯. =,=)

	var app = express.createServer();

Connect 는 Server 오브젝트를 만들고, 환경설정을하고, 런하는 단순한 절차로 기동합니다. 위에 수식은 서버를 만들고 있습니다. app 대신 server 라 부르고 싶지만, express 프로젝트 생성툴에서 app 이란 변수를 만드니 그에 따르겠습니다.

	app.configure(function() {
		app.use(express.cookieParser());
		app.use(express.session({ secret: 'secret key' , cookie: { expires : null } }));
		app.use(express.bodyParser());
		app.use(express.static(__dirname + '/public'));
	});

초기화된 Connect Server 는 아무 작업도 안 하는 맹통 서버입니다. 여기에 Connect 용어로 middleware 라고 불리는 펑션들을 app.use 로 하나하나 낑구어 주어야 합니다. 다른 웹 서버들에서는 filter 나 handler 로 지칭되는 것들입니다. Connect 에서는 filter 와 handler 타입의 구분이 없습니다. app.use 로 적용하는 middle 웨어들은 순서가 중요합니다. 가만 보시면 저 순서대로 하지 않을 경우 문제가 발생할 것이란 직감을 느끼실 겁니다. 기본적인 middleware 들은 Connect 에 기본으로 따라옵니다. 위 코드에서는 제가 필요한 middleware 들만 세팅해봤습니다.

app.configure 라는 펑션을 통하지 않고, 걍 app.use 만 줄줄줄 불러도 될 것 같아 보이는데 굳이 사용한 것은 app.configure 를 통해 추후 개발환경이나 라이브 환경에 따라 설정내용에 변화를 줄 수 있기 때문입니다. 이건 다음에 express 설명하면서 적겠습니다.

`express.cookieParser()`는 말 그대로 쿠키 헤더 파서. `req` 에 `req.cookie` 라는 오브젝트를 붙여줍니다. `express.cookieParser()` 가 단순히 `express.cookieParser` 가 아닌 것은 이 놈들이 스스로 핸들러가 아니고, 핸들러를 생성하는 펑션 펙토리이기 때문입니다. cookieParser 경우는 인자가 없지만, session 같은 경우 인자를 전달해 커스텀화된 세션 처리 펑션을 만듭니다.

`session` 미들웨어 생성자에서는 `cookie` 에 `expires : null` 을 줘서 브라우저를 닫으면 세션이 사라지게 했고요.

`express.bodyParser()` 미들웨어는 POST 리퀘스트시 HTTP Body 를 파싱해서 `req` 오브젝트에 `req.body` 오브젝트를 만들어 붙여주는 놈입니다.

마지막으로 `express.static()` 미들웨어는 원시적인 파일 서비스 기능을 합니다.

이것으로 기본적인 웹서버가 동작하는데 필요한 미들웨어 낑구기는 충분하고요. `app.listen(8080)` 으로 node 에 뭔가 할 일을 만들어 주면, `app.js` 파일 한판 실행이 끝난 후 node 가 무한 Event Loop 를 돌면서 웹 리퀘스트를 처리하기 시작합니다.

Java 환경에 익숙한 분들이라면 `$TOMCAT_BASE/conf/server.xml` 과 `WEBINF/web.xml` 파일로 하는 웹 컨테이너 + 웹 어플리케이션 세팅 작업을 JavaScript 로 간략히 기술했다고 보시면 되겠습니다.

### 쿠키

참고로, 현재 connect 에서 res.cookie 로 쿠키를 생성할 때 적용되는 기본 값이 없습니다. 그러니, 아래 처럼 꼼꼼하게 필드를 모두 넣어주셔야 합니다. 예제는 90 일짜리 쿠키.

	res.cookie('cook-name', 'cook-value', { path : '/', maxAge : 1000*60*60*24*90, httpOnly : true });
