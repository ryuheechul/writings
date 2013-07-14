Mercurial
drypot 2011-05-19 23:48
http://mercurial.selenic.com/

코딩 시작한지 30 년만에 처음 써보는 소스코드 버전 관리 시스템.
파이선으로 만들어졌군요.

맥용 패키지 제공하니 받아서 더블 클릭,
설치 끝.

cd project
hg init <-- .hg 폴더 생성
(add files)
hg add <-- 신규 파일들 관리 목록에 올림
hg commit

hg mv
hg cp
hg commit

hg log <-- 리비전 목록
hg identify -n <-- 현재 리비전 확인
hg update 3 <-- 특정 리비전으로 이동

등등등,
간단.

Intellij 에서는 Mercurial 플러그인 기본으로 따라오고
Version Control 메뉴와 Changes Tool Window 두 군데만 다니면 다 됩니다.