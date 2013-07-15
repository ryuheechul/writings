HSQLDB
drypot 2010-11-28 17:43
2009.09.30

자바 디비 3 종이 SQL 표준을 매우 잘 준수해서,
다른 상용 디비에 비해 문법이 꽤 그럴듯하고 서로 문법 호환이 잘 됨.
둘다 표준 지원이 잘 되서, HSQL 문서 보는데 Derby 하고 문법이 거의 같음.

특히 Date/Time 쪽은 너무나 상식적으로 잘 지원해서,
MS SQL 쓸때 항상 욕나왔던 문제들이 그냥 없다는. =,=

데이터형 지원은 HSQLDB 가 좋은 것 같음.

jar 파일이 딱 하나만 따라와서 진짜 암 생각 없어짐.

Ctrl-C 누르니 종료 처리 안하고 확 죽어버림. =,=
적당이 셧다운 정리를 좀 하지. =,=
이 소리는 디비 따로 셧다운 안 하고 운영체제 부팅하면 로그 정리 안 된다는 애기. =,=

H2 는 디렉토리 싹 정리하고 죽더만.

Log 를 디스크에 싱크하는 주기를 설정할 수가 있음, 디폴트 20 초.
마지막 싱크후 다음 싱크까지 커밋된 데이터 날라갈 수도 있다는 건데, 모 이정도 쯤은. =,=
Edit
drypot 2010-11-28 17:45
2009.10.01

Derby 는 스토어드 프로시저를 SQL 로 만드는게 아니고
jar 파일 안에 있는 스터틱 메서드를 SQL 에서 호출할 수 있도록 연결만 해주는 정도 였는데,
HSQLDB 는 기본적인 SQL 스트럭쳐드 구분을 쓸 수 있음.

전반적으로 HSQL 이 더 좋은 것 같다. =o=
Edit
drypot 2010-11-28 17:47
package fa

import groovy.sql.Sql
import org.hsqldb.jdbc.JDBCDataSource
import org.hsqldb.persist.HsqlProperties
import org.hsqldb.server.ServerConstants
import org.hsqldb.server.ServerProperties
import org.hsqldb.server.Server

def p = new HsqlProperties()
p.setProperty("server.database.0", "file:c:\\app\\sleek-java\\hsqldb\\sleek")
p.setProperty("server.dbname.0", "sleek")
p.setProperty("server.address", "localhost") // 0.0.0.0
//p.setPorperty("server.port", "9001")

def server = new Server()
server.setProperties(p)

//server.setLogWriter(null) // can use custom writer
//server.setErrWriter(null) // can use custom writer

Runtime.runtime.addShutdownHook {
	println "ShutdownHook invoked"
	if (server.state == ServerConstants.SERVER_STATE_ONLINE) {
		//server.shutdown()
		def sql = new Sql(new org.hsqldb.jdbc.JDBCDataSource(database:"jdbc:hsqldb:hsql://localhost/sleek",
                                          user:"sa", password:""))
		sql.execute "shutdown"
	}
}

server.start()

Ctrl-C 누르면 로그 저장 안 하고 죽어 버리는 게 께름직하여 그루비로 간단 스텁 만들어봤음.
server.properties 환경설정 파일도 불필요해졌음. 다 그루비 안에 다가.

근디 server.shutdown() 바로 부르면 로그 저장을 안 하는 거 같음. =,=
무식하게 JDBC 로 접속해서 죽으라고 함. =,=
Edit
drypot 2010-11-28 17:48
2009.10.01

얘도 메모리 할당을 서버 전체 사용양 지정하는게 아니고, 디비 별로 하는데,
그것도 총 몇 페이지 케슁할까 하는게 아니고 총 몇 Row 케슁할까로 지정함, =,=

온라인 백업 되는데, 백업 와중에 전체 기능 중지, =o=

SQL Server 그냥 쓸까. =,=