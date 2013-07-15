Node 권장 설치 방법, Ubuntu
2011-06-11 22:49

2011.06.11 기준입니다.

우분투 서버 버전에는 아래 것들이 기본으로 안 깔려 있으므로 설치합니다.

	sudo apt-get install git-core
	sudo apt-get install g++
	sudo apt-get install libssl-dev
	sudo apt-get install curl

이제 노드를 받아서 컴파일하는데, Github 에서 받으면 개발중인 버전이 받아집니다.
공식 위키에 설명 있는데 참고 '만' 하시고요.
<https://github.com/joyent/node/wiki/Installation>

스터블한 버전을 받아서 컴파일 하려면 일단 <http://nodejs.org> 첫 페이지 Download 란에 있는 tar.gz 파일 링크를 따서 받습니다.
현재는 0.4.8 이군요. 추후 바뀌면 적절히 고쳐서 아래 명령들을 실행시킵니다.

다운로드

	wget http://nodejs.org/dist/node-v0.4.8.tar.gz
	
압축풀기

	tar xvf node-v0.4.8.tar.gz
	
컴파일 환경설정.  
저는 make install 시 /data1/node 아래 설치할 것인데 원하시는 대로 수정합니다.

	cd node-v0.4.8
	./configure --prefix=/data1/node
                                                        
make.  
not found 몇 개 뜨는데 무시.

	make
	make install

`.profile` 이나 `.bashrc` 파일 수정하셔서 node 바이너리 꼽힌 PATH 추가해 주시고요.

	PATH="/data1/node/bin:$PATH"

node 실행되는지 확인

	node --version

node 뜨는거 확인 하셨으면 npm 설치.  
아래 스크립스를 실행하면 npm 은 node 가 설치된 bin 디렉토리에 들어갑니다.

	curl http://npmjs.org/install.sh | sh

npm 실행되는지 확인

	npm ls
	
	