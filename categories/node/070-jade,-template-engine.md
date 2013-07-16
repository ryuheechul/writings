# Jade, Template Engine

2011-05-26 18:04

### Jade

<http://jade-lang.com>

Jade 는 Jade 소스 파일과 인자를 받아 HTML 을 생성하는 Template Engine 입니다.
Ruby 커뮤니티에서 히트쳤던 Haml 과 문법이 비슷합니다.
태그 앞에 % 마저 빼버렸다는 것이 특징.

### Code

	!!! 5
	html(lang="en")
		head
			title= pageTitle
			script(type='text/javascript')
				if (foo) {
					bar()
				}
		body
			h1 Jade - node template engine
			#container
				- if (youAreUsingJade)
					p You are amazing
				- else
					p Get on it
	
	*

jade 사이트 첫 화면에 있는 코드입니다.
jade 코드는 닫는 태그를 기술하지 않습니다.
닫는 태그 기능을 인덴테이션으로 대신하기 때문에 인덴테이션을 정확하게 입력하셔야 합니다.

### Code 설명

	!!! 5

html5 DOCTYPE 을 나타냅니다.
복잡한 다른 DOCTYPE 들도 느낌표 세개와 옵션 스트링으로 나타낼 수 있습니다.

	html(lang="en")

html 태그를 나타냅니다.
태그의 어트리뷰트를 어떻게 기술하는지도 보여줍니다.

	title= pageTitle

title 태그를 나타냅니다.
태그에 연이여 '=' 기호가 나올 경우 태그의 바디를 자바스크립트 수식의 결과로 채웁니다.
여기서 `pageTitle` 은 자바스크립트 변수입니다.

	script(type='text/javascript')

클라이언트 사이드 자바스크립트 블럭을 나타냅니다.
이 블럭의 자바스크립트는 브라우저로 전달되 실행됩니다.

	h1 Jade - node template engine

태그 이름 뒤에 바로 공백이 나올 때는 이어지는 텍스트가 태그의 바디에 그대로 들어갑니다.
 
	#container

'#' 기호로 태그의 `id` 어트리뷰트를 지정할 수 있습니다.
태그 이름 없이 '#' 이 바로 나올 경우 `div` 태그가 잠정 사용됩니다.

	- if (youAreUsingJade)

'-' 기호는 node 에 의해 실행되는 서버 사이드 자바스크립트 행을 나타냅니다.

Jade 의 기타 구문들을 살펴보면,

	div#container : <div id="container"></div>
	
	div.user-details : <div class="user-details"></div>
	
	div#foo.bar.baz : <div id="foo" class="bar baz"></div>
	
	p wahoo! : <p>wahoo!</p>

Express 에서 render 펑션 옵션으로 다음을 전달했을 경우 `{ locals: { name: 'tj' }}`
자바 변수를 텍스트 사이에 표시하려면 다음과 같이 기술합니다.
이때 `name` 값은 HTML Escaping 처리를 당하는데 있는 그대로 출력하려면 `#` 대신 `!` 를 사용합니다.

	p hello #{name} : <p>hello tj</p>

긴 텍스트 블럭을 감쌀 경우 태그 이름 뒤에 '.' 을 붙여 줍니다.

HTML 코멘트는 '//' 기호로 표시하는데 아예 출력을 원하지 않을 경우 '//-' 기호를 사용합니다.

	// : <!--  -->

	/if IE : <!--[if IE]><![endif]-->

Jade 수식을 연달아 쓰고 싶을 경우 ':' 으로 구분합니다.
예로 다음 두 식은 결과 같습니다.

	li.first
		a(href='#') foo
	
	li.first: a(href='#') foo

'checked' 같은 boolean attribute 들은 연결된 값이 true 일 경우만 출력됩니다.

	input(type="checkbox", checked: someValue)

`!!! 5` 는 html5 DOCTYPE 을 나타내는데 `!!!` 다음에 나올 수 있는 옵션들은 아래와 같습니다.

	5 : <!DOCTYPE html>
	xml : <?xml version="1.0" encoding="utf-8" ?>
	default : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	transitional : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	strict : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
	frameset : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
	1.1 : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
	basic : <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML Basic 1.1//EN" "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd">
	mobile : <!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.2//EN" "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd">

태그 없이 자바 수식의 결과를 그대로 출력하려면 '=' 기호로 행을 시작합니다.
기본적으로 HTML Escaping 을 하는데 패스하려면 '!=' 기호를 사용합니다.

	= fooVar
	!= fooVar

'-' 기호로 자바스크립트 코드가 시작한다는 것에 예외가 있는데 'each' 문입니다.
each 는 자바스크립트 키워드는 아니지만 아래와 같이 사용할 수 있습니다.

	- var items = ["one", "two", "three"]
	- each item in items
		li= item
	
	- var obj = { foo: 'bar' }
	- each val, key in obj
		li #{key}: #{val}
		
