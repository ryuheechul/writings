# Repository

Git 를 사용하려면 제일 먼저 리포지터리를 생성해야 한다.

### 로컬에 리포지터리 생성

워킹 디렉토리에 새 리포지터리를 생성한다.
혼자 VCS 기능을 사용하는데 적합하다.

	$ cd test-project
	$ git init

리포지터리 디렉토리가 생긴 것을 확인할 수 있다.
	
	$ ls -d .git
	.git


### GitHub 에 리포지터리 생성

https://github.com 나 https://bitbucket.org 에 리포지터리를 생성하고 내 코드를 공개할 수 있다.

리모트 리포지터리를 사용하려면 리모트와 로컬 리포지터리를 모두 생성한 후 서로를 연결해야하는데
리모트 리포지터리를 먼저 생성하고 내 컴퓨터에 클론을 만드는 방식이 조금 쉽다.

위 사이트의 안내에 따라 일단 리모트 리포지터리를 생성한다.
생성된 리포지터리 페이지에 가면 `https://github.com/drypot/test-project.git` 처럼 생긴 리포지터리 주소를 발견할 수 있다.

test-project 라는 리모트 리포지터리를 생성했다면 아래 명령으로 로컬에 클론을 생성할 수 있다. 

	$ git clone https://github.com/drypot/test-project.git
	$ cd test-project

새로 만든 리모트 리포지터리에 무엇인가 당장 보내 보고 싶다면 일단 아무 파일이나 만들어서

	$ touch readme.md

만든 파일을 인덱스에 등록하고

	$ git add readme.md

커밋한 다음

	$ git commit -m "first commit"

리모트에 푸쉬한다.

	$ git push

리모트 리포지터리에 가보면 `readme.md` 가 등록되어 있을 것이다.


### 기존 로컬 리포지터리를 GitHub 에 연결

이미 존재하는 로컬 리포지터리를 리모트 리포지터리에 연결할 수 있다.

로컬에 리포지터리가 생성되어있다고 가정하고

	$ cd test-project
	$ git init

사이트의 안내에 따라 `test-project` 라는 이름의 리모트 리포지터리를 생성했다면
아래처럼 로컬에 리모트를 등록할 수 있다.
`origin` 은 관행처럼 사용되는 리모트 이름이다.

	$ git remote add origin https://github.com/drypot/test-project.git


이제 로컬 리포지터리 내용을 리모트에 푸쉬할 수 있는데
처음 한번은 `-u` 옵션으로 전송할 브랜치를 설정해야 한다.
master 는 브랜치명인데 리포지터리 생성시 기본으로 만들어지므로 당장 전송할 수 있다.

	$ git push -u origin master

 다음 부터는 옵션 없이 푸쉬할 수 있다.

	$ git push 

