# Nginx Config

	#user  nobody;
	worker_processes  1;

	#error_log	logs/error.log;
	#error_log	logs/error.log	notice;
	#error_log	logs/error.log	info;

	client_max_body_size 512m;
	#client_body_temp_path /data1/nginx/temp;

	events {
		worker_connections	1024;
	}
		
	http {
		include		  mime.types;
		default_type  application/octet-stream;

		#log_format	 main  '$remote_addr - $remote_user [$time_local] "$request" '
		#				   '$status $body_bytes_sent "$http_referer" '
		#				   '"$http_user_agent" "$http_x_forwarded_for"';

		#access_log	 logs/access.log  main;

		sendfile		on;
		#tcp_nopush		on;

		keepalive_timeout  65;
		keepalive_requests 512;

		gzip_comp_level 2;
		gzip_proxied any;
		gzip_types text/html text/css application/x-javascript text/plain text/xml application/xml application/xml+rss text/javascript;
		# TODO: type 목록 재확인. 이거 맞나?
		
		server {
			listen 443;
			server_name drypot.com;
			root /data1/web/drypot/client/public;
			
			ssl on;
			ssl_certificate /data1/web/key/drypot-chained.crt;
			ssl_certificate_key /data1/web/key/drypot.key;
			
			client_max_body_size 10m;
			client_body_temp_path /data2/nginx-temp;

			location / {
				proxy_pass http://127.0.0.1:9999/;
				proxy_set_header Host $http_host;
			}
		
			location ~ /(?:css|image|js|lib)/ {
			}

			location /favicon.ico {
			}
			
			location /tmp/ {
				alias /.../tmp/;
			}
				
			location /private {
				deny all;
			}
			
		}
		
		server {
			listen 80;
			server_name drypot.com;
			server_name www.drypot.com;
			rewrite ^/(.*) https://drypot.com/$1;
		}
		
		server {
			listen 443;
			server_name file.drypot.com;
			root /data2/drypot/upload/public;

			ssl on;
			ssl_certificate /data1/web/key/drypot-chained.crt;
			ssl_certificate_key /data1/web/key/drypot.key;

			location / {
				valid_referers none blocked drypot.com;
				if ($invalid_referer) {
					return 403;
				}
			}
		}

	}
