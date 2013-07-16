# npm, Package Manager

2011-05-25 20:58

### npm

<http://npmjs.org>

node 의 패키지 메니저는 npm 입니다.
node 소스코드를 받아 컴파일 하셨다면 npm 이 들어있지 않으니, npm 사이트의 설명에 따라 설치를 하셔야 합니다.
node 와 npm 설치법은 다른 글에 정리하겠스비낟.

npm 이 설치되었다면 아래과 같이 패키지를 설치할 수 있습니다. 예에서는 express 패키지를 설치.

	npm install expess

사용법은 간단한데, 위에 처럼 패키지 이름을 적어주면 
어디에 있든 현재 디렉토리에 'node_modules' 서브 디렉토리를 만들고 그 아래 패키지를 설치해 줍니다.
디펜던트한 패키지들도 같이 설치됩니다.
단, 설치 요청한 패키지 하위 디렉토리에.

이게 무슨 말이냐면, express 설치를 요청했다고 가정했을 때,
`./node_modules/express` 디렉토리에 express 가 설치되고,
`./node_modules/express/node_modules` 디렉토리에 express 가 사용하는 패키지들이 설치됩니다.
이는 패키지들이 서로 다른 버전의 같은 패키지에 대해 디펜던시를 가지고 있을 경우의 문제를 해결하기 위함입니다.

기본적으로 `npm install` 을 옵션 없이 사용하면 현재 디렉토리에 패키지가 설치되기 때문에
프로젝트 로컬하거나 사용자 로컬하게 이용됩니다.
머신에 대해 글로벌한 위치에 설치하려면 -g 옵션을 붙여주셔야 합니다.


### npm 패키지 글로벌 설치의 장점

npm 으로 패키지를 무옵션 설치하면 현재 디렉토리에 node_modules 서브 디렉토리를 만들고 패키지를 설치합니다.
패키지에 따라 bin 디렉토리가 있고 쉘 코멘드가 추가로 따라오는 것들이 있는데
이 코멘드를 사용하려면 수작업으로 PATH 에 연결하던지 shell alias 를 만들던지 해야합니다.

그런데, 패키지를 글로벌 옵션으로 설치하면 쉘 코멘드의 링크를 적절한 곳에 만들어 줍니다.
맥의 경우 node 를 brew 로 설치했을 때 패키지는 `/usr/local/lib/node_modules` 에 들어가고,
쉘 코멘드들은 `/usr/local/bin` 에 링크가 심어집니다.
 
	npm install -g express

express 도 글로벌 옵션으로 설치하면 `express` 코멘드가 `/usr/local/bin` 에 박히고요.
expresso 나 supervisor 같은 경우도 비슷.

맥은 brew 를 설치하면 /usr/local/bin 에 sudo 없이 파일 쓰기가 가능해져서 쉽게쉽게 되었는데
우분투의 경우는 어떻게 될지 모르겠군요.

글로벌 라이브러리를 불러쓰기 위해서는 환경변수 설정해주셔야 합니다.

	export node_PATH="/usr/local/lib/node:/usr/local/lib/node_modules"


### 패키지 임포트

node 프로그램 파일에서 설치된 패키지를 사용하려면 require 펑션을 사용합니다.
아래는 express 패키지를 임포트하는 예입니다.

	var express = require("express");

require 에는 다양한 스타일의 스트링을 던질 수 있습니다.

	require("http")

node Core 에 등록되어 있는 패키지는 동일명 외부 패키지 존재 여부와 상관 없이 최우선 순위로 임포트됩니다.
node Core 의 패키지들은 다음 git 리포지터리에서 확인하실 수 있습니다.
<https://github.com/joyent/node/tree/master/lib>

	require('./circle')
	require('/home/marco/foo')

인자가 `/` 나 `./` 로 시작될 경우에는 패스로 인식하고 패스 경로의 '파일'을 찾습니다.
맨 처음 `./circle` 을 찾고 발견 안 될 경우 `./circle.js`, `./circle.node` 를 찾습니다.
js 확장자 파일은 자바스크립트이고, node 확장자 파일은 바이너리 애드온입니다.

`/` 나 `./` 로 시작되는 패스가 디렉토리를 지정할 수도 있는데
이때 디렉토리는 node 의 정규 패키지 구조를 하고 있어야 합니다.
패키지 구성에 설명은 패스하겠습니다. ^^;
왠만한 개인 프로젝트라면 몇 개의 js 파일을 관리하는 수준으로도 충분할 것 같습니다.


### 패키지 서칭 알고리즘

npm 의 node_modules 훑는 방식은 좀 독특합니다.

인자가 node Core 를 지칭하지도 않고 패스도 아니라면 `node_modules` 폴더를 훑습니다.
먼저 호출하는 파일이 있는 디렉토리의 하위 `node_modules` 를 찾고, 
발견 안 되면 상위 디렉토리로 이동하면서 `node_modules` 를 계속 찾습니다.

동물책에 있는 예를 그대로 가져오면.
`/home/ry/projects/foo.js` 파일에서 `require('bar.js')` 했을 경우 아래 디렉토리를 훑습니다.

	/home/ry/projects/node_modules/bar.js
	/home/ry/node_modules/bar.js
	/home/node_modules/bar.js
	/node_modules/bar.js

그런데, 이 규칙에 예외가 두가지 있습니다.
검색 패스가 `node_modules` 로 끝나면 거기 바로 `node_modules` 을 다시 붙이지는 않습니다.
`require` 를 호출하는 모듈의 패스에 이미 어떤 `node_modules` 디렉토리가 있다면
최상위 `node_modules` 이상으로 훑어 올라가지 않습니다.

말이 복잡하지만 예는 아래와 같습니다.
`/home/ry/projects/foo/node_modules/bar/node_modules/baz/quux.js` 모듈이 `require('asdf.js')` 를 콜할 경우 검색경로.

	/home/ry/projects/foo/node_modules/bar/node_modules/baz/node_modules/asdf.js
	/home/ry/projects/foo/node_modules/bar/node_modules/asdf.js <-- node_modules/node_modules 를 만들지 않음.
	/home/ry/projects/foo/node_modules/asdf.js <-- 최상위 node_modules 에서 검색을 끝냄.

이정도면 다른 스크립트 시스템에 비해 꽤 훌륭하지요?
