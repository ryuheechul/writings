MySQL Encoding
2010-11-29 16:16

### 스키마 인코딩

스키마 인코딩은 스키마 만드실 때
디비나 테이블 단위로 지정하시는 것을 알고 계실 것 같습니다.

### 컨넥션 인코딩

어플리케이션 서버에서 MySQL 서버에 접속할 때 인코딩을 지정하시려면
컨넥션 스트링에 인코딩 정보를 추가해줍니다.

	dbc:mysql://localhost:3306/todays_fortune?characterEncoding=utf8

UCS2 쓰시려면 ucs2.
대소문자는 안 가리는 것 같네요.

블로그들에 보면 useUnicode=true 넣으라고 되어 있는데 디폴트입니다.

레퍼런스에는 characterEncoding 으로 던져주는 값은 MySQL 리터럴이 아니고
자바 리터럴을 쓰라고 되어 있어서 화들짝했는데,
업데이트로그 보니 MySQL 리터럴을 쓰면 변환을 하는 기능이 추가되어 있었네요.
정석을 따른다면 utf8, ucs2 대신에 UTF-8, UnicodeBig 을 써야하나본데 걍 다 된다니 패스. =,=

JDBC URL 에 characterEncoding 를 붙이는 것이 지저분해 보여서 어떻게 떼버릴 수 없을까 찾아봤는데,
저거 붙이지 않으면 서버에 쿼리 넣어서 character_set_server 값을 가져다 쓴다고 합니다.
별로 좋아보이지 않는군요. =,=
계속 characterEncoding 꼬려 붙여 쓰는 것이 맞는 듯.

character_set_database 를 ucs2 쓰는 것이 효율적이지 않은가 생각이 드는데
MySQL 은 쿼리 넣는 것에 1 byte character set 밖에 지원을 안 하네요. -ㅁ-
근레 결과 받는 것은 2 byte set 도 지원하고. =,=

해보지 않았는데 ucs2 를 쓰려면 url 인자에 characterEncoding=utf8 박고,
characterSetResults=ucs2 로 별도로 넣어줘야 하나 보군요. =,=

보낼 때는 utf8, 받을 때는 ucs2.
좀 이상해 보입니다. =,=
흠, 깔끔하게 만들려면 걍 다 utf8 써야하는 듯.


### 환경설정 파일

그래서 MySQL 의 초심자 입장에서 아래와 같이 머리에 정리가 되었습니다.

my.cnf 파일에서

	[client]
	default_character_set   = utf8    # mysql 등 코멘드라인에서 붙을 때 기본 캐릭터셋 지정

	[mysqld]
	character_set_server=utf8         # 서버 기본 인코딩 지정
	collation_server=utf8_general_ci

디비 생성시 utf8 지정

	create database `sleek` character set utf8 collate utf8_general_ci;

JDBC url 에서 utf8 지정

	jdbc:mysql://localhost:3306/sleek?characterEncoding=utf8

