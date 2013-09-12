# MySQL PBXT 컬럼 업데이트


2009-10-04

http://www.primebase.org

로그 베이스로 움직이면 한 컬럼만 업데이트 해도 전체 레코드 새로 쓰는건가.
왜 아무데도 언급이 없나. =,=


2010.02.05

메일로 날아온 제작자분의 자세한 답 메일.

### 질문

PBXT Question - Frequently updated column must be separated ?

Hi.

First, sorry for my poor English, Engish is not my native. :)

I'm not database professional, just ordinary web programmer.
I read about PBXT,
I understood when row updated, whole new row appened, and old rows are gabage collected later.

I have one question.
If table has one column updated very frequently (just like forum thread hit count),
this column must be separated to new table ?

I think, if table designed like below,

rowid int, userid int, hitcount int, title varchar, ...

rowids, userids, titles almost naver chage,
but hitcount will be changed very frequntly.

Does the whole row data be rewritten whenever hitcount changes ?
Should I separate hitcount to new table to prevent unnecessary update for rowids and titles ?

Thank you.

Kyuhyun Park.


### 답장

Paul McCullagh

Hi Kyuhyun,

Yes, the whole row is re-written each time the row is updated.
However, this may not be such a problem depending on the average and maximum length of the row.
The row is divided into 2 parts by PBXT: a fixed length part, and a variable length extended record part.
The fixed length part is stored in the .xtd file of the table, and the variable length part in the data logs.
The fixed length part of the record is not garbage collected. It is freed immediately. The variable length part of the record is garbage collected.
The size of the fixed length part depends on the estimated average length of the row. If the maximum row length is within about 10% of the average row length, then no extended record record is used.
Basically what this means is that if you have a "more or less" fixed length record then no extended record is written. This is ideal for records that are very frequently updated.

Whether this is the case depends on 2 things:
- Your table schema,
- The data you store in the table.

Please send me your table schema (and if you have some example data that would be great too), and I will have a look at the estimated average length.

From this we can decide on the best approach.

Best regards,
Paul


### 재질문

Thank you for your answer.

sorry, but I cound not understand below two sentence clearly.
If there are any detailed blog or document about this, it will be helpful for me a lot :)


> The size of the fixed length part depends on the estimated average length of the row. If the maximum row length is within about 10% of the average row length, then no extended record record is used.

> Basically what this means is that if you have a "more or less" fixed length record then no extended record is written. This is ideal for records that are very frequently updated.

My current H2 (Java Database Engine) schema is like this :

	create table postThread (
		postThread int auto_increment not null primary key,
		category smallint not null,
		hit int default 0 not null,
		length smallint default 1 not null ,
		cdate timestamp not null,
		udate timestamp not null ,
		userName varchar(32) not null,
		title varchar(128) not null
	);

Last two columns are varyable size.
userNames are 5~10 characters.
titles are 15 ~ 20 chracters.

hit column is increased every read.

Thank you.

Kyuhyun Park


### 재답장

Hi Kyuhyun,

I have done presentations on this that may help.
Just search for PBXT on youtube. You can also check out my blog: pbxt.blogspot.com.
And http://primebase.org/news.php has links to PDF versions of all presentations.

> The size of the fixed length part depends on the estimated average length of the row. If the maximum row length is within about 10% of the average row length, then no extended record record is used.

I created the table below.
Then I executed `CHECK TABLE postThread;`
I the MySQL err log you will see the following output.

	CHECK TABLE: ./test/postThread
	Record buffer size      = 184
	Fixed length rec. len.  = 182
	Handle data record size = 196
	Min/max header size     = 14/14
	Min/avg/max record size = 28/165/188
	Avg row len set for tab = not specified
	Rows fixed length       = YES
	Maximum fixed size      = 16384
	Minimum variable size   = 320
	Minimum auto-increment  = 0
	Number of columns       = 8
	Number of fixed columns = 0
	Columns req. for index  = 1
	Rec len req. for index  = 4
	Columns req. for blobs  = 0
	Number of blob columns  = 0
	Number of indices       = 1
	Free record count       = 0
	Deleted record count    = 0
	Allocated record count  = 0

This line: `Min/avg/max record size = 28/165/188`
Indicates what PBXT says are the minimum, average and maximum row length, in bytes.
165 is the average row length, which is an estimate, derived from the table definition.

The following row:
`Rows fixed length = YES`
Indicates that PBXT will be using fixed length rows for your table. This means that an extended data record is not used. Which means that no garbage collection is required for this table!

> Basically what this means is that if you have a "more or less" fixed length record then no extended record is written. This is ideal for records that are very frequently updated.

This is the case for your table postThread. Average is 165 bytes and maximum is 188 bytes. PBXT decides that there is not so much difference between the maximum and the average, and therefore it decides to use fixed length records.

So the short answer to you original question is: Do not bother to split the table into 2, because there will be no garbage collection for the table.

OPTIMIZATION:

Now, if you like you can actually optimize this table further for PBXT.

As you say below:

userNames are 5~10 characters.
titles are 15 ~ 20 chracters.
If this is the case, then the average row size is 58 bytes not 165 as estimated by PBXT.

	58 = 188 - (32-10) - (128-20).

So, I can tell PBXT that I want to use a different average row size, as follows:

	create table postThread (
		postThread int auto_increment not null primary key,
		category smallint not null,
		hit int default 0 not null,
		length smallint default 1 not null ,
		cdate timestamp not null,
		udate timestamp not null ,
		userName varchar(32) not null,
		title varchar(128) not null
	) engine=pbxt avg_row_length=58;

You will see that this change:
`Handle data record size = 196`
to
`Handle data record size = 72`

This is good because it means the .xtd file will be much more compact (handle data records are the fixed length part of the record stored in the xtd file).
But this means that if a record has userNames > 10 and titles > 20, then PBXT will create an extended record.
However! Only a very small part of your data has longer userNames or titles, this is not a problem.

