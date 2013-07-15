# Git Config

### Config Files

점차 글로벌하게 3 단계의  설정 파일이 존재한다.

	.git/config          # default
	~/.gitconfig        # with the --global option
	/etc/gitconfig      # with the --system option


설정 확인.

	$ git config -l

설정 삭제.

	$ git config --unset --global user.email


### User

앞으로 만들 커밋의 만든 장본인이 누군지 아래 명령으로 등록한다.

	$ git config --global user.name “drypot”                        
	$ git config --global user.email “drypot@gmail.com”


### 앨리어스

자주 사용하는 git 명령의 앨리어스를 만들어 두고,

	$ git config --global alias.show-graph 'log --graph --abbrev-commit --pretty=oneline'

이렇게 사용할 수 있다.
	
	$ git show-graph


### 파일 무시

컴파일러 출력 파일등 Git 로 관리할 필요가 없는 파일들이 많을 것이다.
이런 파일들의 패턴은 `.gitignore` 파일에서 관리한다.
서브디렉토리의 `.gitignore` 는 상위 규정을 오버라이딩한다. 
`.gitignore` 파일은 자동으로 `git add` 되지 않으니 수동으로 넣는다.

로컬 리포지터리에만 적용하고 싶은 예외 규정은 `.git/info/exclude` 에서 설정한다.
리포지터리 클론시 복사되지 않는다.

아래는 `.gitignore` 파일 예.

	# 이 줄은 코멘트.
	# 패턴 앞에 ! 을 붙이면 not 의 의미다

	# 빈 줄은 무시된다.

	# 파일 이름만 써놓으면 모든 디렉토리에서 해당 파일을 무시한다.
	ignore-me-everywhere.txt
	
	# OSX 에서는 폴터 관리 파일도 무시하자.
	.DS_Store

	# 끝이 / 로 끝나면 해당 디렉토리 전체를 무시한다.
	ignore-dir/

	# 와일드카드를 쓸 수도 있다.
	debug/32bit/*.o
	*.[oa]
	tmp/**/*
	log/*

	# 개발시 로컬 머신에서만 의미있는 설정 파일들도 무시한다
	config/database.yml


