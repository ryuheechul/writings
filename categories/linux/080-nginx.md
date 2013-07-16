# Nginx

2010.09.16

http://news.netcraft.com/ 페이지 아래 그래프 보시면
잘 안 보이는데 nginx 의 녹색 그래프가 갑자기 꽤 올라온 것을 보실 수 있습니다.

http://www.nginx.org/  
http://wiki.nginx.org/Main

엔진엑스가 놀라운 것은, 문서가 너무 없어서, =,=
썰렁한 문서 3 장, (몇 줄 있지도 않음)
만드신 분이 영어권이 아니라 문서를 만들 수가 없어요. =,=

원래 관련 책도 전혀 없었는데, 몇 달전에 한권 나왔군요.

https://www.packtpub.com/nginx-http-server-for-web-applications/book#ebook-version

네트웍에 병목이 있을 터이니 어느 한계 이상은 안 올라가겠지만,
스레드 관리가 특이해서 접속 포트 많을 경우 이론상 아파치에 비해 무식하게 빨라집니다.
램도 진짜 적게 먹고요.

저는 속도 때문에 써봤던 것은 아니고,
아파치 설정이 너무 지저분해서 썼었습니다.
엔진엑스 설정이 진짜 직관적이고 쉽습니다.

2010.09.16

제가 노트북에서 서버 돌리는데 사용하고 있는 설정입니다.

	client_max_body_size 512m;
	client_body_temp_path /home/drypot/nginx/temp;

	keepalive_requests 512;

	gzip_comp_level 2;
	gzip_proxied any;
	gzip_types text/html text/css application/x-javascript text/plain application/xml application/xml+rss text/javascript;

	server {
		listen 80;
		listen 8402 default ssl;

		server_name sleek;

		root /home/drypot/web-site/sleek/sleek-web-site;

		ssl_certificate /home/drypot/web-site/key/sleek.the-oz.net.crt;
		ssl_certificate_key /home/drypot/web-site/key/sleek.the-oz.net.key;
		ssl_protocols SSLv3 TLSv1;
		ssl_ciphers HIGH:!ADH:!MD5;

		location / {
			proxy_pass http://localhost:8202;
			#proxy_set_header X-Real-IP $remote_addr;
			#proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			#proxy_set_header Host $http_host;
		}

		location /i/ {}
		location /css/ {}
		location /js/ {}
	}

	server {
		listen 80;
		server_name sleekfile;
		root /home/drypot/web-site/sleek/sleek-file-web-site;
	}

	server {
		listen 80 default;
		server_name _;
		return 444;
	}

client_max_body_size 는 파일 첨부 들어올 때 맥스 크기.
client_body_temp_path 는 첨부 들어올 때 임시 저장할 장소. Post 들어오는 내용 디렉토리에 무조건 일단 저장합니다.
keepalive_requests 는 아실 것 같고.
gzip_types 는 자동으로 gzip 압축해서 통신할 컨텐트 타입.

그리고 server 는 가상호스트 잡는 방식입니다.
아파치에 비해 매우 쉽지요?

포트 보이고요,
sleek, sleekfile 이런 것이 가상 도메인 주소입니다. 위에 것은 로컬 테스트용이라 간단.
루트 디렉토리 어디로 보낼지 보이고.

SSL 설정도 간단합니다. 파일 위치 지정만.
기타 location 은 가상 패스 어디로 매핑할지 지정.

사실 이것만 알아도 왠만한 사이트 설정이 가능할 것 같습니다.

2011-08-29

http://wiki.nginx.org/XSendfile

Response 헤더에 파일 패스를 추가해 주면 nginx 가 파일 서비스를 대신 해준다는 줄거리입니다.
어플리케이션 서버에 sendfile 기능이 있나 없나 고민할 이유가 없었군요. =,=
