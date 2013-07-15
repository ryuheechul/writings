Scala 웹 프레임웍 작성기
drypot 2010-11-28 19:46
2010.04.08

스칼라로 웹 처리 기본 라이브러리 만들고 있습니다.
매우 독특하고 흥미진진한 언어라 기쁨 충만.

타입 언어라 컴파일러가 잔 오류 쫙 정리해주기는 하는데
언어에 기능이 많고 + 비약/축약 기능이 또한 매우 많아서 읽기 어려운 코드가 생산되기 쉽네요.

자바는 너무 너저분하고 코드양이 많아져서 되서 읽기 벅찬데 스칼라는 코드가 수학 공식처럼 바뀌는 경우가 많습니다.
전에 Lift 코드 볼때 황당했는데, 이쪽 문화가 이런거 같습니다.
조금씩 적응되거 가는 중.

아래 예는 URL 인자들 Map 에 정리해 넣는 간단 메서드인데,
자바 문화에서는 있을 수 없는 기호를 많이 쓰게 됩니다.

def += (kv: (String, String)) {
	params.get(kv._1) match {
		case Some(l) => l += kv._2
		case None => params += kv._1 -> (new ListBuffer[String] += kv._2)
	}
}

언어 만든 사람이 자료구조 메니아라, =,=
기본 라이브러리에서 파싱/자료구조 관련 빼고 나면 거의 딴건 없습니다. (사실 좀 있긴 하지만)  =,=

진짜 컬렉션 라이브러리 하나는 빵빵... 하다기 보다 매우 복잡합니다.. =o=
이 아저씨 관심이 병렬처리에도 가 있어서 병렬처리 쪽 조금하고.

Groovy 처럼 일상 생활용 잡다 구리 라이브러리... 전혀 없습니다. =o=
컬렉션 라이브러리만 한가득.

이 아저씨 컬렉션 라이브러리 만들어 논거 보면,
이게 쉬운 일이 아니란 생각 + 자바 기본 라이브러리들은 완전 날림이란 생각이 같이 듭니다. =,=

JDBC 도우미 수식들은 며칠전에 완료했고 매우 맘에 들고 있습니다.
스칼라가 이런 특정 도메인 작업 간단하게 축약해서 언어 환경을 개선하는데 아주 특출난 것 같습니다.
거의 기본 언어 로컬 요구사항에 맞게 고쳐가면서 쓰는 느낌이 듭니다.
이러니 사용하는 하우스에 따라서 매우 다른 스칼라 문화가 발생할 겁니다. =,=

Scalate 도 대충 테스트 해보니 잘 붙고 있습니다.
Scalate 덕에 템플릿엔진 걱정은 싹 없어졌고,
위에 나열한 스칼라 특징때문에 스칼레이트도 언어 수준에서 아주 꽉꽉 잘 붙고 있습니다.
어떻게 보면 다이나믹 언어들보다 결합력이 훨씬 좋은지도 모르겠습니다.

스칼라 만든 아저씨가 참 해박해서 언어설명책 보다보면 별거 별거 알게 되는데,
다이나믹 언어 쓸 때는 걍 암 생각 없이 썼을 것을,
이건 수학적으로 불가능한 경우이니 이런건 사전에 막아야한다.. 이런식이 좀 있어서,
아예 몰랐으면 고민 안 했을 것을, 괜히 알아서 고민하는 것들이 생겼습니다.. =,=

아래 짤방들은, 이것 저것 테스트하느라 작년부터 다양한 버전으로 만든 URL 라우팅 수식입니다.
대충 쭉 보시면 각 환경마다 분위기가 많이 다른 것을 느끼실 수 있을 것 같네요.

*
첫 짤방은 Scala 로 쓴 가장 최근 버전인데 언어 기본 기능인 패턴 매칭을 사용하고 있습니다.
보시면 왠만한 웹 전용 프레임웍보다 수식이 더 깔끔합니다. =,=

pillar.pathTokens match {
	case List("post") => c("Post", "list")
	case List("post", postId) if postId.isDigit => params += "postId" -> postId; c("Post", "view")
	case List("post", action) => c("Post", action)
	case List("post", action, postId) if postId.isDigit => params += "postId" -> postId; c("Post", action)
	case List("view") => c("View", "index")
	case List() => c("Home", "index")
	case _ => null
}

*
ASP.NET MVC / F#

static member RegisterRoutes (routes:RouteCollection) =
    let rtadd rtname url def ct = routes.Add(rtname, new LcRoute (url, new MvcRouteHandler (), Defaults = def, Constraints = ct))
    routes.IgnoreRoute ("{resource}.axd/{*pathinfo}")
    rtadd "post/read" "post/{tid}"          (rvd [| ("controller", "post"); ("action", "read");  ("tid", ""); |]) (rvd [| ("tid", @"\d+") |])
    rtadd "post/*"    "post/{action}/{tid}" (rvd [| ("controller", "post"); ("action", "index"); ("tid", ""); |]) null
    rtadd "home"      ""                    (rvd [| ("controller", "home"); ("action", "index"); |])             null
    rtadd "home/*"    "home/{action}"       (rvd [| ("controller", "home"); ("action", "index"); ("id", ""); |]) null

*
ASP.NET MVC / C#

private static void RegisterRoutes(RouteCollection routes) {
	routes.IgnoreRoute("{resource}.axd/{*pathinfo}");
	routes.MapRouteLc("post/read", "post/{tid}", new { controller = "post", action = "read", tid = "" }, new { tid = @"\d+" });
	routes.MapRouteLc("post/*", "post/{action}/{tid}", new { controller = "post", action = "index", tid = "" });
	routes.MapRouteLc("home", "", new { controller = "home", action = "index" });
	routes.MapRouteLc("home/*", "home/{action}", new { controller = "home", action = "index", id = "" });
}


