# Checkout

채크아웃은 HEAD 를 변경하고 HEAD 가 가리키는 커밋을 워킹 디렉토리로 끌어낸다.
보통은 브랜치간 이동에 사용하는데 특별한 경우 브랜치 헤드가 아닌 과거의 생뚱맞은 커밋으로 이동할 수도 있다.  


### 브랜치 변경

현재 master 브랜치에 있을 때

	$ git branch
	* master
	  develop
	  
develop 브랜치로 이동할 수 있다.

	$ git checkout develop

	$ git branch
	  master
	* develop

`checkout` 은 워킹 디렉토리 파일들을 바꾸는데
커밋하지 않은 파일들을 보존하므로 브랜치 이동후 새 브랜치에 커밋할 수 있다.



### 브랜치 생성 + 브랜치 변경

브랜치 생성과 변경을 한번에 할 수 있다.

	$ git checkout -b hotfix-101

위 명령은 아래 두 명령과 의미가 같다.

	$ git branch hotfix-101
	$ git checkout hotfix-101


### 브랜치 헤드가 아닌 커밋으로 이동

브랜치 헤드가 아닌 커밋을 체크아웃할 수 있다.  

	$ git checkout 8b4fe
	$ git checkout master~9

일반적으로 HEAD 는 브랜치 헤드를 가리키고 있는데
이 처럼 비헤드 커밋을 가리키는 상태를 Detached HEAD 라고 한다.

Detached HEAD 상태에서도 커밋할 수는 있는데

	$ git commit -m "...."

이렇게 생성된 커밋은 아무 브랜치에도 속하지 않은 상태이기 때문에
브랜치를 만들어 연결해 주지 않으면 GC 과정에서 삭제된다.

비브랜치 커밋에 브랜치를 연결할 수 있다.
 
	$ git checkout -b new-branch

`checkout` 하지 않고 브랜치만 생성해서 연결할 수도 있는데

	$ git branch new-branch

 이렇게 하면 HEAD 는 아직도 Detached 상태이므로 다음 커밋은 다시 비브랜치 커밋이 된다.

	
### 파일 복구

`checkout` 은 특정 파일만 끌어내는 용도로 사용할 수도 있다.

워킹 디렉토리 파일을 최신 커밋 파일로 복구.

	$ git checkout -- readme.md

특정 커밋 파일로 복구.

	$ git checkout master~3 -- readme.md
	