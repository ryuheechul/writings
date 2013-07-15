# Derby

2009.08.16

HSQLDB, H2Database, Derby 이름이 많이 올르락 내리락하는데
잘 나가다가 꼭 하나씩 치명적인 문제점이 있다.

Derby 가 벤치마크상 기본 속도는 제일 느린데
여태까지 본 바로는 그럭저럭 문제점 제일 적은 것 같다.
SQL 문을 바이트 코드로 컴파일 해 놓고 쓴다고한다.

아래 글이 Derby 관련 단평중에 그나마 좀 상세하고 재밋는 것 같다.

http://www.carehart.org/resourcelists/derby_for_CFers/

아래는 Derby 하고 MySQL 하고 속도 비교한 것인데,

http://wiki.apache.org/apachecon-data/attachments/Us2005OnlineSessionSlides/attachments/ApacheCon05usDerbyPerformance.pdf

이정도 퍼포먼스 나오면 쓸만할 것 같다.
5 배, 10 배 이렇게 심하게 떨어지는 것이 아니고
보통 2 배, 안 좋은 상황에서 4 배 정도 무리갈 것 같다.


2009.08.17

기대하지도 않았는데 NetBeans 에서 더비 지원이 좋다.

근데 얘 왜, 컬럼 명은 다 대문자로 만들까.

다행히도 페이징 문법이 가장 최신 버전에 얼마전에 추가되었다.

	select ... from ... where ... order by ... 
	offset 0 rows fetch next 20 rows only;


2009.09.08

관련 공식 PDF 가 6 개 밖에 없다. 행복하다.
Oracle, DB2 프로젝트 한번 들어갈 때마다 PDF 수십권 씩 왔다갔다 했던 것에 비하면, 책 수가 일단 간출하고 좋다.

jar 파일 다해도 5 메가가 안 되는데
같은 JVM 안에서 띄워서 쓰는거, 다른 JVM 에 떠있는 서버에 접속해서 쓰는거 다 잘 된다.

SQL 도 그럴듯하게 다 되고 (버클리 보다 보니 경량 디비에서 SQL 쓸 수 있는 것도 커보인다.)
자바 프로그램 안 짜고 SQL 바로 쳐넣을 수 있는 Command Line Tool 도 있다. (버클리 =,=)

기본 툴은 시스템 버전 상태 뽑아주는거, SQL 실행기, DDL Dump 해주는거 딱 3 개 있다.

생성하는 파일들은 좀 지저분다.
데이터베이스 이름 지정되면 폴더 하나 만들고 다 그 아래 넣기는 하는데먼가 잔 파일들이 많다.

어디서 뒤통수 칠지 모르겠는데 아직까진 매력적이다.
되게 작고, 꼬물꼬물 움직이는 것이 귀엽다.

포터빌러티 하나는 끝장이기 때문에 퍼포먼스 너무 심하게만 안 떨어지고
진짜 심각한 뒤통수만 안 쳐주면 내 일생의 디비 엔진으로 모시겠다.
프로젝트마다 디비 이사 다니는 삽질은 이제 그만 했으면.


2009.09.09

더비 데몬 띄우는 명령

	java -jar .../javadb/lib/derbyrun.jar server start

더비 데몬 내리는 명령 / 다른 콘솔에서

	java -jar .../javadb/lib/derbyrun.jar server shutdown

임베디드 모드에서 디비 엔진 내리는 코드

	try {
		DriverManager.getConnection("jdbc:derby:;shutdown=true");
	} catch (SQLException se) {
		if ( se.getSQLState().equals("XJ015") ) {
			// OK
		}
	}

다른 좋은 방법이 없었는지 하지 말라는 익셉션으로 리턴 코드 던지는 모습. =o=

저 코멘드들을 보고 있자니 웹엔진하고 더비하고 떼어 놓아야 겠다는 느낌이 온다.


2009.09.11

기본적으로 시큐리티 설정이 없다.
기본 설정으로 더비를 서버로 띄우면 아무나 아무데서나 막 붙어서, 서버 셨다운하고 그럴 수 있다.
기본 개념은 이런건 파이어월로 막아라 이건데, 후덜덜하다.

루트 데이터 디렉토리 (더비에서는 시스템 디렉토리라고 부름) 에 프로퍼티 파일 하나 만들어 주고
거기에 필요한 인자들 추가할 수 있는데,

	derby.connection.requireAuthentication=true
	derby.authentication.provider=BUILTIN
	derby.user.sa=derbypass

위에 처럼 몇 줄 적어주면 디비에 접속할 때 로그인을 필수로 할 수가 있다.
핵심은 마지막 줄 처럼 사용자 계정도 프로퍼티로 만든다는 것.
간편하기도 하고 참 낙천적이라는 생각도 든다.

근데 저 프로퍼티 파일 디비 부트할 때 한번만 읽으니,
사용자 추가하거나 암호 바꾸면 디비 전체 내렸다 올려야한다. ㅋㅋ

아이디 하나 만들어 놓고, 전 어플리케이션에서 쓰던지,
(어플 마다 괜히 아이디 생성하고 비밀번호 다르게하고, 괜한 노동이란 생각이 전부터 들긴 했음)
걍 패스워드 없이 쓰던가.


2009.09.16

메모리 잡는게 불안하다.
메모리 풀 나는 극한 상황에서 어찌 된다는 설명이 없다.
OutOfMemory 던질 것 같은 분위기. =o=

derby 에서 derby.storage.pageCacheSize 에 사용할 페이지 갯수 쓰는데 이게 고정 수치이다.

java 에서 -Xmx 로 일단 JVM 쓰는 맥스 메모리 지정하고,
실제로 derby.storage.pageCacheSize 만큼 페이지들이 메모리 얼마나 차지할 지는 알아서 어림짐작하라고 되어있다. =,=

오라클이랑 DB2 는 저런거 계산하는 건 진짜 꼼꼼하게 잘 나와있는데. =,=

나중에 라이브머신에서 얼마나 올라가나 보면서 점진적으로 올려야할 것 같은데
java 다른 오브젝트들하고 힙 같이 써서 쓰레기 처리 기법 때문에 저거 제대로 확인할 수 있을지 의문스럽다.

SQL 문 컴파일하고 플랜 케슁하고 이러던데 여기에 램 얼마나 고려야하는지 설명이 한줄도 없다.


2009.09.16

흠 진짜 OutOfMemory 던진다. 헐.

http://mail-archives.apache.org/mod_mbox/db-derby-user/200703.mbox/%3Cddd98e510703010003l756b5088u987512ba5060e04a@mail.gmail.com%3E
