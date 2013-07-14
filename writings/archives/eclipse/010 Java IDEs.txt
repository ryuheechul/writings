Java IDEs
drypot 2010-11-28 18:38
2010.01.25

Java 환경 개념 재밋고 다 좋은데 제대로 되는 게 없다.

언어는 Scala 정했고, 서버도 GlassFish 로 정했고, 빌드 시스템도 Maven 으로 정했는데,
다 좋은데 서로 붙질 않음. ㅋㅋㅋ

Eclipse + Scala + GlassFish + Maven =>
이클립스에선 Scala 플러그인 버그 때문에 편집이 거의 불가능

NetBeans + Scala + GlassFish + Maven =>
NetBeans + GlassFish 궁합은 환상인데 Maven, Scala 에 버그가 좀 있음.
Scala 는 넘어간다 쳐도 서버 계속 띄우는 Maven 버그 때문에 작업 진행이 안 됨.

Intellij IDEA + Scala + GlassFish + Maven =>
Scala, Maven 지원은 좋은데 GlassFish 하고 전혀 붙질 않음. 리로드가 아니라 디플로이 조차 안 됨.

IIS + VisualStudio 쓸 때 걍 암생각없이 키 하나로 되는거 모가 이리 힘드냐.

하다가 정 안 되면 Maven 을 버리고 NetBeans 에서 Ant 쓰는 걸로 해봐야 겠음.
NetBeans 에서 Ant Ivy 플러그인이 돌아가면 좋겠는데, 얘가 또 버그가 있어서 안 됨.

근데 돌아다니다 보니 결합력은 NetBeans 가 가장 좋음.

언어 지원도 3 인방 중에 중간은 가고. (이클립스는 Java 빼고는 지지, Intellij 가 언어 지원은 최고),
어플리케이션 서버 지원도 최상이고.
Ant / Maven 네이티브로 쓰니 빌드 시스템도 깔끔함.
Edit
drypot 2010-11-28 18:40
2010.01.26

흠, 대략 모든 툴을 Nightly Build 로 써서 대충 돌아가게 맞추었음. =,=
Stable 버전들이 모이면 동작 불가, 에러 폭주. =o=

NetBeans + Scala + GlassFish + Maven 세트로 간신히 한줄 컴파일 완료. ㅋㅋ

Maven Multi-Module 만들면 NetBeans 에서 프로젝트 전체를 왕따 시켜서. =,=
걍 당분간 모듈 한개짜리로 살아야 할 것 같음.

NetBeans Maven 관리하는 아저씨가 먼가 대책을 세워주겠지, 라곤 하지만,
1 년 전에 나하고 같은 문제 겪는 사람이 포럼에 질문 올려놨던데 무플, =,=

NetBeans 자체 빌드 모델이 없는게 다행스럽게도 Maven 지원이 풍푸해지는 결과를 보이고 있음.

이클립스나 아이디어는 Maven 을 자체 프로젝트로 매핑하고 막 이래서 모양새 이상해지거나
디펜던시 관리만 쓰고 땡치는 경우가 많은 것 같은데,
NetBeans 는 Maven 놓으면 Ant 로 가지 않는 이상 아무것도 못하는 상황이 되니
플러그인 만드는 사람이 그래도 신경쓰는 듯.

아직 어색하긴 해도 Maven 만든 사람들 대단한 것 같음.
아름다움.

NetBeans 에서 생각지도 못한 부분들 지원해 줘서 이것도 참 다행이고.

전반적으로는 이클립스 사용자가 대세겠지만,
독일 잡지 통합환경 사용 통계 하나 보구 많이 위안이 되고 있음. =o=
혼자 넷빈 가지고 삽질하는 건 아닌가보다 안도감이, =,=
http://it-republik.de/jaxenter/quickvote/results/1/poll/72