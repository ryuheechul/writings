# Hadoop

2011-01-31

Hadoop 은 reliable, scalable, distributed computing 을 위한 자바 프레임웍.

여러 서브 프로젝트들이 있다.

* Hadoop Core : Hadoop Distributed File System + MapReduce distributed computing metaphor
* HBase : Hadoop Core 를 기반으로 사용하는 Database
* Pig : high-level data-flow language and execution framework for parallel computation.

요약하면 저장은 HDFS 로, 연산은 MapReduce 스타일로.


### MapReduce

구글에서 검색엔진 만들면서 정립한 분산 컴퓨팅 스타일인데 복잡한 것은 아니고,
크라울링 결과 처리 처럼 각 노드에서 각자 할 수 있는 것은 프레임웍에 Map 펑션을 전달해 실행시키고,
검색 처럼 노드의 결과를 취합해야하는 경우 Reduce 펑션을 전달해 실행시킨다는 개념.

각 노드에서 Map / Reduce 펑션 실행 관리는 TaskTracker 가.
TaskTracker 가 실행할 펑션을 배포하고 관리하는 일은 JobTracker 가.

그러니, 클러스터당 JobTracker 는 하나, TaskTracker 는 노드마다 존재.


### HDFS

파일은 여러 노드에 복제 됨.
하나의 데이터 청크만 사용 가능하다면 사용자는 다른 노드의 고장 유무를 알지 못함.

HDFS 는 두개의 프로세스에 의해 구현됨.

NameNode: 파일 시스템 메타 데이터 관리, 컨트롤 서비스 제공.
DataNode: 블럭 스토리지 제공, 데이터 읽기 서비스 제공.

클러스터당 NameNode 는 한개 존재.
이놈 나가면 하둡은 정지.
단, NameNode 자동 백업 기능과 복구 기능은 존재.
NameNode 자동 핫 스웝은 불가.

DataNode 프로세스는 일반적으로 스토리지 노드당 한개씩.


일반적으로 MapReduce / HDFS 관리를 연동해서,
JobTracker, NameNode 가 같은 노드에서,
TaskTracker, DataNode 가 같은 노드에서 실행됨.

권장 실행 환경은 리눅스.
슬레이브 머신들에 Configuration 배포는 ssh + rsync 로.

conf/masters 파일에 NameNode 백업 머신 주소 적어주고,
conf/slaves 파일에 DataNode 머신들 주소 적어주고,
각 머신들에 ssh 무패스워드 로그인 가능하게 설정 하고,
마스터 NameNode 머신에서 쉘 스크립트로 데몬 띄우면 하둡 클러스터 동작.

HDFS 포멧은 아래 명령 처럼.

	hadoop namenode -format

Balancer 는 각 DataNode 의 데이터 점유율이 가능한 고르도록 데이터를 계속 복제함.
네트웍 트래픽의 어느 정도를 밸런싱 작업에 사용할지는 설정 파일에서 인자로 줄 수 있음.

같은 데이터를 몇 개 노드에 복제할지는 지정할 수 있음.
데이터 블럭들을 어디에 복제하는 지는 아마도 하둡 마음.

DataNode 들의 스토리지 용량은 같지 않아도 됨.

NameNode 가 나가면 데이터 다 날림.
하둡을 통해 백업 NameNode 를 돌릴 수 있지만 이것을 제외하면
RAID1, RAID5 에 의지해 데이터 안정성을 확보해야 함.

특정 DataNode 사용 중지하기 위해서는
환경 설정 파일에 정지하려는 DataNode 주소 목록 만들어 놓고,

	hadoop dfsadmin -refreshNodes

DataNode 를 추가하기 위해서는 DataNode 서버 설정 잘하고 그냥 기동하면 끝.
DataNode 설정에 NameNode 주소 적는 곳이 있으니 서로 통신해서 이빨 맞출 듯.

휴지통, 지운 파일 복구 기능 있음.

구조 대충 파악했으니 하둡은 일단 여기까지만.
