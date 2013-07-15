Windows 7 와 Mac OS X 파일 공유
drypot 2011-03-04 23:11
Windows 7 에서는 파일 서버에 인증하는데 NTLMv2 와 128 비트 암호화를 사용하기 때문에
Mac OS X (현재 버전 10.6.6) 의 SMB 방식 공유 폴더에 접근할 수가 없습니다.

OS X 의 samba 설정으로 해결할 수 있으면 좋겠는데,
리눅스 포럼에서는 삼바 3.4.X 라인을 쓰라고 합니다. =,=
근데, 맥에 깔려 나오는 삼바는 3.0.X 라인.
이걸 지금 당장 수작업 업그레이드 하는 삽질은 별로 하고 싶지 않고. =,=

대신, 아래 윈도우 7 클라이언트의 보안 정책을 변경하는 방법이 있다고 합니다.

*

http://www.pronetworks.org/forums/windows-7-and-mac-os-x-sharing-t104898.html#p782299

Accessing Mac OS X Windows Sharing from Windows 7
Windows 7 will not work with Mac OS X Windows file sharing support by default.
If you attempt to access a folder shared from Mac OS X, Vista will display a logon error repeatedly.
The problem is that Vista, by default, will only use NTLMv2 for authentication,
which is not supported by Mac OS X's Windows Sharing service.
The other problem is the Minimum Session Security for NTVLM SSP based Clients.
To get around this:

1.	In Vista, open the Control Panel
2.	Switch to "Classic" view
3.	Double-click Administration Tools
4.	Double-click Local Security Policy
5.	Or Secpol.msc
6.	Expand "Local Policies" and select "Security Options"
7.	Alternate : Type secpol.msc to get editor up then
8.	Locate "Network Security: LAN Manager Authentication Level" in the list and double-click it.
9.	Change the setting from "Send NTMLv2 response only" to "Send LM & NTLM - use NTLMv2 session if negotiated"
10.	Network Security: Minimum session security for NTLM SSP Based (including secure RPC) Clients
11.	Change the setting from "require 128 bit" to unchecked (No Minimum)
12.	Click OK
Edit
drypot 2011-05-07 17:21
위 방법으로도 맥 폴더에 접근 안 된다는 전언이 있었습니다.
사실 저도 직접 해보지 않고 글만 가지고 온 것이라 죄송합니다.

근데, 아무나 접근할 수 있도록 SMB 로 폴더 공유를 세팅했는데 맥 끼리도 잘 안 되는군요.  =,=
오묘한 삼바의 세계, 현재 더 삽질하고 싶지는 않고요.

차기 OS X 라이언에서 삼바를 들어내고 애플에서 만든 SMB 서버가 들어간다고 하니
그때까지 한두 달 그냥 참고 있을랍니다.

근데, 지난 20 년간 파일 공유가 제대로 된 적은 없지 않나요.