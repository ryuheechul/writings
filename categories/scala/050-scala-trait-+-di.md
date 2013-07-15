Scala Trait + DI
drypot 2010-11-29 13:04
2010.07.11

Scala Trait 가지고 DI 비스무레 하게 하는 예제
http://jonasboner.com/2008/10/06/real-world-scala-dependency-injection-di.html

DI 엔진이나 DI 테크닉 좀 멋지게 써볼까 했는데,
이것 저것 보니 괜히 깔짝대지 말고 좀 복잡해도 수작업 하는게 어떨까도. =,=
Edit
drypot 2010-11-29 13:04
2010.07.11

http://lamp.epfl.ch/~odersky/papers/ScalableComponent.pdf

위 책 두번째 페이지에 바로 나오는 내용인데,

Scalability is ensured by the principle that the result of a composition
should have the same fundamental properties as its constituents.

듣고 보니 진짜 그럼.

보통 콤포넌트 컨셉/기능을 구현할 때 저렇게 안 하고, 먼가 새 계층을 만들지.
그리고 그 계층 하나로 해결하려드니 먼가 계속 깝깝해지지.
하위 모델과는 물과 기름.

COM, CORBA, F# 의 모듈 컨셉이나 DI Framwork 들 모두 포함되는 지적일 듯.
DI 를 제대로 하려면 DI 계층이 따로 생기면 안 된다.
결국 언어에서 되새김질 가능한 방식이야야 한다.

Java Bean 이 기초적인 기능만 제공하지만 (제공하긴 하는건가 ^^) 성공한 이유 설명이 되고.
Scala 의 콤포넌트 지원 개념이 다른 짜친 애들과 근본적으로 먼가 다른가 금을 긋는 말.