Ubuntu 10.04 Software Raid
drypot 2010-12-10 19:08
몇 달전에 썼던 글입니다.
몇 가지 필요에 의해서 게시.

우분투 서버나 얼터너티브 인스톨 판에는 설치시 MDADM 소프트웨어 레이드 설정 기능이 들어있는데,
괜히 레이드 설치기능 없는 클라이언트판 가지고 레이드 설정하는 삽질을 한 줄거리입니다.

*

2010.05.12

오늘이 무슨 요일인지도 모르겠음.
내 며칠은 리눅스 레이드 때문에 완전 망가졌였음. ㅋ

인텔 보드에서 IDE 쓰는 모드가 IDE, RAID, AHCI 이렇게 3 가지 있는데,
IDE 선택하면 예전 PATA 에뮬레이션 하면서 하드 순서가 이상해짐. =,=
커널 위키에는 RAID 가 Intel Matrix RAID 쓰지 않는 경우에도 옵티멀이라고 되어 있었는데,
RAID 모드에서는 GRUB 인스톨하는데 에러가 났음.
지금 생각해보면 IDE 모드에서 인스톨하고 RAID 모드에서 GRUB 설치하려 해서 에러난지도 모르겠음.
결론은, SATA 쓰는 사람은 왠만하면 AHCI 를 써야한다.

우분투 위키에는 Live CD GUI 로 Software Raid 구성 지원이 안 되므로
Alternative CD Text 인스톨러를 사용하라고 되어 있는데,
이거 쓰니 레이드 설정이 죽밥이 되고 인스톨하랴, 디스크 싱크하랴, 설치 시간 2 시간 넘게 걸렸음. =,=

난 결국 Live CD 로 모두 수작업했는데,
지금 생각해보믄 Live CD 로 md 드라이브들만 만들어 주고 Alternative CD 로 인스톨하는 방법도 괜찮았을 것 갈음.
Live CD 로 끝까지 하려면 삽질이 필요하고 아래 다시 쓰겠지만 맨 마지막 과정에서 기계 다운 되므로. =,=

그래서 Live CD 로 일단 우분투를 부팅, 설치할 꺼냐고 물어보면 설치하는거 말고, 한번써보겠다 선택.

터미널 하나 열고 sudo su 로 슈퍼 유저로.

mdadm 안 따라오므로 apt-get install mdadm

좋아하는 방법으로 /dev/sda 파티션하기.
gparted 따라오니 그거실행시켜도 되고, fdisk, cfdisk 등 다양.
cfdisk 가 편하던데 난 무슨 문제인지 변경 내용이 계속 저장이 안 됐음. =,=
그래서 gparted 로 칸 나눴음.

칸 나눈후 /dev/sda 각 파티션 타입을 fd 로 변경.
fdisk 로 했음.

결과는 아래 처럼 됐음, swap 도 걍 레이드 위에 올리기로 했음
   /dev/sda1 16G     / 용도
   /dev/sda2 8G       swap 용도
   /dev/sda3 나머지  /home 용도

/dev/sda 예쁘게 나눴으면, 아래 명령으로 /dev/sdb 에 파티션 정보 복사
sfdisk -d /dev/sda | sfdisk /dev/sdb

양쪽 디스크에 파티션이 까끗하게 정리됐음.
그럼 이제 레이드로 묶기

mdadm --create /dev/md1 --level 1 --raid-devices 2 --assume-clean /dev/sda1 /dev/sdb1
mdadm --create /dev/md2 --level 1 --raid-devices 2 --assume-clean /dev/sda2 /dev/sdb2
mdadm --create /dev/md3 --level 1 --raid-devices 2 --assume-clean /dev/sda3 /dev/sdb3

문서들보면 md0 부터 쓰던데 그거 졸 헷갈림. md0 에 sda1 sdb1 엮으면. =,=
걍 md1 부터 해도 아무 문제 없음.

--assume-clean 옵션 안 주면 만들자마자 싱킹하려고 박박댐.
도대체 새로 만든 레이드 왜 싱킹하려하는지 이해가 안 됨.

cat /proc/mdstat 로 잘 엮였는지 확인

파일 시스템 생성
mkfs -t ext4 /dev/md1
mkswap /dev/md2 등등

자 이제 디바이스가 준비되었으니 우분투 인스톨러로 우분투 인스톨
문제 없이 인스톨 되는데, 단,
인스톨러가 레이드를 모르므로 눈에 보이는 swap 파티션 3 개를 모두 등록하려고함. =,=
/dev/md2 만 swap 으로 하고 나머지 sda, sdb 로 보이는 swap 은 꺼주어야함. 안 그럼 에러.

인스톨 다 끝나고 재부팅할래? 물어보면 하지 말고, 테스트 사용 계속하겠다고 하고 나옴.

