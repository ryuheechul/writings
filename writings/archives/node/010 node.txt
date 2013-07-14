Node
2011-05-25 14:20
 
### node

<http://nodejs.org>

웹브라우저에서 JavaScript 를 사용하는 것 처럼 node 는 서버 사이드에서 JavaScript 를 실행할 수 있게 해줍니다. node 의 공식명칭은 'Node' 입니다. 비공식적 명칭은 'Node.js' 입니다, 만 이게 더 많이 쓰이는 것 같군요. =,=. 2009 년에 Ryan Dahl 에 의해 만들어 졌습니다. 짧은 역사에도 불구하고 프로젝트의 미션이 확실하여 현재 꽤 훌륭한 수준에 올라와 있습니다. (또는 그 이상입니다) 

내장된 JavaScript Engine 은 Chrome 에 들어가는 V8 입니다. 빠릅니다. 현재 다이나믹 인터프리터 중에서는 제일 빠릅니다. Java 보다 4 배 느린 수준. 다른 인터프리터들이 Java 보다 30~50 배 느린 것과 차이가 있습니다. 

V8 엔진과 서버 프로그래밍에 필요한 기본적인 TCP, HTTP, IO. Process, Buffer 정도의 콤펙트한 라이브러리들이 결합되어 node Core 를 이룹니다. node Core 의 라이브러리들은 C++ 과 JavaScript 로 만들어져있습니다.

node 는 Python 과 다르게 배터리들 (파이선에서 말하는 서드파티 라이브러리들) 없이 작은 코어만 배포됩니다. 필요한 패키지들은 따로 받아 사용합니다. node 의 패키지 메니저는 npm 입니다. Python, Ruby 등에서 패키지 문제 때문에 골치를 많이 앓아서 그런지 npm 은 꽤 유연하게 동작하도록 만들어 졌습니다.

`app.js` 라는 자바 스크립트가 있을 때 다음 명령으로 이 파일을 실행시킬 수 있습니다.

	node app.js

### Non Blocking IO

node 가 JavaScript 를 사용할 수 있다는 것 외에 또 한가지 독특한 특징이 있는데 Pure Non-Blocknig-IO 방식의 라이브러리를 제공한다는 겁니다. 여태까지는 보통 Blocking-IO 를 사용했습니다. 무슨 소리냐면 OS Thread 를 한 50 개쯤 만들어 Thread Pool 을 구성하고, 들어오는 네트웍 Request 처리를 각 쓰레드에 넘겼습니다. Thread Pool 이 넘치면 다이나믹하게 추가를 하고요. 각 쓰레드에서는 파일을 읽거나, Respose 를 전송하는 IO 과정에서 자연스럽게 Block 현상이 발생합니다. 그럼 현재 실행되던 Thread 는 IO 가 완료될 때까지 대기 모드가 되고 실행권은 다른 Thread 로 옮겨 갑니다. 이런 일을 모두 OS 가 해줬죠.

OS Thread 를 사용하는 이 방식의 문제점은 1000 단위 이상의 동시 Request 가 들어올 때 이것을 처리하기 위한 동 수의 OS Thread 가 필요하다는 겁니다. Thread 가 처음 나왔을 때는 Process 에 비해 효율적이었기 때문에 크게 환영되었지만 엄청난 분량의 동시 처리를 해야하는 요즘은 Thread 마저도 감당하기 어려운 상황이 되어버렸습니다. Thread 당 스택을 할애하는데 2M 정도만 쓴다고 해도 양이 꽤 됩니다.

그래서, 이러한 수준이상의 동시 접속 요청을 효율적으로 처리하기 위해 한개의 Thread 만 운영하는 방법이 고안됩니다. 천 명이 접속하던 만 명이 접속하던 하나의 Thread 가 루프를 돌며 다 처리하기 때문에 동시 접속자가 늘어난다고 Thread Stack 이 추가로 필요하지도 않고, 잠들어 있는 OS Thread 를 무한히 스위칭하는 낭비도 없어지게 됩니다. 이 One Thread 방식 서버 구현이 가능하기 위해서 Non-Blocking-IO 가 필요합니다.

Blocking 방식은 File 이나 Network IO 를 OS 에 요청할 때 IO 가 완료될 때까지 해당 Thread 를 대기 모드로 돌렸다가 IO 가 완료되면 리턴합니다. Non-Blocking API 는 이와 다르게 IO 의 완료 여부와 상관없이 바로 리턴해서 유저 코드가 계속 실행되도록 합니다. 이때 유저 코드는 방금 요청한 IO 가 완료될 때까지 다른 사용자의 Request 를  처리할 수 있습니다. 얼핏 머릿속에 그림이 잘 안 떠오르고,  그게 그것 같기도 하지만 잘 보시면 원래 OS 가 하던 Thread 스위칭 작업을 일정부분 유저 코드로 끌고 올라왔다는 것을 아실 수 있습니다.

그럼, OS 가 잘 하던 것을 왜 어플리케이션 프로그래머가 직접하느냐, 위에서도 말했다 시피 이렇게 하면 수천 개의 잠자는 OS Thread 를 불필요하게 스위칭하는 부하가 사라지기 때문에 서버의 리퀘스트 처리속도가 초초 초고속이 되기 때문입니다. 그렇다면, 이런 좋은 방식을 Java, Ruby, Python 은 안 쓰고 있단 말이냐는 질문이 나올 수 있습니다. 물론 Java, Ruby, Python 도 맘만 먹으면 또는 이미 Non-Blocking 방식 API 들을 제공하고 있습니다. 문제는 Non-Blocking 서버가 가능하려면 프레임웍과  라이브러리들의 처음부터 끝까지 Non-Blocking API 를 써야하는데 고전 언어들에서는 Non-Blocking IO 가 기본이 아니였기 때문에 또 아직까지도 일선 개발자들이 Blocking IO 상식에 의거 코딩하고 있기 때문에 또 과거에 Blocking 상식으로 만들어진 고전 프레임웍 API 들이나 드라이버 때문에
Non-Blocking 방식을 전방위적으로 도입하기가 어려웠습니다.

nginx 보다는 apache 가 익숙하시죠? grizzly 보다는 tomcat 이 익숙하시죠? 찾아보시면 Java Grizzly, Ruby EventMachine, Python Tornado 같은 Non-Blocking 서버들이 이미 있습니다만 많이 사용되고 있지 못하거나 제대로 사용되고 있질 못합니다. Non-Blocking 스타일에서는 한 부분에서만 Block API 를 사용해도 전체 시스템이 Block 되니까요.

node 는 애초에 Non-Blocking 을 쓰자고 (또는 이것만 쓰자고) 시작된 프로젝트입니다. 기본 API 들이 모두 Non-Blocking 을 위한 것이고 필요한 경우만 Sync 수식어가 붙은 Blocking API 를 사용하도록 되어 있습니다. 결과로, node 는 JavaScript 를 쓰는데도 Non-Blocking 방식과 C++ 하위 라이브러리 덕분에 열라게 빠르다는 겁니다.

### 짤방

아직 출판 안 된 node.js 동물책 가편집본 읽을 수 있는 곳.

<http://ofps.oreilly.com/titles/9781449398583/index.html>