# MongoDB Tweets

2011-05-17

MongoDB The Definitive Guide 보면서 적었던 트윗들.

어쩔 수 없이, 그냥 지나쳤다가는 계속 마음에 걸릴 듯 하여, MongoDB 리딩 시작. =,=

내가 이런 저런 DB 를 MongoDB 로 이사시킨다면 NoSQL 스타일이 좋아서라기 보다 MySQL 에 대한 불만때문일 듯.
내 DB 들이 Scaling 에 대해 고민할 크기들은 아니지만, MySQL 의 여러 면모는 진정 마음에 안 듬.

MongoDB 패키지와 서버런이 매우 간결하다.
MySQL 의 그 지저분한 설정들과 같은 것은 아직 안 보인다.

RDB 들은 보통 서버에 SQL 파서가 들어 있지만,
MongoDB 는 클라이언트 드라이버가 바이너리 패킷들을 보냅니다.

서버에서 스크립트를 받지 않기 때문에 MongoDB API 는 언어마다 형태가 다르다.

MongoDB 의 기본쉘은 JavaScript 를 스크립트 언어로 사용.

Java 에 unsigned 타입이 없는 것도 황당하지만 정수형 없는 JavaScript 도 참 깝깝하다.

쉘에서 정수 필드를 포함한 몽고 디비 레코드를 읽었다가 그대로 써도 정수가 실수 타입으로 돌변. =,=.
자바스크립트 쉘이 정수 구분을 못하기 때문.

레코드 저장시 클라이언트 드라이버에서 BSON 포멧으로 패킹해서 서버에 던지면 서버는 내용 안 보고 파일에 저장.
아주 단순한 구조.

서버 프로세스에서 파일 관리과 메모리 관리는 운영체제에 떠넘김.
걍 memory mapped file 사용. =o=
넘 맘에든다.

64Bit 환경이기에 가능해진듯.
흡사 640kb 제한에서 프로그래밍하다가 32bit 로 점핑할 때와 비슷한 단순화.
좋쿠나.

구조가 이러니 언어별 드라이버 구현에 문제가 있다면 데이터 소실이 발생할 수 있다. 만,
그럴리가. 설마. ㅋㅋㅋ

오브젝트 아이디도 클라이언트에서 생성. 12 바이트.
클러스터 운영하면 서버에서 아이디 생성이 까다로우니 나름 괜찮은 방법.
부수 이득으로 자동젠된 아이디 구하기가 간편해진다.
서버에 안 물어봐도 됨.

MySQL 에 비해 디스크 4 배 잡아먹는다는 말이 있고 (무시 =o=).
CPU, RAM 무지 먹는다는 군요. ^^
이런 문제는 병렬로 극복. =o=.
원래 이러자고 쓰는 것이니.

몽고디비로 이사할 확률 60%.
자료 저장의 스타일 차이외에도 웹사이트 제작에 자주 사용되면서 아토믹한 처리가 필요한 기능들이 많이 내장되어 있다.
RDB 에서는 트랜젝션 열고 등등등해야하는 것들.

MongoDB에는 스키마가 없다.
테이블에 여러 형태의 레코드들이 들어갈 수 있다.
넣을 값의 구조를 레코드마다 지정.
이건 다이나믹 타이핑 언어를 사용할 때와 비슷한 장단점을 가진다.
당신이 상상하는 것과 비슷.
편리하기도 하고 카오틱 하기도 하고.

MongDB 에는 SQL 같은 DML 이 없다.
대신 API 로 쿼리 크리테리아를 만듬.
당연히 SQL 같은 것 쓸 때보다 쿼리가 길고 기호가 많이 쓰이는데 난 넘 맘에든다.
클라이언트에서 매번 SQL 조합하고, 서버에서 파싱하는 삽질이 사라져서.

A4 단위 쿼리를 만들어야 한다면?

몽고디비 동물책 3 분의 1 나가고 있는데 지금 걱정은 인수받는 사람이 전체 스키마를 보고 싶을 때 어떻게 할까 라는 것.
다이나믹 타이핑 언어에서는 클래스 구조가 그래도 존재하는데 이놈은 애초애 무(Nothing)이다.
ERD 대신 도메인 UML?

MongoDB 는 레코드 안에 테이블을 넣을 수 있는데 (Codd 법칙에는 위배되지만)
글에 대한 코멘트 같은거 글과 함께 한방에 긁어 오는 데는 진짜 빠를 것 같다.

