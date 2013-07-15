# MySQL Workbench

2010.09.17

예전에 MySQL 도구들이 3 등분인가 나있었던 것 같은데, 하나로 통합되었다.

워크벤치 처음 쓸 때 느낀 단점은,

1. 스키마를 수정해서 디비에 적용하면 테이블을 모두 드랍하고 다시 만들므로 데이터가 날라간다.

2. Foreign Key 관계를 만들면 Foreign Key Index 를 만드는데 (엄마를 빨리 찾아가야 하므로),
거기에 컬럼을 확장하지 못해서 비슷한 인덱스 필요하면 또 만들어야 한다는 것

account_id 라는 foreign key 를 추가하면 account_id 에 대한 인덱스가 추가 된다. 강제로.
account_id, date 의 쌍으로 인덱스가 필요하면 foreign key 용 인덱스에 컬럼만 하나 추가해서 쓰면 되는데 그게 안 된다.

그런데 오늘 찬찬히 다시 살펴보니 위 문제에 대한 해결법이 다 있다.

1. 초기 데이터 적재 문제는,테이블 에디터에서 (다이어그램 테이블 위에서 오른쪽 마우스 버튼 -> Edit Table)
끝에서 두번째 탭, inserts 에 초기 데이터를 넣어 놓고, 디자인 디비에 적용할 때,
generate insert 옵션 켜주니 일괄로 insert 해준다.

2. foreign key 때문에 인덱스 중복으로 만들어야 하는 문제는,
어짜피 MySQL/MyISAM 에서는 foreign key 를 무시하므로,
디자인 적용할 때 skip creation of foreign key 켜주면 된다.
