# Show

리포지터리 내용을 조회할 수 있는 명령 몇 가지.

### show

최신 커밋의 상세 정보를 볼 수 있다.

	$ git show

특정 커밋의 상세 정보를 볼 수 있다.

	$ git show 1e9321f

파일 내용을 볼 수 있다.

	$ git show origin/master:Makefile
	$ git show HEAD~4:src/main.c
	

### ls-tree

커밋에 저장된 파일 목록을 볼 수 있다.

	$ git ls-tree master


### cat-file

해쉬값으로 파일을 덤프할 수 있다.

	$ git cat-file -p 1e9321f2929c8b167e1c25f119e14e912949b71a
	$ git cat-file -p 1e9321f2
