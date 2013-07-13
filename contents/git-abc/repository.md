# Git Repo


### 새 리포지터리 생성

워킹 디렉토리로 이동해서 리포지터리를 생성한다. 
`.git` 라는 디렉토리가 생긴다.

	$ cd <project directory>
	$ git init
	

### 클론 리포지터리 생성

리모트 리포지터리를 클론하면 리모트를 등록하고 트래킹 브랜치를 만드는 작업을 한번에 할 수 있다.
리모트 리포지터리의 기본 이름은 `origin` 이 된다.

	$ git clone <remote url>
	$ git clone <remote url> <target directory>

아래와 동일인가? 확인은 못함.

	$ git remote add origin <remote url>
	$ git fetch origin
	$ git checkout -b master origin/master
