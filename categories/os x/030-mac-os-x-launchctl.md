Mac OS X 데몬
drypot 2011-05-18 19:06
맥에서 데몬 띄우는 방법 학습겸 개발용 맥북에서 mongodb 데몬 설정을 해봤습니다.

OS X 에는 /etc/init.d 가 없습니다.
OS X 에서 데몬 관리는 launchd 가 관장하는데 기능이 좋습니다.
생각할 수 있는 데몬 환경 설정 옵션은 거의 다 제공하는 것 같습니다.

자세한 것은 아래 man 페이지에서 보실 수 있습니다.
man launchd <-- 데몬 왕
man launchctl <-- 데몬 왕에 명령 내리는 코멘드
man launch.plist <-- 데몬 설정 파일 문법

데몬 설정 파일은 여러 곳에 넣어둘 수 있습니다.

/System/Library/LaunchDaemons <-- 우리가 손대면 안 좋은 곳
/Library/LaunchDaemons <-- 맥 부팅시 무조건 뜨는 데몬들

/System/Library/LaunchAgents <-- 우리가 손대면 안 좋은 곳
/Library/LaunchAgents <-- 사용자 로그인 시 뜨는 데몬들
~/Library/LaunchAgents <-- 사용자 로그인 시 뜨는 데몬들 (각 사용자별로)

저는 맨 마지막 ~/Library/LaunchAgents 에 설정을 넣을 겁니다.
제 홈 디렉토리에 설정을 두는 것이 왠지 마음에 놓여서. ^^

제 몽고디비 폴더는 아래와 같이 되어 있습니다.
/Users/drypot/mongodb/mongodb <-- 몽고디비 패키지
/Users/drypot/mongodb/data <-- 몽고디비 데이터 폴더

아래 데몬 설정 파일 만듭니다.
~/Library/LaunchAgents/local.mongodb.plist

파일 내용은 아래와 같습니다.
각 필드의 값은 여러분의 몽고 설치위치에 따라 바꿔쓰세요.

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>Label</key>
		<string>local.mongodb</string>

		<key>WorkingDirectory</key>
		<string>/Users/drypot/mongodb</string>

		<key>ProgramArguments</key>
		<array>
			<string>mongodb/bin/mongod</string>
			<string>--dbpath</string>
			<string>data</string>
			<string>--bind_ip</string>
			<string>localhost</string>
			<string>--smallfiles</string>
		</array>

		<key>KeepAlive</key>
		<true/>

		<key>RunAtLoad</key>
		<true/>

	</dict>
</plist>

launchd 설정 파일들은 시스템 부팅시나 로그인 시에만 읽혀지니
위 파일을 만들고 나서는 수작업으로 로딩을 시켜야 합니다.
아래 명령을 실행합니다.

launchctl load ~/Library/LaunchAgents/local.mongodb.plist

설정 파일에 문법 오류가 없다면 아무 소리 없이 데몬이 뜰껍니다.
먼가 오타가 있으면 plist 를 발견 못했다는 이상한 메시지가 나옵니다. =o=