`# Git Symbol

### 심볼

Git 를 쓰다보면 많은 커밋 오브젝트를 만들게 되는데 20 자리 16진수 이름을 직접다루는 것은 불편하다.
그래서 해쉬 이름을 대신하는 심볼 (symref, Symbolic reference) 을 사용한다.

심볼은 아래 모든 디렉토리들에서 검색되기 때문에 긴 이름을 쓸 수도 있고 짧게 줄여 쓸 수도 있다.
예로, `dev` 는 `refs/heads/dev` 의 짧은 이름이 될 수 있고
`origin/master` 는 `refs/remotes/origin/master` 의 짧은 이름이 될 수 있다. 

	.git/<ref name>
	.git/refs/<ref name>
	.git/refs/tags/<ref name>
	.git/refs/heads/<ref name>
	.git/refs/remotes/<ref name>
	.git/refs/remotes/<ref name>/HEAD

심볼은 몇 가지 상위 개념을 구현하는데 사용된다.
과거의 특정 커밋을 지칭하기 위해서는 태그를 사용하고 일련의 커밋 리스트를 다루기 위해서는 브랜치를 사용하는데
브랜치가 여러 명령에 의해 자동 업데이트 된다는 차이가 있을 뿐 태그와 브랜치가 특정 커밋을 가리키는 심볼이라는 점에선 같다.

`.git` 디렉토리에서는 맨 처음 규칙을 만족시키는 `HEAD`, `ORIG_HEAD`, `FETCH_HEAD`, `MERGE_HEAD` 등의 특별한 심볼 파일들을 볼 수 있다. 이 심볼들은 Git 가 특별히 관리한다.

HEAD, 현재 브랜치의 최신 커밋을 가리킨다.

ORIG_HEAD, `merge` 나 `reset` 명령은 HEAD 를 ORIG_HEAD 라는 이름으로 백업해 둔다.

FETCH_HEAD, `git fetch` 명령은 fetch 한 모든 브랜치들의 HEAD 를 `.git/FETCH_HEAD` 에 저장한다.

MERGE_HEAD, merge 중 merge 하고 있는 다른 브랜치의 HEAD 가 MERGE_HEAD 에 저장된다.


### Relative Commit Names

브랜치 이름의 끝에 특수 문자를 붙여서 커밋을 지정하는 방법이 있다.

`master^` 는 master 브랜치 HEAD 의 부모 커밋을 가리킨다. `master~1` 도 같은 의미다.

`master^^` 는 master 브랜치 HEAD 의 부모의 부모 커밋을 가리킨다. `master~2` 도 같은 의미다.

머지는 여러 부모를 갖는데 머지로 생성된 `C` 라는 커밋이 있을  때
`C^1` 은 첫 번째 부모 커밋, `C^2` 는 두 번째 부모 커밋을 가리킨다.


### 레퍼런스 확인

리포지터리의 심볼 레퍼런스 목록을 본다.

	$ git show-ref

리모트 리포지터리의 심볼 레퍼런스 목록을 본다.

	$ git ls-remote <remote>

