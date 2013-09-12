# ssmtp

2011-02-23 16:33

mdadm monitor 같은 로컬 서비스들이 메일을 보내려면
postfix, sendmail 과 같은 메일 데몬이 로컬에서 돌고 있어야합니다.

ssmtp 는 메일 서비스를 돌리지 않으면서 sendmail 의 메일 보내기 기능을 에뮬레이션합니다.

로컬서비스들은 sendmail 명령으로 메일을 보내는데,
ssmtp 를 설치하시면 /usr/lib/sendmail, /usr/sbin/sendmail 이 /usr/sbin/ssmtp 로 링크 걸리는 것을 보실 수 있습니다.

메일 발신에 사용할 새 메일 계정을 마련합니다.
환경 설정에 암호를 적어 노출해 놔야하는데 누가 내 주 메일 계정의 비밀번호를 보면 기분나쁘겠죠?

설치

	apt-get install ssmtp

설정 파일

	/etc/ssmtp/ssmtp.conf

	root=drypot.alarm@gmail.com
	<-- root 처럼 로컬 UID 1000 이하인 계정이 받는 메일은 이리로 포워딩됩니다.
	<-- mdadm 같은 경우 기본으로 root 로 메일을 쏘게 되어있으니 이거 설정해두면 편리하므로 적어 둡니다.
	<-- 메일 발신 계정과 일치하지 않아도 되는데,
	<-- 저는 구글메일에서 drypot.alarm 수신되는 메일을 본 계정으로 포워딩되게 해두었으므로 걍 이렇게 적었습니다.

	mailhub=smtp.gmail.com:587 <-- 저는 구글 메일 계정으로 받도록 했으니 구글 메일 서버 주소를 적습니다.

	#rewriteDomain=
	#hostname=
	#FromLineOverride=YES

	UseSTARTTLS=YES <-- 암호가 쌩으로 네트웍에 돌아다니면 기분이 나쁘겠죠? 적어줍시다.
	UseTLS=YES
	AuthUser=drypot.alarm@gmail.com <-- 메일 발신용 계정 이름
	AuthPass=XXXXX <-- 메일 발신용 계정 암호


테스트

	mailx -s="ssmtp testing" drypot@gmail.com
	...
	^D

mailx 는 sendmail 로 메일 포멧 파일을 만들어 보내고,
sendmail 은 ssmpt 로 링크걸려 있으니 ssmtp 가 메일 포멧을 해석해서
구글 메일의 drypot.alarm@gmail.com 계정에 로그인 한 후
drypot@gmail.com 로 메일을 쏴줍니다.

