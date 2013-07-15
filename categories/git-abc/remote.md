# Git Remote

Git 는 여러 리모트 리포지터리를 가질 수 있다.
리모트 리포지터리는 로컬 머신의 다른 디렉토리일 수도 있고 물리적으로 다른 기계일 수도 있다.

리포지터리 주소는 긴 URL 로 정의되는데 이를 줄여쓰기 위해 `git remote` 명령으로 이름을 등록해 사용한다.
리모트 정보는 .git/config 파일에 저장된다.

	
### 리모트 관리

리모트를 추가한다.

	$ git remote add <remote> <remode url>
	$ git remote add origin https://.../some-project.git

등록된 리모트 목록을 출력한다.

	$ git remote
	$ git remote -v

리모트에 관한 정보를 표시한다.

	$ git remote show <remote>

리모트의 이름을 바꾼다

	$ git remote rename <current name> <new name>

리모트를 삭제한다.

	$ git remote rm <remote>

리모트에서 삭제된 브랜치에 대한 리모트 브랜치들을 삭제한다.

	$ git remote prune <remote>


### 리모트 브랜치

리모트 브랜치는 리모트 리포지터리에 있는 브랜치를 의미하는 것이 **아니다**.
리모트 리포지터리에 있는 브랜치들의 상태를 반영하기 위한 **로컬** 브랜치다.

리모트 리포지터리의 <branch> 에 대한 리모트 브랜치는 <remote>/<branch> 가 된다.
예로 리모트 `origin` 의 `dev` 브랜치에 대한 리모트 브랜치는 `origin/dev (refs/remotes/origin/dev)` 가 된다.


### 트래킹 브랜치

리모트 브랜치에서 `checkout` 하는 브랜치는 트래킹 브랜치가 된다.
트래킹 브랜치에는 `push/pull` 에 사용될 리모트 브랜치가 지정되어 있다.
이 연결 설정은 Git 설정 파일에 들어간다.

	$ git checkout -b master origin/master

위 명령은 아래 설정을 생성한다

	[branch “master”]
		remote = origin
		merge = refs/heads/master


### Fetch

리모트의 업데이트된 내용을 가져온다.
리모트 커밋들을 가져오기만 할 뿐 트래킹 브랜치에 머지하진 않는다.

	$ git fetch <remote>

등록된 모든 리모트의 업데이트 내용을 한번에 가져올 수 있다.

	$ git fetch --all

다음 명령도 비슷한 작업을 한다.

	$ git remote update


### Merge

`fetch` 명령은 리모트의 업데이트된 내용을 다운로드하고 `fetch` 한 레퍼런스들을 `FETCH_HEAD` 에 저장한다.
`FETCH_HEAD` 는 `merge` 에 이용할 수 있다. 리모트 브랜치들을 트래킹 브랜치들에 머지한다.

	$ git fetch
	$ git merge FETCH_HEAD

`git fetch` 와 `merge` 명령은 다음 한 줄로 할 수도 있다.

	$ git pull

`merge` 중 충돌이 나면 수작업후 커밋을 하거나 `merge` 전, `fetch` 직후 상태로 갈 수도 있다.

	$ git reset --hard ORIG_HEAD


### Push

로컬 리포지터리의 새로운 커밋들과 브랜치 변경을 리모트에 `push` 할 수 있다.
리모트에 변화가 있었다면 먼저 `fetch` 한 후 로컬 리포지터리에서 변경 내용들을 `merge` 한 후에 `push` 해야한다.

리모트에 <branch> 브랜치가 없었다면 새로 생성된다.
기존 브랜치에 `push` 한 내용은 fast-forward 머지된다.

	$ git push <remote> <branch>
	$ git push <remote> <local branch>:<remote branch>

리모트 리포지터리의 브랜치를 삭제할 수 있다.

	$ git push <remote> :<remote branch>