*
Grails

static mappings = {
	"/post" {
		controller = "post"
		action = "list"
	}
	"/post/$postThread" {
		controller = "post"
		action = "read"
		constraints {
			postThread (matches:/\d+/)
		}
	}
	"/post/$action/$postThread?/$post?" {
		controller = "post"
	}
	"/" {
		controller = "home"
		action = "index"
	}
	"/$action" {
		controller = "home"
	}
	"/$controller/$action" {
	}
	"500"(view:'/error')
}

*
Groovy 수작업

switch (token[0]) {
	case "post":
		switch (token[1]) {
			case null:
				view = loadView("post", "list", param);
				break
			case ~/^\d+$/:
				view = loadView("post", "read", param)
				param.postThreadId = token[1].toInteger()
				break
			default:
				view = loadView("post", token[1], param)
				if (token[2]) param.postThreadId = token[2].toInteger()
				if (token[3]) param.postId = token[3].toInteger()
				break
		}
		break

	case "search":
		view = loadView("search", "index", param)
		break
	default:
		view = loadView(token[0] ?: "home", token[1] ?: "index", param)
		break
	}
}
Edit
drypot 2010-11-28 19:48
2010.04.14

쓰면 쓸 수록 Scala 는 참 좋은 언어 같습니다.

클래스 컨스트럭터가 아래 처럼 클래스 머리에 붙어있는데
처음에는 + 책 읽는 동안은 이게 뭐병... 이랬는데, 실제 쓰다보니 너무 직관적입니다.

오브젝트 필드 초기화가 위에서 부터 차례대로 내려오니
변수가 모두 상수화 되서 정의될 수가 있습니다. (실제로 상수는 없지만, 어쨌든 변하지 않는 변수로)

C#, Java 등에서는 오브젝트 초기화하려면 필드 봤다가 컨스트럭터 봤다가
lazy 필드도 없으니 초기화 순서 어떻게 되는지 모든 경우마다 신경쓰고 해야하는데,
스칼라에서는 그럴일이 엄청나게 줄어듭니다.

예전에 베이직에서 goto 로 프로그래밍 하다가 파스칼 처음 썼을 때
머리가 깨끗해지는, 그때와 비슷한 느낌을 받고 있습니다.
주류 OO 언어들은 왜 이런 생각을 하지 못했을까요.

class PostRack(http: Http) extends Rack(http) {
        val post = new PostDomain(this)
        val session = new HttpSession(http)
        ...

그리고 Groovy 도 코드량 줄여주는 것이 장난 아니였는데 Scala 가 더 심해보입니다.
코드가 더 압축되고 있습니다.
타입 언어가 이렇게 할 수 있다는 것이 참 신기하고 +
주술 처럼 적어도 인텔리센스 칼 같이 동작하니 때마다 IDEA 만든 사람들도 대단해 보입니다.

스칼라 기본 문화에서 배우는 점들도 있어서
다른 언어에서 구축했던 것 보다 먼가 모듈들이 짜임새 있어지는 것 같습니다.
무엇보다 스칼라가 노가다를 줄여주니 노가다 걱정 없이 원하는 모듈을 원하는 위치에 놓을 수 있습니다.
자바나 C#에서 이리 하면 손가락에 난리났을 겁니다.

예로 Grails 만 하더라도 자주 쓰는 변수에 편하게 접근하기 위해서
주요 오브젝트가 모두 컨스트럭터에 달라 붙습니다.
모듈 구분하자니 손가락이 고생이고, 손가락 편하게 하자니 프로젝트가 떡덩어리가 됩니다. =o=

스칼라는 오브젝트의 필드를 임포트 할 수가 있습니다.

import myVeryMajorVIPObject._

그리고 implicity converter 가 오브젝트 타입 변환을 자동으로 해줘서
캐스팅 역할하는 코드가 대폭 줄어듭니다.

아직은 하루에 몇 시간씩 삽질하는 사건이 벌어지긴 하는데,
제가 잘 못랐던 부분들 때문에 그렇고,
익숙해지면서 점점 속도 붙고 있습니다.

Scalate 도 감동입니다. 잘 작동합니다.
물론 에러 한번 뜨면 덤프 장난아니지만, 소스 코드는 진짜 이쁩니다.
여태까지 템플릿 언어의 문제점 ( 속도 문제 + 타입 보존 문제 + 마스터 파일 문제 ) 이 일소 됩니다.

아래 짤방은 슬릭 마스터 레이아웃을 Haml 로 코딩한 것.
출력 결과도 아주 이쁨.

!!! 5
-@ import var rack: fa.app.rack.PostRack
-@ var body: String
%head
	- render("layout/header_.scaml")
%body
	.site-t
		%a(href="/") Sleek
		- if (auth.logged)
			.search-form.cmd
				%form(action="/search" method="get")
					%input(type="text" name="q" value={http.params("q")} class="tb" max="512")
					%input(type="submit" value="검색" class="submit")

	#menu-p
		%ul.menu.blk-link
			- for (category <- session.categories)
				- if (category.categoryId > 0)
					%li<
						- if (category.categoryId == post.categoryId)
							%a(href={url.postList(category.categoryId)} class="current")><
								= category.desc
						- else
							%a(href={url.postList(category.categoryId)})><
								= category.desc
				- else
					%li.sep
	#main-p
		!= body
	%script(type="text/javascript") $(function() { $("#menu-p").attachVerticalMover() })