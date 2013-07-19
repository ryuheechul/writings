# Branch

커밋들은 줄줄이 사탕처럼 연결되어 있는데 각 줄기를 브랜치라 한다.  
현재 작업중인 브랜치는 HEAD 가 가리키고 있다.


### 브랜치 확인

로컬 브랜치 목록을 보여준다.

	$ git branch
	* master

로컬 브랜치와 리모트 브랜치를 모두 보여준다.

	$ git branch -a
	* master
	  remotes/origin/master

로컬 브랜치들의 히스토리를 보여준다.

	$ git show-branch --more=10

로컬 브랜치와 리모트 브랜치의 히스토리를 보여준다.

	$ git show-branch -a

브랜치 보기 명령이 있다는 것만 확인하고 브랜치 표시에는 가능하면 GUI 를 사용한다.


### 브랜치 생성

현재 브랜치가 master 일 때

	$git branch
	* master

develop 브랜치를 생성한다.

	$ git branch develop

`git branch` 는 브랜치 레퍼런스를 만들기만 할 뿐 현재 브랜치를 바꾸지는 않는다.  

	$git branch
	* master
	  develop


### 브랜치 변경

현재 브랜치를 변경한다.

	$ git checkout develop

새 브랜치 생성과 변경을 한번에 한다.

	$ git checkout -b feature

위 명령은 아래 두 명령과 의미가 같다.

	$ git branch feature
	$ git checkout feature


### 브랜치 삭제

브랜치 삭제.

	$ git branch -d feature

이 명령은 브랜치 레퍼런스만 삭제한다.  
브랜치에 연결되어 있던 커밋들은 그대로 방치되다가 GC 할 때 삭제된다.

	$ git gc


### 브랜치 머지

브랜치 머지란 타 브랜치를 현재 브랜치에 합치는 것이다.

develop 브랜치를 master 에 머지하려면 먼저 master 를 체크아웃한다.  

	$ git checkout master

현재 브랜치가 master 가 되었다.

develop 브랜치를 master 에 머지한다.

	$ git merge develop

머지 과정에서 충돌이 없다면 자동으로 커밋이 생성된다.  


### 머지 충돌

충돌이 있을 경우 문제를 수작업으로 해결한 후 수동커밋해야 한다.

충돌한 파일들의 목록을 보려면.

	$ git status

충돌한 머지를 버리고 워킹 디렉토리를 최종 커밋으로 리셋하려면.

	$ git reset --hard

머지에 의해 발생한 커밋을 버리고 머지 이전 커밋으로 되돌리려면.
	
	$ git reset --hard ORIG_HEAD

머지 명령이 HEAD 를 ORIG_HEAD 에 백업하는 것을 이용하였다.


### 머지 정책

머지 실행시 Git 는 머지 정책을 선택한다.

Already up-to-date, Fast-forward 가 먼저 시도되고  
브랜치가 다수라면 Octopus 가, 일반적인 경우에는 Recursive 가 사용된다.

* Already up-to-date

	머지하려는 브랜치의 HEAD 가 과거에 이미 머지되어 있는 경우에는 머지를 중지한다.

* Fast-forward

	분기해서 수정한 브랜치를 다시 원래 브랜치에 머지하려는 경우 머지 커밋 생성없이 브랜치 레퍼런스만 업데이트한다.

	FF 가 가능한 상황이라면 자동으로 선택되는데 FF 를 막고 머지 커밋을 강제 생성할 수 있다.

		$ git merge --no-ff develop

* Resolve

	평범한 두 브랜치 머지다.  
	두 브랜치의 분기점을 찾아서 그 이후 발생한 소스 브랜치의 변경을 타겟 브랜치에 적용한다.

* Recursive

	Resolve 의 경우와 흡사하나 머지 베이스가 하나 이상일 경우 머지 베이스들을 일단 머지해서 임시 머지 베이스를 만든 후 메인 머지에 사용한다.

* Octopus

	머지할 브랜치가 세 개 이상일 때는 두 개씩 Recursive 머지를 순차적으로 시도한다.

