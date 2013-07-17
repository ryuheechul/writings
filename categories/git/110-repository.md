# Repository


### 새 로컬 리포지터리 생성

워킹 디렉토리에 새 리포지터리를 생성할 수 있다. 

	$ cd test-project
	$ git init

`.git` 라는 디렉토리가 생겼다.
	
	$ ls -d .git
	.git


### GitHub 리포지터리를 클론

https://github.com 나 https://bitbucket.org 등의 서비스에 리포지터리를 생성하고 여기에 내 코드를 공개할 수 있다.

리모트 리포지터리를 사용하려면 로컬 리포지터리와 연결해야하는데
리모트 리포지터리를 먼저 생성하고 내 컴퓨터에 클론하는 방식이 살짝 더 쉽다.

각 사이트의 안내에 따라 리모트 리포지터리를 생성한다.

test-project 라는 리모트 리포지터리를 생성했다면 아래 명령으로 로컬에 클론을 생성할 수 있다. 

	$ git clone https://github.com/drypot/test-project.git

무엇인가 당장 푸쉬해 보고 싶다면 일단 아무 파일이나 만들어서

	$ cd test-project
	$ touch readme.md

만든 파일을 인덱스에 등록하고

	$ git add readme.md

커밋한 다음

	$ git commit -m "first commit"

리모트에 푸쉬한다.

	$ git push

리모트 리포지터리에 가보면 방금 만든 파일이 등록되어 있다.


### 기존 로컬 리포지터리를 GitHub 에 연결

이미 로컬 리포지터리가 존재하는 경우에도 리모트 리포지터리에 푸쉬할 수 있다.

위와 동일한 방법으로 각 사이트의 안내에 따라 리모트 리포지터리를 생성한다.

이번엔 리모트를 클론하는 대신 로컬에 리모트 이름과 주소를 등록한다.
프로젝트 이름이 test-project 라 가정하면,

	$ cd test-project
	$ git remote add origin https://github.com/drypot/test-project.git

리포트 리포지터리를 origin 이란 이름으로 등록하였다. 모든 리모트 리포지터리는 이름을 가져야한다.

이제 로컬 리포지터리 내용을 리모트에 푸쉬할 수 있다. master 는 푸쉬할 브랜치명이다.

	$ git push -u origin master

 `-u` 옵션으로 트래킹 설정이 한번 되면 다음 부터는 아래와 같이 옵션 없이 푸쉬할 수 있다.

	$ git push 

