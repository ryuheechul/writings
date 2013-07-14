SATA Hot Swap 가능한가
2011-02-18 15:55

SATA 드라이브 + AHCI 인터페이스 + 적절한 운영체제 드라이버 쓰면 Hot Swap 되는 것 처럼 보이는데,
HP ProLiant MicroServer 보면 다들 된다고 하지만 HP 스펙에는 How Swap 지원하지 않는다고 나옵니다.
왜 그럴까 궁금해서 좀 찾아 봤는데.

행자들이 된다는 건 걍 해보닌까 되더라 이거고.

Hot Swap 을 안정적으로 하려면 파워 케이블에 핀 두개가 길게 나와 있어야한다는 군요.
그라운드 핀이라는데 전원이 들어가기 전에 그라운드 핀이 먼저 하드에 닿게 만들어진 케이블들이 있다고 합니다.
물론 일반 날 파워에서는 이런거 보기 힘들고요. =,=
<https://raid.wiki.kernel.org/index.php/Hardware_issues>

드라이브 쪽에서도 Hot Swap 을 위해 건반 배열에 차이가 있군요.
전원을 먼저 차지해야하는 라인들쪽에 건반이 길게.
<http://www.tomshardware.com/reviews/SERIAL-RAID-CONTROLLERS-AMCC,1738-2.html>

그러니, 핫 스웝 지원하는 백플레인 없이, 또는 파워 케이블 없이도
막 꼽다 보면 되는 것 처럼 보이긴 하지만
하드에는 좋을 것 없다는 결론. =,=