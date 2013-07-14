아이폰 앱 개발 삽질의 기록
drypot 2010-12-27 15:25
별로 집중하지 못하는 한 달을 보내고 있습니다.
몸 컨티션도 안 좋고, 와우 새버전 나온 문제도 있지만,
아직은 Cocoa 나 Xcode 가 집중해 볼 만큼 매력적이지 않군요.

Cocoa 는 애플 플랫폼 어플리케이션을 개발하기 위한 Objective-C 스타일의 OOP 라이브러리입니다.
그 아래는 C 라이브러리들이 별도로 있습니다.
대충 Windows 의 MFC 같은 존재.

처음에는 Mac OS X 용 Cocoa 를 기반으로 깔고 iOS 용 Cocoa 로 가려고 했는데 잘못된 판단이었습니다.
둘이 비슷한듯 하면서도 많이 달라서 iOS 관련 내용만 추려 보는 것이 헷갈림을 방지하는데 더 좋을 듯 싶군요.
클래스 트리도 다르고, 메모리 관리 법도 다르고,  UI 오브젝트들 기본 컨셉도 다릅니다.
iOS 것이 더 신형인 듯.
Edit
drypot 2011-01-03 18:40
iOS Technology Overview,
iOS 개발에 들어가는 1 단계 문서가 이놈인 것 같군요.
양은 64 페이지 정도, 내용도 쉽고요, 일독했는데 불만은 없습니다. ^^

기타 iOS 관련 필독 문서가 20 개 정도 되는 것 같고,
OS X 관련해서 공통으로 볼만한 문서가 또 그정도.

iOS 핵심 프레임웍은 40 개 정도로 구성되어 있는 것 같군요.
Edit
drypot 2011-01-04 17:06
iOS Application Programming Guide,
프로세스 관리, 멀티태스킹, 환경설정등 어플리케이션 개발할 때 공통적으로 관심가져 볼만한 내용들에 대한 요약본입니다.
일반적인 프로그래밍 가이드북과 다릅니다. 개념설명이라 코드가 없어요.
iOS Programming Concepts 가 더 적절한 제목이었을 듯.

절반정도 보다가 일단 덮었습니다.
후반부는 나중에 필요한 것만 찾아봐도 될 것 같습니다.

View / View Controller / Event / Drawing 문서들을 보고 싶은데,
애플 디벨로퍼 사이트에는 iOS Human Interface Guidelines 가 세번째로 나열되어 있으니 이것을 먼저.
Edit
drypot 2011-01-09 10:37
iOS Human Interface Guidelines,
iOS 문화를 세세하게 기술하고 있는 문서여서 관련업 종사자는 다 읽어야 할 것 같습니다.
특히 기획하시는 분들이나 갑. (알아요, 이루어질 수 없는 희망사항)
Edit
drypot 2011-01-10 11:42
출력해서 벽에 붙여둔 대략 읽어야할 문서 목록들

iOS Technology Overview
iOS Application Programming Guide
iOS Human Interface Guidelines
iOS Development Guide
View Controller Programming Guide for iOS
View Programming Guide for iOS
Event Handling Guide for iOS
Threading Programming Guide
In App Purchase Programming Guide
Core Text Programming Guide
Text, Web, and Editing Programming Guide for iOS
Drawing and Printing Guide for iOS
Quartz 2D Programming Guide

iAd Programming Guide
Multimedia Programming Guide
Local and Push Notification Programming Guide
iPod Library Access Programming Guide
Location Awareness Programming Guide
OpenGL ES Programming Guide for iOS
Table View Programming Guide for iOS

A Tour of Xcode
Interface Builder User Guide

The Objective-C Programming Language
Cocoa Fundamentals Guide
Memory Management Programming Guide
Memory Management Programming Guide for Core Foundation
Resource Programming Guide
String Programming Guide
Key-Value Observing Programming Guide
Property List Programming Guide
CFNetwork Programming Guide

Core Data Programming Guide
Model Object Implementation Guide

Mac OS X Technology Overview
Apple Human Interface Guidelines
Cocoa Event-Handling Guide
Keychain Services Programming Guide
Garbage Collection Programming Guide
Document-Based Applications Overview
Core Animation Programming Guide
Concurrency Programming Guide
Bundle Programming Guide
Edit
drypot 2011-01-17 16:38
View Programming Guide for iOS,
뭔가 부족하고, 내용이 밑도 끝도 없이 등장하기도 하고,
코드가 거의 나와 있지 않아서 명쾌하게 이해되지도 않았다.
돌고 돌아서 어쨌든 모두 이해해야할 내용들.
Edit
drypot 2011-01-19 15:31
Introduction to Objective-C and Cocoa Touch
http://developer.apple.com/videos/iphone/#video-essentials-objectivec

Objective-C 속성 학습을 위한 유용한 동영상
Edit
drypot 2011-01-21 12:58
Interface Builder User Guide,
View Programming Guide 에서 원했던 내용이 여기 들어있는 것 같다.
Edit
drypot 2011-02-04 11:28
The Objective-C Programming Language,
걍 다 봐야하는 문서, 내용 무난했다.
Edit
drypot 2011-02-10 19:17
Drawing and Printing Guide for iOS,
UIKit 관점에서 화면 출력을 설명.
먼가 한참 부족하다.
아직도 먼가 많이 읽어야 할 듯.

iOS 에서 드로잉은 UIKit, Core Graphics, OpenGL ES, 3 가지 프레임웍으로 한다.
UIKit 과 Core Graphcis 는 서로 좌표 시스템이 반대. =,=
Edit
drypot 2011-03-09 18:12
아이폰 프로그래밍 입문서 많이 뚜드려 본 것은 아니지만, 검토 대상에 이 책을 넣어 주세요.
Wiley Advanced iOS 4 Programming