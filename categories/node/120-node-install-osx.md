Node 권장 설치 방법, OSX
2011-06-11 22:55

전엔 누군가 node + npm 합본으로 만들어 둔 바이너리 pkg 파일로 설치를 했었는데, 퍼미션 문제들이 발생합니다.
맥에서는 brew 로 설치하는 것을 추천합니다.
brew 가 없으시다면 homebrew 패키지 관리자를 먼저 설치하시고요.
gcc 세트가 필요하니 Xcode 도 깔아 두세요.

아래 명령으로 설치합니다.
에어에선 컴파일이 5 분쯤 걸리는군요.

	brew install node

설치 끝나고 메시지 나오는데 전역 라이브러리 위치를 .profile 이나 .bashrc 등 원하시는데 적어둡니다.

	export node_PATH="/usr/local/lib/node" 

npm 은 정석으로 설치합니다.
brew로 node 를 설치했다면 sudo 도 필요 없습니다.

	curl http://npmjs.org/install.sh | sh
	
