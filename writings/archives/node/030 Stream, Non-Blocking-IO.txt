Stream, Non-Blocking-IO
2011-05-25 18:02

### Continuation

이전 글에서 node 는 기본적으로 non-blocking API 들을 사용한다고 했습니다. 그래서 스트림에서 데이터를 읽을 때에도 간단한 blocking read() 펑션을 쓸 수 없습니다. read() 에서 블럭되면 blocking read() 의 IO 가 끝날 때까지 모른 리퀘스트에 대한 처리가 중지될테니까요. 해서 node 에서는 IO 모든 펑션에 대해 IO 가 끝났을 때 실행될 코드들을 function 으로 묶어 넘겨줘야합니다.

	var fs = require('fs');
	
	var outter = function() {
		var afterRead = function(err, data) {
			console.log(data);
		}
		fs.readFile('data.txt', afterRead);
	}
	
	outter();

위에서 `fs.readFile` 을 콜했을 때 제어는 IO 의 완료와 상관없이 바로 리턴해 돌아옵니다. IO 가 완료됐을 때 실행되는 코드는 fs.readFile 의 다음 줄에 있는 것이 아니라 function 으로 묶여져 전달되어야 합니다. 그러니 보통 IO 를 발생시키는 `fs.readFile` 같은 콜은 파일의 끝에 있거나 감싸고 있는 펑션의 마지막 줄에 오게 됩니다. 다음에 실행될 코드는 function 으로 묶어서 전달했으니 당장 알 바가 아니고, 당장 해야할 코드들은 다 실행했으니 제어를 node 의 Event Loop 로 돌려주어야 하니까요.

### Data Repack

IO 가 느리기 때문에 데이터를 조각조각 받아 묶어야할 때는 아래 처럼 처리합니다.

	var spool = "";
	var stream = ...;
	stream.on('data', function(data) {
		spool += data;
	});
	stream.on('end', function() {
		// do it with spooled data;
	});

위에 보시면 stream 의 'data' 이벤트와 'end' 이벤트에 펑션을 연결하고 있습니다. 즉슨, data 가 chunk 단위로 도착할 때마다 `spool` 에 쌓는 겁니다. 그러다, 데이터가 다 도착하여 'end' 이벤트가 발생하면 그때 상위 사용자 코드를 불러 실행합니다. 그런데 이런 과정은 프레임웍이 처리해 주기 때문에 복잡한 코트 패턴을 피할 수 있습니다. IO 완료된 결과만 받아 처리하면 됩니다.이렇게 IO Call 을 할 때마다 완료시 실행될 function 을 던져 넣는 것이 node 의 기본 프로그래밍 패턴입니다.

IO 가 연쇄적으로 필요한 경우는 어떨까요? A 를 읽고, B 를 읽고, C 에 쓰고, 등등등. 뾰족한 수 없습니다. 각 Call 마다 모두 function 을 달아줘야합니다. ^^; 이런 부분에서 복잡해질 수 있는데 그래도 속도를 위해서라면 ! 그리고, One Thread 모델이기 때문에 Locking 이 필요 없어지니 공유 자원 관리하는데는 편해지는 장점도 있어서 쌤쌤됩니다.