인스톨러가 레이드를 모르므로, 저 상태로 부팅하면 부팅이 안 됨. =,=
initrd 만들어주고 GRUB 도 다시 세팅해야하니 일단,
우분투 설치한 루트 파티션을 마운트함.

mount /dev/md1 /mnt

기타 필요한 디렉토리들 마운트

mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys

근데 bind 로 마운트 하니까 그런지 나중에 umount 가 안 되던데,
dev, proc 마운트하고 umount 할 수 있는 더 좋은 방법이 있는지. =,=

마운트 했으면 chroot 로 마운트 디렉토리를 루트로 하는 쉘을 오픈함

chroot /mnt

자 이제 막 인스톨된 우분투 루트로 왔는데, 여기는 mdadm 이 없음. =,= 또 설치
apt-get install mdadm

mdadm 관련 설정을 해줘야하는데, apt-get 으로 mdadm 설치되면서 기본적인 정보가 마련이 됨.
먼저, /etc/mdadm/mdadm.conf 를 vi 열고 보면

ARRAY 행에 위에서 만든 md1~3 이 등록되어 있는 것이 보임.
혹시 먼가 꼬여서 이게 없다면 넣어줘야 하는데
mdadm --detail --scan 으로 현재 커널 메모리 상에 등록된 레이드 정보 덤프해서 넣어주면 되고,
중간에 실수로 재부팅 했다던지해서 메모리에도 없다 싶으면,
mdadm --assemble /dev/md1 /dev/sda1 /dev/sdb1 등으로 수작업 등록해줘야함.

어쨌든 제대로 왔다면 들어 있을꺼임.
이 ARRAY 행 맨 뒤에 auto=yes 을 3 줄 모두에 추가 해줌.

디스크 하나 날라가서 degraded 된 상태에서는 부팅이 안 된다고 하는데,
이 상태에서 부팅되게 설정을 해야하는데,
/etc/initramfs-tools/conf.d/mdadm 파일에 있음.
BOOT_DEGRADED=true 로 해줌.

이 파일 전에 보이다 안 보여서 한참 찾았는데 mdadm 패키지 설치 안 하면 없음. =,=
또 저렇게 수작업으로 하지 않으려면 dpkg-reconfigure mdadm 로
패키지 인스톨 화면 쓰면 되는데, 좀 뻘짓 같았음.

드뎌 initrd 파일 만들 준비가 끝났으니, 생성
우분투에서는 이 명령임 update-initramfs -u

블로그에 보면 우분투는 initramfs 안 쓰고 initrd 라고 주장하면서 떠드는 애들 때문에 한참 삽질했고,
걍 initrd 성성하면 됩니다 다고 말하고 끝내버리는 사람들이 많아서 졸 삽질했는데,
결국 걍 update-initramfs -u 였음. =,=

마지막으로 GRUB 설정해야하는데.
우분투 9.10 부터 grub2 패키지로 바뀌면서 문화가 싹 바껴서. =,=

grub2 에서 grub 설정은 /boot/grub/menu.lst 로 안하고
/etc/default/grub 에서 변수 수정하면 환경설정이 프로그램으로 젠되는 방식으로 바꼈음.

update-grub 으로 /boot/grub/grub.cfg 생성

아래 명령으로 쌍 디스크 MBR 에 모두 grub 꼽아줌.
grub-install /dev/sda
grub-install /dev/sdb

난 Intel RAID 모드에서 이 마지막 과정이 에러나면서 계속 안 됐음. 파일 시스템 타입을 모르겠다고 뻐팅김. =,=
AHCI 모드로 다시 첨부터 하니 되었음.

exit 한번 쳐서 chroot 로 이동했는 루트 쉘에서 빠져나옴.

이제 재부팅을 하면 되는데, 이 단계에서 재부팅이 안 됨. =,=
재부팅 하라고 하면 다운 됨. =,=

어떤 문서에 보니 여서 거의 다운되므로 새로 만든 레이드 모두 stop 시키라고 하는데,
dev, proc 등을 md1 에 엮어서 이놈들 때운메 md1 언마운트가 안 됨.
언마운트 안 되니 stop 도 안됨.

참고로 stop 명령은 mdadm --stop /dev/md1

리부트하라고 하니 안 되서 리셋눌렀는데,
다행인지 재부팅하고 보니 레이드 리싱킹은 안 하네.
근데 이게 더 불안해. =,=
리싱킹 해야하는건데. =,=

레이드의 필요성을 느끼는건,
짐 이글 타이핑하면서 데이터 옮기고 있는데,
작업 파티션 90 기가 옮기면서 파일 두개 깨졌나고 나왔음.
일주일도 안 썼는데. =,=

삽질이 심해서 그렇지 레이드 묶어 놓으면 마음은 좀 편함. ^^

끝. =,=