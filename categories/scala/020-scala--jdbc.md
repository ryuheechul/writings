Scala + JDBC

아래 페이지 보고 영감을 얻어 노가다 하기 편하게 Scala JDBC 헬퍼를 만들어 봤습니다.
<http://scala.sygneca.com/code/simplifying-jdbc>

첫 부분은 사용 예제이고, 소스 코드는 더 아래 있습니다.
아주 가볍고, 아주 간편하고, 아주 유연합니다. 게다가 이쁘기까지.
코딩중에 코드 컴플리션 모두 되고요.

사용 예

	import SQLHelper._

	initDataSource("jdbc:h2:tcp://localhost:9092/test;IFEXISTS=TRUE;FILE_LOCK=SOCKET", "sa", "sa")

	connection {conn =>

		val insertSql = conn << "insert into t1(name, code, cdate, flag) values(?, ?, ?, ?)"
				<< "user1" << 101 << new DateTime << true

		val insertId = insertSql.executeInsert
		println(insertId)

		val insertId2 = (insertSql << "user2" << 202 << new DateTime << false).executeInsert
		println(insertId2)

		val count = (conn << "select count(*) from t1").executeLong.toInt
		println(count)

		val userName = (conn << "select name from t1 limit 1").executeString
		println(userName)

		val selectSql = conn << "select id, name, code, cdate from t1"

		selectSql.executeQuery { r =>
			println("id: " + r.getInt("id"))
			println("name: " + r.getString("name"))
			println("code: " + r.getInt("code"))
			println("cdate: " + new DateTime(r.getTimestamp("cdate").getTime))
			println
		}

		selectSql.executeList { r =>
			new {
				val id: Int = r
				val name: String = r
				val code: Int = r
				val cdate: DateTime = r
			}
		} foreach { obj =>
			println("id: " + obj.id)
			println("name: " + obj.name)
			println("code: " + obj.code)
			println("cdate: " + obj.cdate)
			println
		}

		(conn << "update t1 set name = ? where id = 3" << "newName").executeUpdate
	}

헬퍼 코드

	import org.joda.time.DateTime
	import org.joda.time.format.DateTimeFormat
	import collection.mutable.ListBuffer

	object SQLHelper {
		var dataSource: org.h2.jdbcx.JdbcConnectionPool = _

		def initDataSource(connString: String, user: String, password: String) =
			dataSource = org.h2.jdbcx.JdbcConnectionPool.create(connString, user, password)

		def connection(f: RichConnection => Unit) {
			val conn = new RichConnection(dataSource.getConnection)
			try {f(conn)} finally {conn.close}
		}

		class RichConnection(val conn: java.sql.Connection) {
			def <<(sql: String) = new RichPreparedStatement(conn.prepareStatement(sql))
		}

		implicit def richConnUnwrap(rich: RichConnection): java.sql.Connection = rich.conn

		class RichResultSet(val r: java.sql.ResultSet) {
			var pos = 0

			def apply(i: Int) = {pos = i - 1; this}
			def nextBoolean: Boolean = {pos += 1; r.getBoolean(pos)}
			def nextByte: Byte = {pos += 1; r.getByte(pos)}
			def nextInt: Int = {pos += 1; r.getInt(pos)}
			def nextLong: Long = {pos += 1; r.getLong(pos)}
			def nextFloat: Float = {pos += 1; r.getFloat(pos)}
			def nextDouble: Double = {pos += 1; r.getDouble(pos)}
			def nextString: String = {pos += 1; r.getString(pos)}
			def nextDate: DateTime = {pos += 1; new DateTime(r.getTimestamp(pos).getTime)}
			def foldLeft[X](init: X)(f: (RichResultSet, X) => X): X = r.next match {
				case false => init
				case true => foldLeft(f(this, init))(f)
			}
			def next = { pos = 0; r.next }
		}
		implicit def rrs2boolean(r: RichResultSet) = r.nextBoolean
		implicit def rrs2byte(r: RichResultSet) = r.nextByte
		implicit def rrs2int(r: RichResultSet) = r.nextInt
		implicit def rrs2long(r: RichResultSet) = r.nextLong
		implicit def rrs2float(r: RichResultSet) = r.nextFloat
		implicit def rrs2double(r: RichResultSet) = r.nextDouble
		implicit def rrs2string(r: RichResultSet) = r.nextString
		implicit def rrs2date(r: RichResultSet) = r.nextDate
		implicit def rrsUnwrap(rich: RichResultSet) = rich.r

		class RichPreparedStatement(val s: java.sql.PreparedStatement) {
			var pos = 0

			def <<(value: Boolean) = {pos += 1; s.setBoolean(pos, value); this}
			def <<(value: Byte) = {pos += 1; s.setByte(pos, value); this}
			def <<(value: Int) = {pos += 1; s.setInt(pos, value); this}
			def <<(value: Long) = {pos += 1; s.setLong(pos, value); this}
			def <<(value: Float) = {pos += 1; s.setFloat(pos, value); this}
			def <<(value: Double) = {pos += 1; s.setDouble(pos, value); this}
			def <<(value: String) = {pos += 1; s.setString(pos, value); this}
			def <<(value: DateTime) = {pos += 1; s.setTimestamp(pos, new java.sql.Timestamp(value.getMillis)); this}

			def executeQuery(f: RichResultSet => Unit) = {
				pos = 0
				val r = new RichResultSet(s.executeQuery)
				try { while (r.next) f(r) } finally { r.close }
			}

			def executeList[X](f: RichResultSet => X): List[X] = {
				pos = 0
				val r = new RichResultSet(s.executeQuery)
				val buf = ListBuffer[X]()
				try { while (r.next) buf append f(r); buf.toList } finally { r.close }
			}

			def executeScalar: AnyRef = {
				pos = 0
				val r = s.executeQuery
				try { if (r.next) r.getObject(1) else error("failed to get query result") } finally { r.close }
			}

			def executeLong: Long = executeScalar.asInstanceOf[Long]

			def executeString: String = executeScalar.asInstanceOf[String]

			def executeInsert: Int = {
				pos = 0
				s.executeUpdate
				val r = s.getGeneratedKeys
				try { if (r.next) r.getInt(1) else throw error("failed to get generated keys") } finally { r.close }
			}

			def executeUpdate: Int = {
				pos = 0
				s.executeUpdate
			}
		}
		implicit def rpsUnwrap(rich: RichPreparedStatement) = rich.s

	}

