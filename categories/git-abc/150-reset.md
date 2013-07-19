# Reset & Revert

Reset 은 인덱스나 워킹 디렉토리를 최신 커밋으로 리셋한다.
필요에 따라 브랜치 헤드를 과거로 보내 커밋 자체를 삭제할 수도 있다.

Revert 는 해당 커밋을 복구하는 새로운 커밋을 추가한다.

Reset 은 가능하면 최신 커밋으로 복구할 때만 사용하고
커밋을 되돌릴 때는 Reset 대신 Revert 를 쓰는 것이 안전하다.

인덱스는 거의 IDE 가 대신 다루기 때문에 인덱스를 리셋하는 작업도 흔한 일은 아니다.


### Reset

인덱스를 리셋하여 `git add` 를 모두 취소할 수 있다. 

	$ git reset
	
특정 파일의 인덱싱만 취소할 수 있다.

	$ git reset -- readme.md
	
인덱스뿐만 아니라 워킹 디렉토리까지 리셋할 수 있다.

	$ git reset --hard

최근 3 회의 커밋 기록을 삭제할 수 있다.

	$ git reset --hard master~3

특정 파일만 복구하기 위해 아래와 같은 명령을 사용하고 싶겠지만 **실행되지 않는다.**

	$ git reset --hard -- readme.md
	
파일 단위로 복구하기 위해서는 `checkout` 을 사용한다.
	
	$ git checkout -- readme.md


### Revert

마지막 커밋을 복구하는 새로운 커밋을 추가한다.

	$ git revert --no-edit master