자바스크립트에서 정수 만들려면 오브젝트를 생성해야 하는군. =o=;
db.seq.insert({"_id":"users", "seq":new NumberLong(1)});

몽고디비에서는 정수 시퀀스 제공하지 않는다. =,=;
M$ SQL 쓸때마냥 수작업으로 만들어 써야함.
시퀀스 테이블에서 32 나 64 정도씩 떼어다가 어플리케이션에서 락걸고 하나씩 나나주기. =o=;

사실 MongoDB 의 12 바이트짜리 ObjectID 가 좋긴하다.
생성머신, 생생성시간을 가지고 있어서 별도 생성일 필드 없이 이거로만 인덱스 잡아도 날짜순 정렬이 가능.
단 MySQL 에서 정수로 인덱스 잡은 시스템 단박에 이사가 껄끄럽다.

구 자료에 대해서는 별도 MySQL ID 필드를 유지하고 기존 URL 호환성을 제공해주면 되겠지만,
무서운 건 MongoDB 를 버리고 다시 다른 데로 갈 때 새로운 ID 정책을 세워야한다는 것.
ID 정책이 디비에 묶이는 건 위험해 보인다.

모 그러니까 MongoDB 의 ObjectID 를 걍 쓸 것인지 가내 수공업 정수시퀀서를 돌릴 것인지가 문제. ^^

ObjectID 가 좋긴 한데, 천년만년 MongoDB 를 쓴다는 건 있을 수 없고,
그 사이에 사용자들은 MongoDB ObjectID 가 노출된 컨텐츠 URL 을 여기 저기 붙여댈 꺼다.
그 링크들을 디비 이사시키면서 죽이는 건 너무 아깝다.

바보야, 제 3 의 디비로 이사갈 때 MySQL ID, MongoDB ID 를 모두 몰고 다니렴. 아하!

레코드 스키마가 가변이닌까 계승이 있는 클래스 모델 디비에 매핑하긴 좋겠다.
RDB ORM 은 항상 이거때문에 고민하잔나.
디비는 점점 카오틱해지겠지만. =,=

Hadoop 동물책은 망작이었던 반면, Oreilly MongoDB The Definitive Guide, 쉽게 잘 썼다.

넌 니가 이해할 수 있으면 수작, 어려우면 망작이라고 하는 구나. 응.

MongoDB The Definitive Guide 는 MongoDB 쓰지 않을 사람도, MySQL 을 앞으로 수천 년간 쓸 사람도 읽어두면 좋을 것 같다.
다중 머신 디비를 구축하기 위해 어떤 고민들을 했는지 잘 느껴짐.
곧 번역본도 나온다던데.

캐주얼하게 디비를 쓰려는 사람이 MongoDB 를 배워쓰면 좋을까 MySQL 이 좋을까 할때 MongoDB 쪽이 나을 것 같다.
SQL / NoSQL 문제가 아니다. MySQL 이 너무 지저분한 문제다.
MongoDB 동물책은 200 페이지로 끝.

MySQL 오피셜 레퍼런스 4000 페이지.
근데 먼일 터질 때마다 꼭 이 책을 열어봐야한다.
1000 페이지 안 쪽의 왜래 저자 책들은 항상 내용 부족. =,=;

요즘 디비들에 좌표 인덱싱 기능 추가되는 것이 유행인 듯 한데 MongoDB 에도 들어있다.
X, Y 근처에 있는 뭐뭐뭐들을 가까운 순으로 찾아주세요. 하면 뿅~ 튀어나옴.

몽고디비는 Join 기능을 지원 안 한다.
해법은, 엔터티가 아닌 부모에 종속된 테이블은 부모에 네스팅 해버림 ^^,
아니면 넣을 때 대충 디노멀라이제이션 해서 ^^,
이것도 안 되면 수작업 조인
또는 몽고용 도메인 프레임웍이용.

글에 대한 코멘트 들을 글에 네스팅해서 저장할 때
전체 글에서 최근 코멘트를 찾거나 사용자 별도 코멘트를 뽑을 수 있도록
레코드에 네스팅된 어레이에 인덱스를 세울 수 있다.

헉 벌써 1 시 반 @.@; 교실베네 하교해야겠다. @.@

검색 기능을 어플리케이션 밖으로 뽑아내면 시원할 것 같다.
마침 봄에 나온 Sphinx 동물책 읽기 시작.
지금 사용하고 있는 Lucene 으로 외부 프로세스 구현할지 Sphinx 냅다 쓸지.

