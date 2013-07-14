Simple Samba


### 들어가는 글

삼바로 간단한 파일 공유 서버를 만드는 방법이다.
내가 원하는 시나리오 대로 설명한 문서가 거의 없고 디스트로에 비슷한 안내글이 있어도 틀린 내용이 많아서 레퍼런스 들고 삽질을 하였다.
여기에 결과를 정리해 둔다.


### 시나리오

여러가지 파일 서버를 구축 시나리오가 있을 수 있겠으나 여기서는 `readable` 과 `writable` 공유를 만들 것이다.
두 폴더에 대해서 모두 `guest` 의 읽기 접근이 가능하지만 `writable` 에만 쓰기가 가능하다.
관리자는 `drypot` 이란 유저인데 `readable` 과 `writable` 에 모두 쓰기가 가능해야한다. 


### 설치

아래 모든 작업은 `root` 권한이 필요하니 일단 `root` 로 변신한다. 아래 모두 우분투 기준이다.

	sudo -s

삼바를 설치한다.

	apt-get install samba

설치후 `/etc/samba` 에 가면 관련 설정 파일들이 있다.
기본 설정 파일인 `/etc/samba/smb.conf` 에는 주석이 많아서 편집하기 힘드니 주석이 없는 파일을 생성한다.

	cd /etc/samba
	cp smb.conf smb.conf.master
	testparm -s smb.conf.master > smb.conf


### `guest` 를 위한 준비

많은 삼바 문서에 `guest` 를 허용하려면 `security = share` 를 사용하라고 되어 있다.
그런데 이 모드는 디폴트도 아니고 여러가지 문제와 제약을 만든다.
그러므로 약간의 절차가 추가되지만 가능하면 항상 `security = user` 모드를 사용해야 한다.
`user` 모드 시큐리티를 사용하면서 `guest` 사용자를 위한 계정을 설정하려면 아래 절차가 필요하다.

`/etc/samba/smbusers` 파일을 만들어서 아래 내용을 저장한다. netbios 스페이스의 `guest` 를 리눅스의 `nobody` 계정으로 매핑할 것이란 뜻이다. 윈도우 서버의 `administrator` 계정을 `root` 로 매핑할 필요가 있다면 그것도 여기에 적으면 된다.  

	nobody = guest

아래 명령을 내린 후 엔터를 두 번쳐서 nobody 의 암호를 공백으로 만든다. 삼바가 관리하는 암호테이블과 유닉스에서 관리하는 암호테이블이 달라서 삼바에 접속하려는 계정들의 암호는 smbpasswd 로 추가해 두어야 한다.

	smbpasswd -a nobody


### `smb.conf` 설정

	[global]
			workgroup = workgroup
			#netbios name = littlebig
			
			security = user
			user name map = /etc/samba/smbusers
			map to guest = bad user
	
			valid users = drypot, nobody
			admin users = drypot
	
			create mask = 0644
			directory mask = 0755
	
			follow symlinks = yes
			wide links = yes
			unix extensions = no
	
			server string = %h server (Samba, Ubuntu)
			obey pam restrictions = Yes
			pam password change = Yes
			passwd program = /usr/bin/passwd %u
			passwd chat = *Enter\snew\s*\spassword:* %n\n *Retype\snew\s*\spassword:* %n\n *password\supdated\ssuccessfully* .
			unix password sync = Yes
			syslog = 0
			log file = /var/log/samba/log.%m
			max log size = 1000
			dns proxy = No
			#usershare allow guests = Yes
			panic action = /usr/share/samba/panic-action %d
	
	[readable]
			path = /data/readable
			read only = yes
			write list = drypot
	
	[writable]
			path = /data/writable
			writeable = yes

**`workgroup`** 값은 회사에서 사용하는 윈도우 웍그룹 이름에 맞게 고친다.

**`netbios name`** 은 윈도우 네트웍에 보이는 이름인데 기본적으로 `/etc/hostname` 을 가져다 쓰므로 꼭 지정할 필요는 없다.

**`security`** 의 기본 값은 이미 `user` 다. 그러니 꼭 적지 않아도 되나 명시적으로 적은 이유는 `guest` 를 위해 여기다 `share` 를 사용하라는 잘못된 문서들이 너무 많기 때문이다. 반드시 항상 `user` 모드를 사용하도록 한다.

