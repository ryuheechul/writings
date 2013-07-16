# Hello World

2011-05-25 15:11

### 연재 방향

node 사이트 가셔서 걸려 있는 동영상 두 개 (중간에 하나, 페이지 끝에쯤 하나) 보시는 것이 node 이해에 많이 도움이 될 것 같습니다. 각각, 한 시간씩입니다. 이 글에서 Hello World 초간단 설명과 기본적인 Closure 방식 로직 패스 패턴만 설명 드리고 node Core 에 대해서는 연재물에서 제외할 생각입니다. 쓰기 지루할 것도 같고, node Core 위에 Connect 나 Express 쓰게 되면 직접 Core API 를 부를 일도 많이 적어집니다.

### hello world

	var http = require('http');
	var httpServer = http.createServer();
	var httpHandler = function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello World\n');
	}
	
	httpServer.on('request', httpHandler);
	httpServer.listen(8080);
	
	console.log('Server running at http://127.0.0.1:8080/');

위 내용을 `app.js` 파일에 저장하고 `node app.js` 해서 실행시키면 웹 서버가 동작합니다. `http://localhost:8080` 쳐서 들어가 보시면 `hello world` 가 출력되고요. node Core 는 HTTP 기초 처리 기능을 가지고 있기 때문에 추가 패키지 설치 없이 위 프로그램을 실행시키실 수 있습니다.

	var http = require('http');

'http' 패키지를 사용하겠다는 정의입니다. 'http' 는 코어 패키지인데, 이 외에도 npm 으로 추가한 머신 로컬 패키지, 사용자 로컬 패키지, 프로젝트 로컬 패키지를 사용할 수 있습니다. 코어 패키지 목록은 아래 git 페이지 가시면 모두 보실 수 있습니다. <https://github.com/joyent/node/tree/master/lib>

	var httpServer = http.createServer();

`createServer()` 는 `http.Server` 클래스의 펙토리 펑션입니다.

	var httpHandler = function (req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Hello World\n');
	}

웹 리퀘스트가 도착할 때마다 실행될 펑션입니다. 브라우저에서 마우스 클릭이 발생할 때 실행될 코드를 function 에 묶고 onclick 에 링크하듯이 node 에서도 이벤트가 발생할 때마다 실행될 코드를 function 으로 묶고 서버 request 이벤트에 링크하면 됩니다. 펑션은 가장 평범한 HTTP Header 를 출력하고, body 에 Hello World 를 적고 끝냅니다. 펑션 내용 스타일만 보면 Asynchronous 하지 않고 Synchronous 한 것 같은데 아래서 라이브러리가 먼가 잘 해주고 있겠지하고 덮고 넘어갑니다. =,=

	httpServer.on('request', httpHandler);

위 코드 전까지 httpServer 와 httpHandler 는 서로 아무 상관이 없었습니다. 위 코드로 httpServer 의 request 이벤트에 httpHandler 가 연결됩니다.

	httpServer.listen(8080);

서버도 준비 되었고, 리퀘스트 핸들러도 준비되었고, 연결도 했으니 포트 열고 기다리면 끝. =o=

	console.log('Server running at http://127.0.0.1:8080/');

머라도 마지막에 찍어줍니다. node 는 Non-Blocking 스타일이라고 말씀드렸지요. httpServer.listen 펑션콜에서 무한 루프 돌지 않습니다. listen 펑션에서 바로 돌아와서 console.log 명령 실행합니다.

	" "

더 실행할 코드가 없습니다. node 는 이렇게 파일 한판 읽어서 이벤트 세팅 다 해놓으면 Event Loop 에 자동으로 들어갑니다. 위에 실행한 코드들이 단순 배치작업들이라 Event Loop 에서 아무 것도 할 일이 없다면 프로세스 종료하겠지만 `httpServer.listen` 을 하라고 했으니 포트에 무한 대기합니다.그러다, 리퀘스트를 받을 때마다 `httpHandler` 를 무한 실행시킵니다.
