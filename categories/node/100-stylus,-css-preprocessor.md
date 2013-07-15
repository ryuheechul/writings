Stylus, CSS Preprocessor
2011-05-31 17:14

### Stylus

CSS 를 직접 치다보면 중복 수식이 많이 발생해서 뭐하나 고치려면 한군데서 되질 않습니다.
이런 문제를 해결하기 위해 CSS 전처리기를 사용하는데
좀 강력한 문법으로 기술한 파일에서 CSS 파일을 생성해 줍니다.

Stylus 는 node.js + Express  환경에서 사용할 수 있는 CSS 전처리기입니다.
뭐하는 놈인지는 아래 사이트 첫 페이지 보시면 대번에 느낌이 오실겁니다.
<http://learnboost.github.com/stylus/>

설치는 항상 그렇듯이 아래와 같이.

	npm install stylus

개인적으로는 node 기반 웹서버 구축에 필수적인 모듈이라 생각하진 않지만 구색을 위해 적어 놓습니다.

### 시나리오

코멘드라인에서 `stylus` 코멘드를 바로 실행해서 `*.styl` 파일을 `*.css` 로 바꿀 수도 있지만 
개발시 이렇게 쓰는 분은 거의 없을 것이니 패스하고 express 에 연결해서 쓰는 법만 기술합니다. 

스타일러스 소스는 프로젝트의 `/stylus/css` 에 자동 생성되는 `*.css` 들은 `/public/css` 에 담을 겁니다.

개발자는 `/stylus/css/default.styl` 을 편집하고
브라우저에서 `http://localhost:3000/css/default.css` 를 부르게 됩니다. 
`*.styl` 을 수정하면 `*.css` 는 다음 리퀘스트 때 자동갱신됩니다.

### Code

	var stylus = require('stylus')
	
	app.configure(function() {
		...
		app.use(stylus.middleware({src: __dirname + "/stylus", dest: __dirname + '/public'}))
		app.use(express.static(__dirname + '/public'))
	})

express 어플리케이션 미들웨어 세팅하는데 스타일러스 미들웨어를 낑궈줍니다.
스터틱 파일 서비스 미들웨어 바로 위에. 간단하지요?

상식같아서는 `*.styl` 를 `/stylus` 에 `*.css` 를 `/public/css` 에 지정하면 될 것 같은데,
무슨 이유인지 현재는 두 디렉토리가 완전히 미러처럼 되어있어야 합니다. (개발자들 이것 때문에 옥신각신 하는 중)
나중에 수정될지 모르겠지만, 당장은 제가 세팅한 것 처럼 쓰시는 것이 좋을 것 같습니다.
안 그러면 CSS 파일은 엉뚱한 곳에 생성되고, HTTP 는 자기대로 에러 내면서 엉키더군요.

