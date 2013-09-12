# MySQL Reverse Index

2010.03.08

MySQL 은 index desc 지원 안 한다.

MyISAM 에서는 인덱스 꺼꾸로 읽으면 속도 저하가 많이 발생한단다.
게시판은 보통 다 desc 인덱스 쓰는데. =,=

해법은 reverse 컬럼 하나 만들어서 그거 가지고 인덱스하라고 하라는 것 같다.
위키피디아에는 reverse_timestamp 컬럼이 있다고 한다.
