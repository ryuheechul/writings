MySQL : Reverse Index
drypot 2010-11-29 15:38
2010.03.08

index desc 지원 안 하는군.
MyISAM 에서는 인덱스 꺼꾸로 읽으면 속도 저하가 많이 발생한다는군. =,=
게시판은 보통 다 desc 인덱스 쓰는데. =,=

해법은 reverse 컬럼 하나 만들어서 그거 가지고 인덱스하라고 하는군. =,=
위키피디아에는 reverse_timestamp 컬럼이 있다고. =,=

귀찮은데, =,=