사람들은 JavaScript 가 얼마나 끔찍한 언어인지에 무감각해진 것 같다.

미국 이사간 주민들이 자주사용하는 Craigslist가 MongoDB로 이사가는데 재미난 코멘트.
"MySQL읽는 것보다 더 빠르게 MongoDB에 쓸 수 있었다."
NoSQL들이 리딩이 좀 느리지만 쓰기가 무척 빠른데 대한 말인듯.

느리지만 대신 리딩이 왕창 몰려도 산술급수적으로 부하가 증가합니다.
MySQL 은 어느 한계 시점에서 리딩 불가에 빠짐.

내년 초까지 예정되어 있는 MongoDB 새 책들은 3 종.
in Action 시리즈라던가, Developer's Library 시리즈라던가.
책이 부족할 일은 없을 듯.

MongoDB 에서 $keyf, $where, map/reduce 등의 작업을 기술할 때 JavaScript 펑션을 쓰는데
이 펑션은 서버에 전달되서 실행되는 것 같다.
MongoDB 서버는 JavaScript 를 실행할 수 있다.

db.system.js 컬렉션에 자바스크립트를 등록해 두고 쓸 수도 있다. Stored Procedure 처럼.

스프링에서 몽고 디비 지원하는 Spring Data 가 나옴.
문서 봤더니 양이 또 엄청나다.
Node.js 로의 탈출이 성공했으면.

MongoDB 에서 명령 실행은 결국 모두 쿼리를 던지는 방식에 의해 구현된다.
쌩뚱맞은 명령은 $cmd 컬렉션에 도큐먼트를 던진다는 설정.

MongoDB 에 Capped Collection 이란 것이 있는데 초반부터 크기 제한을 거는 컬렉션.
넘치면 오래된 도큐먼트부터 자동 삭제.
빠른 속도의 쓰기, 읽기가 장점.
로깅하는데 쓰면 무념무상.

MongoDB 에 GridFS 따라오는데 몽고 클라우드에 파일 집어 넣는 것.
명령행에서 mongofiles put foo.txt / mongofiles list / mongofiles get foo.txt.
언어별 API 도 쓰기 간단.

JavaScript 가 Browser 에서 App Server, DB Server 에 까지 감염될 줄은. =,=

MongoDB 는 기본적으로 사용자 인증 없이 돈다.
--bind_ip localhost 인자로 로컬에서만 접속하도록 기본적인 방어를 하던지, 파이어월 세팅하는 것이 편하겠다.

MongoDB 완벽한 온라인 백업은 지원 안 한다.
서버 죽이던지, 전체 롹 걸고 백업하던지.
권장되는 방법은 리플리케이션 슬레이브 서버 세팅한 한 후 슬레이브를 백업하는 것.

몽고가 마스터/슬레이브 모드로 동작할 때는 기본 데이터 외에 오퍼레이션 로그를 기록하는데
슬레이브가 기본 데이터를 다 복사하기 전에 오퍼레이션 로그가 넘치면 싱크가 실패한다. =o=
맘 편하게 만들었다. 지만 이해된다.

싱크가 완벽히 이루어진 후에도 슬래이브에 딴짓을 오래해서 마스터의 오퍼레이션 로그가 넘치면 또 싱크가 깨진다.
그러니, 슬레이브에 먼가 할 때는 잽싸게.
오피 로그 컬렉션 크기는 지정할 수 있다.

몽고 디비의 데이터 복구란, 확인되는 모든 도큐먼트를 새 파일에 넣고 기존 파일 교체하는 것.
즉, 걍 무식한 복사다. 시간도 무진장 오래 걸리겠지. 만,
이건 동물책 얘기고 책 나온 후 1.8 에 로깅 기능 들었가다고 하니 다시 확인해야 봐야.

기존에 테이블 3 개로 꾸리던 게시판을 (글줄 목록, 글, 첨부 파일) 도큐먼트 디비에 넣으면
컬렉션 1 개로 땡칠 수 있군. =o=

리플리케이션 설정은 더 간단할 수가 없다 정도로 간단.
서버 띄울 때 인자 한 두개 더 붙여주면 된다.

Sharding 은 당분간 쓸일 없을 것이니 패스. ^^

총평, NoSQL, 클라우드 개념들을 빼더라도 서버가 세련되게 만들어졌다.
NoSQL 이 좋아서라기 보다 MySQL 이 너무 지저분해서 몽고 한번 써볼 예정.
