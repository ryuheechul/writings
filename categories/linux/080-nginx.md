# Nginx

### Install Ubuntu

ubunto 10.04 쓰고 있으면 리포 추가

	sudo add-apt-repository ppa:nginx/stable
	sudo apt-get update

	sudo apt-get install nginx-full

	/etc/nginx/conf.d 에 설정 링크
	/etc/nginx/sites-enabled 정리
	/etc/init.d/nginx restart

`sudo apt-get install nginx-full` 대신 인터넷에 떠도는 대로 `sudo apt-get install nginx` 하면 http_referer_module 없는 패키지가 설치된다.


### Install Mac

설치

	brew install nginx

설정 위치

	/usr/local/etc/nginx

설정 수정후 리로드

	nginx -s reload
	
	
### 버전 확인

버전

	nginx -v
	
컴파일러 옵션

	nginx -V


### XSendfile

http://wiki.nginx.org/XSendfile

Response 헤더에 파일 패스를 추가해 주면 nginx 가 파일 서비스를 대신해준다.  
어플리케이션 서버에 sendfile 기능이 있나 없나 고민할 이유가 없다.
