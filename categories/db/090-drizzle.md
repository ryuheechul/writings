Drizzle
drypot 2011-05-17 19:10
올 봄에 첫 GA 가 릴리즈 되었군요.
생각보다 빨리 나왔습니다. =o=
간단히 소개 읽다가 몇 줄 옮깁니다.

*

http://drizzle.org/

2008 년, Sun Microsystems engineer Brian "Krow" Aker 에 의해 MySQL 6.0 에서 포크되었다.
목표는 클라우드 컴퓨팅과 웹 어플리케이션에 MySQL 을 최적화 하기 위함. 빠르고, 쓰기 쉽게.
MySQL 6.0 브랜치는 이후 취소됨.

현재는 우분투, 구글, Rackspace 의 엔지니어들이 개발중.

Drizzle is optimized for massively concurrent environments.

C++ 로 만들었고 코드를 근대화하였다.

윈도우 지원은 삭제되었다.

초기 기동시 scripts/mysql_install_db 가 필요 없어졌다.
걍 동작하도록 되었다.

Drizzle port (4427), MySQL port (3306) 가 있어 다중 프로토콜을 지원하나 Drizzle  프로토콜은 미구현이다.
고로, 클라이언트 쪽에서 보기는 MySQL 처럼 보인다.

Storage Engine API 도 변경되어서 기존 엔진들의 포팅이 필요하다.
현재는 기본으로 InnoDB 쓰고 있는 듯.

MySQL 의 Stored Procedure 엔진은 별로여서 포팅 안 했다.
고로 SP 는 아직 지원 안 된다.

트리거를 지원하지 않는다.

admin 코멘드가 없다.
mysqladmin 같은 것은 이제 없다.

기본으로 따라오던 잡동사니 스토리지 엔진들이 삭제되었고,
MyISAM 은 임시 테이블 용으로만 사용할 수 있다.
ARCHIVE is fully supported
PBXT is merged

FRM 파일이 사라졌다.
메타 데이터는 엔진들이 각자 알아서.

mysql 스키마가 사라졌다.

charset 에 관한 모든 지저분한 것들이 사라졌다. 모든 것은 UTF8.

정수 관련 타입들이 대통합되었고,
BLOB 도, TEXT 관련 타입들로 하나로 대통합되었다.

GEOMETRY 타입도 사라졌다. 필요하면 포스트그래스로 가라고 한다. =,=

날짜, 시간 관련 지저분한 타입들도 사라졌다.

Fulltext 인덱스 기능도 빠졌다. 필요하면 Lucene, Sphinx, or Solr 등을 써라.

우부투 설치 패키지를 지원한다.