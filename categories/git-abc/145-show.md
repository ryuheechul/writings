# Show

### Show Commit

최신 커밋의 상세 정보를 보여준다.

	$ git show

개별 커밋의 상세 정보를 보여준다.

	$ git show 1e9321f

### Show Catalog

커밋에 저장된 파일 목록을 볼 수 있다.

	$ git ls-tree master


### Show File

커밋의 파일 내용을 볼 수 있다.

	$ git show origin/master:Makefile
	$ git show HEAD~4:src/main.c
	

### Dump Object

오브젝트 스토어 ID 로 덤프할 수 있다.

	$ git cat-file -p 1e9321f2929c8b167e1c25f119e14e912949b71a
	$ git cat-file -p 1e9321f2
