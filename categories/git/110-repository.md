# Repository

워킹 디렉토리는 현재 수정중인 파일들의 디렉토리다.

리포지터리는 워킹 디렉토리의 커밋들이 쌓이는 디렉토리다.
워킹 디렉토리 루트에 만들어지는 '.git' 가 리포지터리다.

Git 는 분산 VCS 이므로 리포지터리 클론이 가능하다.
Git 설정 파일은 각 로컬에 독립적이어서 클론되지 않는다.


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

아래와 대충 비슷.

	$ mkdir <target directory>
	$ cd <target directory>
	$ git init
	$ git remote add origin <remote url>
	$ git fetch origin
	$ git checkout -b master origin/master