**`map to guest = bad user`** 는 클라이언트가 보낸 사용자명이 유닉스 사용자 목록에 없다면 `guest` 로 취급하라는 뜻이다. 예로 윈도우에서 `user1` 이란 사용자명을 쓰고 있는데 삼바 서버에 접근했을 경우 `user1` 이란 사용자가 없다면 이 사용자는 `guest` 가 된다. `user1` 란 유닉스 사용자는 있는데 암호가 틀리면 로그인 에러가 뜬다. 이 때는 `user1` 에 대한 유닉스 암호를 입력하던지 사용자이름 란에 `guest` 를 명시적으로 적어줘야 한다. `bad user` 자리에 들어갈 수 있는 인자는 `naver`, `bad password` 등도 있는데 거의 쓸 일 없다.

**`valid users`** 에는 삼바를 사용할 수 있는 유닉스 계정을 나열해 준다.

**`admin users`** 에 나열된 계정으로 접속하면 그 세션은 `root` 계정으로 변신한다. 손님들이 `writable` 폴더에 등록한 파일들의 소유자는 `nobody` 가 된다. 별도의 관리용 계정으로 접속해서 `nobody` 들의 파일을 정리하려면 `root` 권한이 필요하다.

**`create mask`**, **`directory mask`** 는 파일, 디렉토리 생성시 적용될 퍼미션이다. 취향에 맞게 적는다.

**`follow symlinks`** 부터 3 개의 옵션은 심볼릭 링크의 기능을 삼바에서도 활성화하기 위한 것이다.

**`server string`** 부터 한무데기 되는 옵션들은 우분투 패키지가 기본 저장한 것들이다. 그래로 둔다.

**`[readable]`** 은 공유 이름이다. 그 아래는 해당 공유에 대한 옵션들이다. `readable` 폴더는 기본적으로 읽기 전용으로 만들었으므로 **`read only = yes`** 해둔다. 하지만 관리자 계정으로 들어왔으면 쓰기 가능해야하니 관리자 계정을 **`write list`** 에 추가해 둔다.

**`[writable]`** 도 비슷하다. 

**`path`** 에 지정된 디렉토리는 삼바가 사용할 계정들에 대해 (예에서는 `nobody`, `drypot`) 해당 접근 권한이 있어야 한다. 내 경우 `readable` 은 0755, `writable` 은 0777 을 줬다. 디렉토리의 소유자는 크게 중요하지 않다.

### 설정 적용

데몬을 재시작하기 전에 설정에 오류가 없는지 검사해야 한다.

	testparm

`testparm` 이 오류를 표시하지 않으면 데몬을 재시작한다.
우분투에서 삼바 데몬은 System V Script 스타일 대신 upstart 스타일로 세팅되어 있다. `restart` 명령을 사용한다.

	restart smbd

### 참고: guest 없애고 아이디와 암호를 꼭 입력하게 하려는 경우

`user name map = /etc/samba/smbusers` 행을 # 으로 주석 처리하고 `valid users` 목록에 필요한 계정을 모두 나열해 준다.
아래 예에서는 `share` 라는 계정을 추가하였다.
`smbpasswd -a <username>` 명령으로 삼바에 사용할 계정들의 삼바 암호를 추가하는 것도 잊지 않는다.

	[global]
			workgroup = workgroup
			#netbios name = littlebig
	
			security = user
			#user name map = /etc/samba/smbusers
			map to guest = bad user
	
			valid users = drypot, share
			admin users = drypot
	
			create mask = 0644
			directory mask = 0755
	
			follow symlinks = yes
			wide links = yes
			unix extensions = no
	
			server string = %h server (Samba, Ubuntu)
			obey pam restrictions = Yes
			pam password change = Yes
			passwd program = /usr/bin/passwd %u
			passwd chat = *Enter\snew\s*\spassword:* %n\n *Retype\snew\s*\spassword:* %n\n *password\supdated\ssuccessfully* .
			unix password sync = Yes
			syslog = 0
			log file = /var/log/samba/log.%m
			max log size = 1000
			dns proxy = No
			#usershare allow guests = Yes 
			panic action = /usr/share/samba/panic-action %d
	
	[readable]   
			path = /data/readable
			read only = yes
			write list = drypot
		
	[writable]
			path = /data/writable
			writeable = yes
