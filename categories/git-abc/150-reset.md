# Reset & Revert

Checkout 은 워킹 디렉토리로 Commit 을 꺼내오긴 하지만 Commit 기록 자체를 변경하진 않는다.  

Reset 은 Branch Head 를 과거로 되돌려 커밋 자체를 삭제한다.

Revert 는 해당 커밋을 복구하는 새로운 커밋을 생성한다.  
커밋내용을 복구할 때는 가능하면 Reset 대신 Revert 를 쓰는 것이 안전하다.


### Reset Hard

마지막 커밋으로 워킹 디렉토리와 인덱스를 리셋한다.
Hard 옵션을 주면 워킹 트리와 인덱스도 리셋되는 것을 이용했다.

	$ git reset --hard

최근 3회 커밋 기록을 삭제한다.

	$ git reset --hard master~3

	
### Reset Soft

브랜치 헤드를 해당 커밋으로 변경하지만.  
워킹 디렉토리와 인덱스는 변경하지 않는다.

	$ git reset --soft master~3


### Reset File

해당 파일에 대한 인덱스에 내역을 삭제한다.  
잘못 `git add` 한 파일을 인덱스에서 삭제하는데 주로 사용한다.

	$ git reset -- readme.md

워킹 디렉토리의 파일을 복구하기 위해서는 checkout 을 사용한다.

	$ git checkout -- readme.md


### Revert

마지막 커밋을 복구하는 새로운 커밋을 생성한다.

	$ git revert --no-edit master

