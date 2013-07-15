Scala Loop Profile
2010.04.09

각 구문의 실행 시간 비교.

	printElapsedTime {
		for(index <- 0 until Int.MaxValue) { }
	} // 44.9 초

	printElapsedTime {
		var i = 0
		while(i < Int.MaxValue) { i	+= 1 }
	} // 1.4 초

	for(index <- 0 until Int.MaxValue) { } == (0 until Int.MaxValue).foreach { index => ... }

***

	val m = mutable.Map.empty[Int, Int]
	(1 to 10000).foreach { it => m(it) = it }

	def dumb(k: Int, v: Int) = k + v

	printElapsedTime(10000) {
		for((k, v) <- m) { dumb(k, v) }
	} // 9461

	printElapsedTime(10000) {
		m.foreach{ kv =>  dumb(kv._1, kv._2) }
	} // 9295

	printElapsedTime(10000) {
		m.foreach{ case(k, v) =>  dumb(k, v) }
	} // 9861

***

	val s = "... big string ..."
	val repeat = 1000000

	def dumb(c: Char) = c

	printElapsedTime(repeat) {
		var i = 0
		while (i < s.length) { dumb(s.charAt(i)); i += 1 }
	} // 7,719

	printElapsedTime(repeat) {
		var i = 0
		val len = s.length
		while (i < len) { dumb(s.charAt(i)); i += 1 }
	} // 5,776

	printElapsedTime(repeat) {
		for (ch <- s) { dumb(ch) }
	} // 62,136

***

	val msg = "hi"
	val repeat = 300000000

	def dumb(i: Int) = if (i % 2 == 0) msg else null
	def dumb2(i: Int) = if (i % 2 == 0) Some(msg) else None

	def noop1(msg: String) {}
	def noop2 {}

	printElapsedTime(repeat) { r =>
		val s = dumb(r)
		if (s != null) noop1(s) else noop2
	} // 10,537

	printElapsedTime(repeat) { r =>
		val s = dumb(r)
		if (s == null) noop2 else noop1(s)
	} // 10,796

	printElapsedTime(repeat) { r =>
		dumb(r) match {
			case s: String => noop1(s)
			case null => noop2
		}
	} // 8,942
	printElapsedTime(repeat) { r =>
		dumb2(r) match {
			case Some(s) => noop1(s)
			case None => noop2
		}
	} // 10,473

***

	val repeat = 100000000
	def isEven(v: Int) = if (v % 2 == 0) "even" else null
	def isEvenOption(v: Int) = if (v % 2 == 0) Some("even") else None

	printElapsedTime(repeat) { r =>
		isEvenOption(r).getOrElse("oops")
	} // 4595

	printElapsedTime(repeat) { r =>
		isEven(r) match {
			case x: String => x
			case null => "oops"
		}
	} // 3057

	printElapsedTime(repeat) { r =>
		val x = isEven(r)
		if (x != null) x else "oops"
	} // 2877

