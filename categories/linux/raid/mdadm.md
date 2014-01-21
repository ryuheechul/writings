# MDADM

2011-02-18 16:46

### mdadm

mdadm 은 리눅스 소프트웨어 레이드시스템입니다.
BtrFS 나오기 전까지는 이걸 어쨌든 써야하는데.

mdadm array 에 사용할 디바이스로 하드 디스크를 통채로 쓸 수도 있고 파티션을 나눠 쓸 수도 있습니다.
뭐가 좋을까 궁금했는데, 그다지 큰 차이는 없고 위키에 보니 아래 문구가 있군요.

"Neil, the md/mdadm author, uses whole disks."

그리고, 인터넷에 리눅스 레이드에 대한 많은 글이 떠돌아 다니고
오라일리 동물책도 있고 우분투 문서도 있는데 다 구버전이라 =,= 아래 문서를 봐야 합니다.
<https://raid.wiki.kernel.org/index.php/Linux_Raid>

위키 보면 우분투 문서에 참고하라고 추천되어 있는 문서 두개 Software RAID HOWTO, the Linux RAID FAQ 보지 말라고 첫 줄에 나오네요. =,=

mdadm 커널 지원은 기본으로 심어져 있어서 커널을 재컴파일할 필요는 없습니다.
필요한 코멘드라인 유틸리티만 설치하면 됩니다.

참고로, 레이드 시스템은 Data Corruption 에 대한 대응은 하지 않습니다.
오직 디스크가 고장난 상황에만 대비합니다.
dd 같은 명령으로 디스크에 엉뚱한 내용을 쓰더라도
슈퍼블럭이 망가지지 않는한 레이드 시스템은 이것을 감지해 내지 못합니다.


### 코멘드 라인 유틸리티 설치 방법

mdadm 설치할 때 --no-install-recommends 를 안 주면 권장 항목들까지 설치되면서 필요도 없는 postfix 설치되고 그럽니다.
이거 막으려면 아래 처럼 옵션 추가해서 설치합니다.

	apt-get install mdadm --no-install-recommends


### 디스크 확인

사용할 디스크들이 마련되어 있나 먼저 확인합니다.
아래 명령들중 좋아하는 것으로

	cat /proc/partitions

	blkid

	ls -l /dev/disk/by-id/
	ls -l /dev/disk/by-uuid/

	lshw -class disk


### 레이드 생성

디스크 두 대일 때는 미러하시고 여러 대라면 **꼭 RAID 6 를 쓰세요.** RAID5 는 너무 위험합니다.

mdadm 은 디스크에 메타데이터를 기록해둬야하는데 현재 버전이 4 가지 정도 있습니다.
기본이 0.9 로 지정되는데 이게 오래되서 쓰지 말라는 것 같군요. =,=
0.9 를 쓰면 2TB 이상 기기를 연결할 수 없는 단점이 있는데 이게 치명적이라 곧 사라질 듯.
최신 버전은 1.2 입니다.
버전 별로 차이점은 메타데이터가 기록되는 위치가 다 다릅니다.
디바이스 뒤에, 앞에, 앞에서 4 킬로 떨어진데 등등.

디스크 파티션을 나눈 후 파티션 단위로 묶으셔도 되는데,
아래 예에서는 그냥 디스크들을 통으로 묶겠습니다.

RAID 1 타입

	mdadm --create --verbose /dev/md0 --metadata 1.2 --level=mirror --raid-devices=2 /dev/sd[ab]

RAID 6 타입

	mdadm --create --verbose /dev/md0 --metadata 1.2 --level=6 --raid-devices=4 /dev/sd[abcd]

생성시 스페어 지정하려면 아래 옵션 추가

	mdadm ... --spare-devices=1 /dev/sde


### 어레이 상태 확인

	cat /proc/mdstat
	watch cat /proc/mdstat

Personalities 는 커널이 지원하는 RAID 레벨들 표시.

레이드 빌드가 완료되지 않더라도 재부팅하거나 레이드 디바이스를 사용하실 수 있습니다.
그런데, 재부팅해보면 생성한 레이드가 자동인식되어있지 않습니다.

생성한 레이드의 이름을 확인해 봅니다.
만들 때 이름을 주진 않았지만 기본값이 들어갑니다.
아래 명령으로 레이드에 참여한 아무 디바이스의 슈퍼블럭을 덤프하면 레이드 이름이 나옵니다.

	mdadm --examine /dev/sda

