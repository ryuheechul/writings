# Commit

인덱스 내용을 리포지터리(오브젝트 스토어)에 저장한다.

### Commit

현재 인덱스 내용을 커밋한다. `-m` 옵션은 필수다.

	$ git commit -m “first commit”

### Commit All

`-a` 옵션으로 수정된 파일들의 인덱싱과 커밋을 한번에 할 수도 있다.  
즉 `git add + git commit` 이다.  

	$ git commit -a -m “commit all modified” 

### Commit Amend

바로 이전 커밋에 파일을 추가하거나 메시지를 수정할 수 있다.

	$ git commit --amend


### Show History

커밋 히스토리를 보여준다.

	$ git log
	$ git log --pretty=oneline

	
출력 갯수를 지정할 수 있다.
	
	$git log -5
