# SSH

2011-03-09 19:24

ssh 는 아시겠다시피 서버에 쉘을 열고 OpenSSL 통해서 보안통신을 하게 해주는 도구입니다.

ssh 가 통신라인을 열기 위해서는 서버쪽의 public/private 키 페어가 필요합니다.
이건 보통 서버 머신에 ssh 데몬을 설치할 때 생성이되니 접속 사용자가 별로 신경쓸 필요는 없습니다.
단지 처음 ssh 서버에 접속할 때 새로운 키가 발견되었으니 쓰겠냐는 질문이 뜨긴하지요.

그런데, ssh 서버에 접속하려면 때마다 비밀번호를 물어봅니다.
이게 짜증나니 내가 나라는 것을 서버의 접속할 계정에 등록하고
다음 접속부터는 걍 통과시켜 달라고 설정을 해둘 수 있습니다.

이를 위해서는 클라이언트쪽 public/private 키 페어가 필요합니다.
이건 자동으로 만들어 주지 않으니 아래 명령으로 만들어 봅시다.

	ssh-keygen -t rsa

간단하죠?

본인 홈 디렉토리의 .ssh 디렉토리를 보면 파일 두개가 만들어진 것을 확인할 수 있습니다.
이 파일들은 한번만 만들어 두면 여기 저기 다른 sshd 에 접속할 때 계속 사용할 수 있으니 딱 한 번만 만듭니다.

	.ssh/id_rsa
	.ssh/id_rsa.pub

자 클라이언트 키 페어를 만들었으니,
로그인할 서버로 클라이언트 퍼블릭 키를 복사합니다.

	ssh-copy-id username@remotehost

.ssh/id_rsa.pub 파일을 수작업으로 서버 계정의 authorized_keys 파일에 덧붙여도 되지만 농촌스러우니
꼭 ssh-copy-id 명령을 애용합니다.

리눅스 계열은 ssh-copy-id 가 설치되어 있는데
OS X 처럼 ssh-copy-id 가 없으면 우분투 것 복사해서 /usr/bin 에 넣어 놓습니다.


### 참고

위에 내용은 필수 사항이고 아래 내용은 참고 삼아.

접속했던 서버의 퍼블릭 키들은 클라이언트의 아래 파일에 저장됩니다.

	.ssh/known_hosts

서버의 퍼블릭 키를 클라이언트에 수동으로 설치하려면 (보안에 결벽증 있는 사람)
서버의 /etc/ssh/ssh_host_rsa_key.pub 파일을 가져와서
클라이언트의 ~/.ssh/known_hosts 파일 뒤에 붙이는데
단, 아래와 같이 호스트명이나 IP 주소 코멘트를 사이에 적습니다.

	myhost.example.com ssh-rsa AAAAB3Netc...


### 기타 서버와 클라이언트 포트를 포워딩 하는 예

클라이언트 포트를 서버 포트로 포워딩

	ssh -L <client port>:<server>:<server port> username@server

서버 포트를 클라이언트 포트로 포워딩

	ssh -R <client port>:<server>:<server port> username@server


### Mac OS X 사용자를 위한 ssh-copy-id 소스 코드

/usr/bin 에 넣어두시고, 적당히 실행 퍼미션 해두시면 두고두고 편리.


	#!/bin/sh

	# Shell script to install your public key on a remote machine
	# Takes the remote machine name as an argument.
	# Obviously, the remote machine must accept password authentication,
	# or one of the other keys in your ssh-agent, for this to work.

	ID_FILE="${HOME}/.ssh/id_rsa.pub"

	if [ "-i" = "$1" ]; then
	  shift
	  # check if we have 2 parameters left, if so the first is the new ID file
	  if [ -n "$2" ]; then
		if expr "$1" : ".*\.pub" > /dev/null ; then
		  ID_FILE="$1"
		else
		  ID_FILE="$1.pub"
		fi
		shift         # and this should leave $1 as the target name
	  fi
	else
	  if [ x$SSH_AUTH_SOCK != x ] && ssh-add -L >/dev/null 2>&1; then
		GET_ID="$GET_ID ssh-add -L"
	  fi
	fi

	if [ -z "`eval $GET_ID`" ] && [ -r "${ID_FILE}" ] ; then
	  GET_ID="cat ${ID_FILE}"
	fi

	if [ -z "`eval $GET_ID`" ]; then
	  echo "$0: ERROR: No identities found" >&2
	  exit 1
	fi

	if [ "$#" -lt 1 ] || [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
	  echo "Usage: $0 [-i [identity_file]] [user@]machine" >&2
	  exit 1
	fi

	{ eval "$GET_ID" ; } | ssh ${1%:} "umask 077; test -d .ssh || mkdir .ssh ; cat >> .ssh/authorized_keys" || exit 1

	cat <<EOF
	Now try logging into the machine, with "ssh '${1%:}'", and check in:

	  .ssh/authorized_keys

	to make sure we haven't added extra keys that you weren't expecting.

	EOF

### sshd 포트가 기본 포트가 아닌경우

ssh-copy-id 명령을 아래와 같이 하면 에러가 작열하는데,

	ssh-copy-id -p 8888 username@remotehost

이 때는 인자 전체를 ' 로 감싸줍니다.

	ssh-copy-id '-p 8888 username@remotehost'


