# Checkout

특정 커밋 상태를 워킹 디렉토리로 끌어낸다.


### Checkout Branch

브랜치를 변경한다.  
HEAD 가 해당 브랜치명을 가리키게 되고 워킹 디렉토리도 업데이트된다.  
워킹 디렉토리의 작업중인 파일은 업데이트되지 않으므로 새 브랜치에 커밋할 수 있다.

	$ git checkout master
	

### Checkout New Branch

새 브랜치를 생성한 후 이동한다.
이 때도 워킹 디렉토리의 작업중인 파일은 보존되므로 새 브랜치에 커밋할 수 있다.

	$ git checkout -b hotfix-101


### Checkout Commit

브랜치 명으로 지정할 수 없는 특정 커밋을 체크아웃할 수 있다.  
HEAD 는 체크아웃된 커밋을 가리키게 된다.

	$ git checkout 8b4fe
	$ git checkout master~9

일반적으로 HEAD 는 브랜치를 가리키고 있는데 이 처럼 비브랜치 커밋을 가리키는 상태를 Detached HEAD 라고 한다.

Detached HEAD 상태에서도 커밋을 할 수 있는데

	$ git commit -m "...."

이렇게 생성된 커밋은 아무 브랜치에도 속하지 않은 상태이기 때문에 브랜치 명을 입혀주어야 한다.  
브랜치를 입히지 않으면 GC 과정에서 삭제된다.

	$ git checkout -b new-branch

`checkout -b` 하지 않고 브랜치만 생성할 수도 있는데

	$ git branch new-branch

 이렇게 하면 HEAD 가 업데이트되지 않았으므로 계속 Detached HEAD 상태에 남게 된다.

	
### Checkout File

특정 파일만 복구할 수 있다.

	$ git checkout 8b4fe -- readme.md
	
최신 커밋에서 복구.

	$ git checkout -- readme.md

