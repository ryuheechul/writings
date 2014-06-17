# Commit

인덱스에 등록한 파일들의 스냅샷을 리포지터리에 저장한다.

### Commit

커밋. `-m` 옵션은 필수다.

	$ git commit -m “first commit”


### Commit All

수정된 파일들의 인덱싱과 커밋을 한번에 할 수 있다.
즉 `git add + git commit` 이다.
새로 생성한 파일은 자동 등록되지 않는다.

	$ git commit -a -m “commit all modified” 

### Commit Amend

바로 이전 커밋에 파일을 추가할 수 있다.

	$ git commit --amend


### Show Commit Log

커밋 히스토리를 보여준다.

	$ git log
	$ git log --pretty=oneline

	
출력 갯수를 지정할 수 있다.
	
	$git log -5
