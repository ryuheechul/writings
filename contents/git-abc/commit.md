# Git Commit


### 커밋

현재 인덱스 내용을 커밋한다. 다르게 말하면 새로운 트리 오브젝트와 커밋 오브젝트를 생성한다.
`-m` 옵션은 필수다.

	$ git commit -m “first commit”

`-a` 옵션으로 수정된 파일들의 인덱싱과 커밋을 한번에 할 수도 있다. 즉 `git add + git commit` 이다. 
새로 만든 파일은 대상이 안 된다.

	$ git commit -a -m “commit all modified” 

바로 이전 커밋의 메시지를 수정하거나 파일을 추가할 수 있다.

	$ git commit --amend
 

### 커밋 히스토리 확인

커밋 히스토리를 보여준다.

	$ git log

간단하고 이쁘게 보여준다.

	$ git log --pretty=oneline

범위를 지정할 수도 있다.
첫 글의 Relative Commit Names 가 기억나는가?

	$git log master~12..master~10
	
출력 갯 수를 지정할 수도 있다.
	
	$git log -5

특정 파일의 이력을 확인할 수도 있다.

	$ git log --follow <file>


### 개별 커밋 확인

최신 커밋의 상세 정보를 보여준다.

	$ git show

개별 커밋의 상세 정보를 보여준다.

	$ git show <commit>

심볼릭 이름에 대한 커밋 ID 를 찾을 수 있다.

	$ gir rev-parse <symbolic commit name>


### 커밋간 차이 확인

	$ git diff <older commit id> <newer commit id>


### 태깅

특정 커밋에 태그를 붙여 놓을 수 있다.
태그는 심볼 레퍼런스로 구현하는 경량 태그와 오브젝트 스토어에 저장하는 (Annotated) 태그가 있다.

태그 목록을 보여 준다.

	$ git tag

패턴으로 검색할 수도 있다.

	$ git tag -l ‘v.1.4.2.*’

경량 태그를 생성한다.
	
	$ git tag v1.4-lw

Annotated 태그를 생성하려면 `-a` 옵션을 사용한다.

	$ git tag -a v1.4 -m “version 1.4”

태그가 가리키는 커밋을 보여준다

	$ git show <tag>

리모트 리포지터리에 태그 정보를 보내려면 `--tags` 옵션을 사용해야 한다.

	$ git push <remote> --tags

