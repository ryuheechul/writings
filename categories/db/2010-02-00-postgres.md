# Postgres

2010.02

Postgres 를 어제부로 드롭했다.

select count 퍼포먼스가 무지 낮다고 한다.
MVCC 를 써서 커넥션마다 테이블 크기가 달라보이니 count 값을 케슁할 수가 없고
count 를 계산할 행을 모두 검사해야하는데
현재 MVCC 정책 때문에 인덱스도 탈 수도 없어서 실제 테이블 Full Scan 을 한다고 한다.

해법은 사용자가 별도 카운트 테이블 만들어서 데이터 넣고 지울 때마다 카운터 테이블 수치 업데이트.

MySQL InnoDB 도 MVCC 쓰는데 count 계산시 인덱스를 탈 수 있다고 한다.