해당 이름의 레이드를 다시 조립합니다.

	mdadm --assemble /dev/md0 --name "uglyduck:1"

아래 명령으로 확인해 보면 다시 레이드가 보입니다.

	cat /proc/mdstat


### 재부팅시 레이드 자동 인식

재부팅시 레이드를 인식시키기 위해서는 mdadm.conf 파일에 ARRAY 행을 넣어줘야 합니다.
넣어줄 값들은 아래 명령으로 덤프할 수 있습니다.

	mdadm --detail --brief /dev/md0

수작업으로 편집하면 농촌스러우니 아래 명령으로 걍 설정 파일 끝에 추가해 버립시다.

	mdadm --detail --brief /dev/md0 >> /etc/mdadm/mdadm.conf

재부팅 해보면 레이드가 인식된다는 것을 알 수 있습니다.


### 부팅 파티션 자체를 미러 레이드 잡는 경우

부팅 파티션 자체를 미러 레이드 잡는 경우 initrd 이미지 안의 mdadm.conf 를 업데이트 해야합니다.
데이터 디바이스를 레이드 잡는 경우는 패스.

	update-initramfs -u


### 어레이 정보

어레이 정보

	mdadm --detail /dev/md1

디스크 슈퍼블럭 정보

	mdadm --examine /dev/sda1

관련 로그

	/var/log/messages


### 레이드 모니터링

mdadm 을 데몬으로 띄워서 레이드 상태를 모니터링 하는 기능이 있는데
우분투에서 mdadm 패키지를 설치하면 init.d 스크립트 통해서 자동으로 뜨므로 일단 패스합니다.

기본설정으로 레이드에 이상이 생기면 로컬 root 에 메일이 가게 되어 있는데
이걸 포워딩하는 방법은 다른 글에 따로 적겠습니다. (ssmtp 참고)


### 이상 발생시

디스크에 이상이 생겨서 메일이 도착했습니다.

고장난 디스크명을 확인합니다.

	cat /proc/mdstat

고장난 디스크에 대한 시리얼을 확인합니다.

	lshw -class disk

어레이에서 고장난 디스크 분리

	mdadm --remove /dev/md0 /dev/sda

본체 열고 시리얼 확인해서 디스크 물리적으로 교환.

어레이에 새 디스크 추가

	mdadm --add /dev/md1 /dev/sda


### 레이드 고장 시뮬레이션

어레이에 문제가 생기면 mdadm monitor 가 root 로 메일을 쏘도록 되어 있습니다.
mdadm monitor 는 패키지 설치기 기본으로 동작하도록 되어 있습니다.
mdadm 이 쏘는 메일을 전달 전달하는 방법은 ssmtp 글을 참고해주세요.

ssmtp 세팅이 완료되었으면 가상으로 하드를 고장내 봅니다.

	mdadm --manage --set-faulty /dev/md0 /dev/sdc

메일이 바로 오는군요

	Subject: Fail event on /dev/md0:uglyduck

	This is an automatically generated mail message from mdadm running on uglyduck
	A Fail event had been detected on md device /dev/md0.
	It could be related to component device /dev/sdc.

	Faithfully yours, etc.

	P.S. The /proc/mdstat file currently contains the following:

	Personalities : [linear] [multipath] [raid0] [raid1] [raid6] [raid5] [raid4] [raid10]
	md0 : active raid6 sde[4] sdc[2](F) sdg[6] sdl[10] sdd[3] sdf[5] sdi[7] sdk[9] sdj[8] sda[0] sdb[1]
		 17581629888 blocks super 1.2 level 6, 64k chunk, algorithm 2 [11/10] [UU_UUUUUUUU]

	unused devices: <none>

디스크를 분리했다가

	mdadm --remove /dev/md0 /dev/sdc

다시 추가해 주면

	mdadm --add /dev/md0 /dev/sdc

리빌드를 시작합니다.
20 시간 걸린답니다. =,=


### 레이드 강제 해산

레이드 강제 해산

	mdadm --stop /dev/md0

해산 시킨 디스크들을 다시 레이드로 엮을 때는 기존 메타 정보 때문에 레이드 디스크라고 오류가 나올 수 있으니
mdadm --create 하실 때 --force 붙여주세요.

아니면 메타데이터를 지운 후 create

	mdadm --zero-superblock /dev/sdx
