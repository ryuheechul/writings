# Git Branch


### 브랜치 확인

로컬 브랜치 목록을 보여준다.

	$ git branch

로컬 브랜치와 리모트 브랜치를 모두 보여준다.

	$ git branch -a

로컬 브랜치들의 히스토리를 보여준다.

	$ git show-branch --more=10

로컬 브랜치와 리모트 브랜치의 히스토리를 보여준다.

	$ git show-branch -a


### 브랜치 생성, 삭제

소스 브랜치의 최신 커밋을 가리키는 새 브랜치를 생성한다. 
현재 브랜치를 바꾸지는 않는다.
새 커밋 오브젝트를 만들지도 않는다. 

	$ git branch <target branch>
	$ git branch <target branch> <source branch>

브랜치 삭제.

	$ git branch -d <branch>

브랜치 삭제는 커밋까지 삭제하지는 않는다.
접근할 수 없게된 커밋들은 GC 할 때 삭제된다.

	$ git gc


### 현재 브랜치 변경

현재 브랜치를 변경한다.
커밋되지 않은 파일이 있으면 에러가 난다.

	$ git checkout <branch>

현재 브랜치 변경한다.
커밋되지 않은 파일은 새 브랜치에 병합되어 워킹 디렉토리에 남는다. 
병합에 대한 커밋은 생성되지 않는다.

	$ git checkout -m <branch>

현재 브랜치 변경한다.
데이터 손실 경고를 무시한다.

	$ git checkout -f <branch>

새 브랜치를 생성하고 현재 브랜치도 바꾼다.

	$ git branch <branch>
	$ git checkout <branch>

위 명령은 아래 한 명령으로 할 수도 있다.

	$ git checkout -b <branch>


###  머지

나눴으면 머지(병합)하는 방법도 있어야하지 않겠나.

other_branch 를 branch 에 머지하려면 branch 를 먼저 체크아웃한다.
가능하면 `git merge` 전에 워킹 디렉토리를 완전 커밋된 상태로 만든다.

	$ git checkout branch
	$ git merge other_branch

fast-forward 머지를 사용하지 않으려면.
디폴트로 ff 옵션이 켜 있는데 브랜치의 역사가 사리지는 것을 싫어하는 사람들도 있다.
ff 에 대한 설명은 아래에 따로 적어 놨다.

	$ git merge --no-ff other_branch

병합 과정에서 충돌이 없다면 자동으로 커밋이 생성된다.
충돌이 있을 경우 문제를 수작업으로 해결한 후 수동커밋해야 한다.

	$ vi <file to edit>
	$ git add <file>
	$ git commit -m “…”

충돌한 파일들의 목록을 보려면.

	$ git status

충돌한 머지를 버리고 워킹 디렉토리를 최종 커밋으로 되돌리려면.

	$ git reset --hard HEAD

머지에 대해 발생한 커밋을 버리고 머지 이전 커밋으로 되돌리려면.
(머지 명령전에 HEAD 가 ORIG_HEAD 에 백업된다.)
	
	$ git rest --hard ORIG_HEAD


### 머지 정책

머지 실행시 Git 는 머지 정책을 선택한다.
Already up-to-date, Fast-forward 가 먼저 시도되고 브랜치가 다수라면 Octopus 가 사용된다.
일반적인 경우에는 Recursive 가 사용된다.

Already up-to-date

머지하려는 브랜치의 HEAD 가 과거에 이미 머지되어 있는 경우에는 머지를 중지한다.

Fast-forward

other_branch 에 현재 브랜치의 HEAD 가 이미 적용되어 있는 경우, 다르게 말하면 현재 브랜치는 분기 이후 변한 것이 없고 분기해서 수정한 브랜치를 다시 원래 브랜치에 머지하려는 경우, 머지 커밋 생성 없이 HEAD 가 other_branch 를 가리키도록 링크만 바꾼다.

Resolve

평범한 두 브랜치 머지다. 두 브랜치의 분기점을 찾아서 그 이후 발생한 소스 브랜치의 변경을 타겟 브랜치에 적용한다.

Recursive

Resolve 의 경우와 흡사하나 머지 베이스가 하나 이상일 때는 머지 베이스들을 일단 머지해서 임시로 머지 베이스를
만든 후 메인 머지에 사용한다.

Octopus

머지할 브랜치가 세 개 이상일 때는 두 개씩 Recursive 머지를 순차적으로 시도한다.

