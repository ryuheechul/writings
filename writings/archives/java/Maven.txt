
~/.m2
~/.m2/setting.xml


Super POM

모든 메이븐 프로젝트 POM 들은 super POM 을 계승한다.
maven-[version]-uber.jar 에 있다.
org.apache.maven.project.pom-4.0.0.xml

<project>
	<modelVersion>4.0.0</...>
	<name>...</...>

	<repositories>
		<repository>
			<id>central</id>
			...
			<snapshots>
				<enabled>false</enabled>
	
	<pluginRepositories>
		<pluginRepository>
			...

	<build>
		<direcotory>${project.basedir}/target
		<outputDirectory>${project.build.directory}/classes
		<finalName>${project.artifactid}-${project.version}
		<testOutputDirectory>
		<sourceDirectory>${project.basedir}/src/main/java
		<scriptSourceDirectory>
		<resources>
			<resource>
				<directory>.../src/main/resources
		<testResources>


Project Version

major.minor.incremental-qualifier

ex) 1.3-beta-01
ex) 1.2.3-alpha-02    # qualifer 부분은 스트링 비교하니 02 와 같이 적절히 패딩한다.

SNAPSHOT : install, release 할 때 date time 으로 변환
기본적으로 리포지터리의  SNAPSHOT 은 검색 안 한다.


Property

	<project>
		<groupId>
		<artifactId>

		<build>
			<finalName>${project.groupId}

	${env.PATH} : shell 환경변수
	${project.*} : POM 접근
	${settings.*} : setting.xml 에 접근
	${user.name} : java system property

	커스텀
		<properties>
			<foo>...</foo>
		
		${foo}


Dependencies

internal and external dependency

score :
	compile : default scope in all classpath
	provided : compile(o), runtime(x), not transitive, not packaged
	runtime : compile(x), runtime(o)
	test : only test compile and exec
	system : provided 비슷하지만 path 주고 직접 jar 위치 지정


	Optional Dependency


	Transitive Dependency


	Exclude
		<depdendency>
			<exclusions>
				<exclusion>
					<groupId>
					<artifactId>

	버전 통합 관리
		<dependencyManagement> <- parent

		child:
		<project>
			<parent>
				<groupId>
				<artifactId>
				<version>


Project Relationship

projects related to one another using maven coordinates.
coordinates : groupId, artifactId, version + classifier
classifier : source, doc, jvm version


Inheritance

<project>
	<parent>
		<groupId>
		<artifactId>
		<version>

		groupId, version 은 계승된다.

계승되는 것:
identifiers, dependencies, developers & contributors, plugin list, reports list,
plugin executions (merged), plugin configuration

parent pom 은 local storage 나 ../pom.xml 에 있다고 가정한다.
위치 지정이 필요한 경우 relative path 사용


Best Practice

자주 쓰는 dep 들을 모아 pom 을 하나 만든다.
package type 은 pom.
dependency 정의 밖에 없다.

만들고 mvn install

declare a dependency on this pom
<dependency>
	<gropuId>
	<artifactId>
	<type>pom</type>

parent-child 관계를 dep 관리에 써도 되나
계승은 한가지만 가능하다는 단점이 있다.


Build Life Cycle

maven models projects as nouns.
The verbs are 'goals' packaged in plugins.

goals tied to a phase in build life cycle.

A build lifecycle is an organized sequence of phases that exists to give order to a set of goals.

Those goals are chosen and bound by the packaging type.

Standard lifecycle: clean, default(build), site


Clean Life Cycle

mvn clean

pre-clean
clean <- clean : clean
post-clean


디렉토리 지우기
<project>
	<build>
		<plugins>
			<plugin>
				<artifactId>maven-clean-plugin
					<configuration>
						<fileset>
							<directory>target
							<includes>
								<include>*.class
						

Default Lifecycle

validate

generate-sources
process-sources

generate-resources
process-resources

compile
process-classes

generate-test-sources
proess-test-sources

generate-test-resources
process-test-resources

test-compile
test

prepare-package
package

pre-integratoin-test
integration-test
post-integration-test

verify

install

deploy


Site Lifecycle

pre-site
site <-- site:site
post-site
site-deploy <-- site:deploy


Package Specific Life Cycles

package 에 따라서 실행되는 default goal 이 다르다.

#jar

process-resources			resources:resources
compile						compiler:compile
process-test-resources		resources:testResources
test-compile				compiler:testCompile
test						surefire:test
package						jar:jar
install						install:install
deploy						deploy:deploy

#pom

package		site:attach-descriptor
install		install:install
deploy		deploy:deploy

#maven plugin

#ejb

#war, ear


커스텀 패키지 타입, 커스텀 라이프사이클을 타기 위해서는 플러그인이 필요하다


Resources

<build>
	<filters>
		<filter>src/main/filters/...
	<resources>
		<resource>
			<filtering>true
			<directory>...
			<includes>
				<include>run.bat
			<targetPath>...


Compile

<build>
	<sourceDirectory>src/main/java
	<outputDirectory>target/classes
	<plugins>
		<plugin>
			<artifactId>maven-compiler-plugin
			<configuration>
				<source>1.5
				<target>1.5
		

Test

mvn -Dmaven.test.skip=true 
#compiler, surefire plugin 을 컨트롤


Build Profiles

여러 머신에서 가능한 수정 없이 빌드할 수 있게

<project>
	...
	<profiles> 디폴트를 오버라이딩하므로 보통 마지막에
		<profile>
			<id>production
			<build>
				<plugins>
					<plugin>
						<artifactId>maven-compiler-plugin
						<configuration>
							<debug>false
							<optimize>true

mvn -f<profile id>

거의 모든 것을 오버라이딩 할 수 있다.


<project>
	<profiles>
		<profile>
			<id>jdk16
			<activation>
				<jdk>1.6   # 모든 엑티베이션이 만족되면 프로파일이 활성화 된다.
			<modules>


개발머신에서 environment.type=dev 켜기
<profile>
	<activation>
		<activateByDefautl>true
	<properties>
		<environment.type>dev


Help

mvn -h 
	-npu 	--no-plugin-updates
	-o 		--offline

	-P<profile>
	-D<property>=<value>
	-U		--update-snapshot
	-up		--update-plugins

	-v		--show-version

	-X		--debug

	-N		--non-recursive
	-rf		--resume-from

	-pl		--projects <artId>
	-am		--also-make  		상위 프로젝트들도 처리
	-amd	--also-make-dependents	하위 프로젝트들도 처리

mvn help:active-profile
	help:effective-pom
	help:effective-settings

mvn help:describe -Dplugin=<goal prefix> -Dfull

플러그인의 특정 goal 만 원하면 mojo 도 패스

mvn help:describe -Dplugin=compiler -Dmojo=compile -Dfull
			또는		-Dcmd=compiler:compile -Ddetail



Plugin Configuration

plugin 의 goal 마다 property 가 정의되어 있다.

// 모든 goal 에 적용되는 파라메터 설정
<plugin>
	...
	<configuration>
	...

// 특정 phase 의 특정 goal
<plugin>
	...
	<executions>
		<execution>
			<phase>...
			<goals>
				<goal>...
			<configuration>

// 특정 goal 을 직접 실행시키는 경우에 대해
<plugin>
	<executions>
		<execution>
			<id>default-cli
			<configuration>

// default life cycle 에 bound 되어 있는 goal 의 경우
<plugin>
	<executions>
		<execution>
			<id>default-<goal>
			<configuration>


