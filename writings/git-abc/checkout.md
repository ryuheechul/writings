# Git Checkout


Repo 에서 지정 커밋을 Working 디렉토리로 끄집어 냄.


### Checkout
 
	$ git log
	$ git checkout 8b4fe
	
master 브랜치 최신 커밋으로 복구

	$ git checkout master
	
	
### Checkout File

파일 복구

	$ git checkout 8b4fe -- <file>
	
최신 커밋에서 복구

	$ git checkout HEAD -- <file> 


### 커밋된 파일 내용 보기

해당 커밋의 파일 내용을 볼 수 있다.

	$ git show origin/master:Makefile
	$ git show HEAD~4:src/main.c
	
