truncate table t_schoolmaster;
insert into t_schoolmaster(id, username, country_code, phone_no, password)
values ('master01', '王校长', '86', '13753532765', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW');

create table t_teacher
(
    id             varchar(36) not null primary key,
    schoolmasterId varchar(36) not null,
    username       varchar(50) not null,
    country_code   varchar(4)  not null,
    phone_no       varchar(11) not null,
    password       varchar(65) not null,
    version        bigint    default 0,
    create_time    timestamp default CURRENT_TIMESTAMP,
    update_time    timestamp
);
comment on table t_teacher is '老师';

insert into t_teacher(id, schoolmasterId, username, country_code, phone_no, password)
values ('t01', 'master01', '张三', '86', '13753536151', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW'),
       ('t02', 'master01', '李四', '86', '13753536152', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW'),
       ('t03', 'master01', '王五', '86', '13753536153', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW');

create table t_student
(
    id             varchar(36) not null primary key,
    schoolmasterId varchar(36) not null,
    username       varchar(50) not null,
    password       varchar(65) not null,
    birthday       date,
    gender         varchar(10),
    version        bigint    default 0,
    create_time    timestamp default CURRENT_TIMESTAMP,
    update_time    timestamp
);
comment on table t_student is '学生';
insert into t_student(id, schoolmasterId, username, password, birthday, gender)
values ('s01', 'master01', '赵雷', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1990-01-01', '男'),
       ('s02', 'master01', '钱电', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1990-12-21', '男'),
       ('s03', 'master01', '孙风', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1990-05-20', '男'),
       ('s04', 'master01', '李云', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1990-08-06', '男'),
       ('s05', 'master01', '周梅', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1991-12-01', '女'),
       ('s06', 'master01', '吴兰', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1992-03-01', '女'),
       ('s07', 'master01', '郑竹', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1989-07-01', '女'),
       ('s08', 'master01', '王菊', '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW', '1990-01-20', '女');

create table t_course
(
    id          varchar(36) not null primary key,
    course_name varchar(50) not null,
    teacher_id  varchar(36) not null,
    version     bigint    default 0,
    create_time timestamp default CURRENT_TIMESTAMP,
    update_time timestamp
);
comment on table t_course is '课程';
insert into t_course(id, course_name, teacher_id)
values ('c01', '语文', 't02'),
       ('c02', '数学', 't01'),
       ('c03', '英语', 't03');

create table t_score
(
    student_id  varchar(36)    not null,
    course_id   varchar(36)    not null,
    score       decimal(18, 1) not null,
    version     bigint    default 0,
    create_time timestamp default CURRENT_TIMESTAMP,
    update_time timestamp
);
comment on table t_score is '成绩';
insert into t_score(student_id, course_id, score)
values ('s01', 'c01', 80),
       ('s01', 'c02', 90),
       ('s01', 'c03', 99),
       ('s02', 'c01', 70),
       ('s02', 'c02', 60),
       ('s02', 'c03', 80),
       ('s03', 'c01', 80),
       ('s03', 'c02', 80),
       ('s03', 'c03', 80),
       ('s04', 'c01', 50),
       ('s04', 'c02', 30),
       ('s04', 'c03', 20),
       ('s05', 'c01', 76),
       ('s05', 'c02', 87),
       ('s06', 'c01', 31),
       ('s06', 'c03', 34),
       ('s07', 'c02', 89),
       ('s07', 'c03', 98);

-- 1.查询”c01“课程比”c02“课程成绩高的学生的信息及课程分数
select a.username,b.score,c.score from t_student a
left join t_score b on a.id=b.student_id and b.course_id='c01'
left join t_score c on a.id=c.student_id and c.course_id='c02'
where b.score > c.score;

-- 2.查询平均成绩大于等于 60 分的同学的学生编号和学生姓名和平均成绩
select b.student_id,c.username,b.avg_score
from (select a.student_id,round(avg(a.score),1) avg_score from t_score a group by a.student_id having round(avg(a.score),1)>60) b
left join t_student c on b.student_id=c.id;

-- 3.查询在 t_score 表存在成绩的学生信息
select a.username,a.birthday,a.gender from t_student a where exists(select 1 from t_score b where a.id=b.student_id);

-- 4.查询所有同学的学生编号、学生姓名、选课总数、所有课程的总成绩(没成绩的显示为 null )
select a.id,a.username,c.course_no,c.sum_score from t_student a
left join (select b.student_id,count(b.course_id) course_no,sum(b.score) sum_score from t_score b group by b.student_id) c
on a.id=c.student_id;

-- 5.查有成绩的学生信息
select a.id,a.username from t_student a
where exists(select 1 from t_score b where a.id=b.student_id);

-- 6.查询「李」姓老师的数量
-- select a.username,count(a.id) from t_teacher a where a.username like '李%' group by a.username;
select count(a.id) from t_teacher a where a.username like '李%';

-- 7.查询学过「张三」老师授课的同学的信息
-- select a.username,a.birthday,a.gender from t_student a;
-- select b.id from t_teacher b where b.username='张三'; -- t01
-- select c.id from t_course c where c.teacher_id='t01'; -- c02
-- select d.* from t_score d where d.course_id='c02';

select a.id,a.username,a.birthday,a.gender from t_student a
where exists(
    select 1 from t_score d where d.student_id=a.id and exists(
        select 1 from t_course c where c.id=d.course_id and exists(
            select 1 from t_teacher b where b.username='张三' and b.id=c.teacher_id
        )
    )
);
-- 8.查询没有学全所有课程的同学的信息
select b.student_id,e.username,e.birthday,e.gender from
    (select a.student_id,count(a.course_id) course_no from t_score a group by a.student_id) b,
    (select count(c.id) course_no from t_course c) d,
    t_student e
where b.course_no<d.course_no and b.student_id=e.id;

-- 9.查询和”s01“号的同学学习的课程完全相同的其他同学的信息
select e.id,e.username,e.birthday,e.gender from (
  select b.student_id,count(b.course_id) course_no
    from t_score b where b.course_id in (select a.course_id from t_score a where a.student_id='s01')
  group by b.student_id) c,
  t_student e
where c.student_id<>'s01' and c.course_no = (select count(d.course_id) from t_score d where d.student_id='s01')
and c.student_id=e.id order by e.id;

-- 10.查询至少有一门课与学号为”s01“的同学所学相同的同学的信息
select a.id,a.username,a.birthday,a.gender from t_student a
where exists(select 1 from (
   select c.student_id from t_score c where c.course_id in (select d.course_id from t_score d where d.student_id='s01')
) b where a.id=b.student_id) and a.id<>'s01'
order by a.id;

-- 11.查询没学过”张三”老师讲授的任一门课程的学生姓名
select d.id,d.username,d.birthday,d.gender from t_student d
  where not exists(select 1 from (
    select distinct c.student_id from t_score c where c.course_id in (
      select a.id from t_course a where exists(select 1 from t_teacher b where b.username='张三' and b.id=a.teacher_id)
    )
  ) e where d.id=e.student_id)
order by d.id;

-- 12.查询两门及其以上不及格课程的同学的学号，姓名及其平均成绩
-- select a.student_id,a.course_id,a.score from t_score a where a.score<60
select d.student_id,e.username,d.avg_score from (
  select b.student_id,round(avg(b.score),1) avg_score from t_score b
  where exists(select 1 from (
  select a.student_id, count(a.course_id) course_no
    from t_score a where a.score<60 group by a.student_id having count(a.course_id)>=2)c where c.student_id=b.student_id)
  group by b.student_id) d
left join t_student e on d.student_id=e.id;

-- 13.检索”c01“课程分数小于 60，按分数降序排列的学生信息
select a.student_id,b.username,b.birthday,b.gender,a.score from t_score a
left join t_student b on a.student_id=b.id
where a.course_id='c01' and a.score<60 order by a.score desc;

-- 14.按平均成绩从高到低显示所有学生的所有课程的成绩以及平均成绩
select a.student_id,round(avg(a.score),1) avg_score,json_object_agg(a.course_id,a.score order by a.course_id) course_score
from t_score a group by a.student_id order by avg_score desc \gdesc

-- 15.查询各科成绩最高分、最低分和平均分，以如下形式显示：课程ID，课程name，最高分，最低分，平均分，及格率，中等率，优良率，优秀率(及格为>=60，中等为：70-80，优良为：80-90，优秀为：>=90）。
-- 要求输出课程号和选修人数，查询结果按人数降序排列，若人数相同，按课程号升序排列
select b.course_id,c.course_name,b.max_score, b.min_score, b.avg_score, b.及格率, b.中等率, b.优良率, b.优秀率, b.选修人数 from (
select a.course_id,max(a.score) max_score,min(a.score) min_score,round(avg(a.score),1) avg_score,
 round(avg(case when a.score>=60 then 1 else 0 end),2) 及格率,
 round(avg(case when a.score>=70 and a.score<80  then 1 else 0 end),2) 中等率,
 round(avg(case when a.score>=80 and a.score<90 then 1 else 0 end),2) 优良率,
 round(avg(case when a.score>=90 then 1 else 0 end),2) 优秀率,
 count(a.student_id) 选修人数
from t_score a
group by a.course_id) b left join t_course c on b.course_id=c.id
order by b.选修人数 desc,b.course_id;

-- 16.按平均成绩进行排序，显示总排名和各科排名，score 重复时保留名次空缺

-- 17.按平均成绩进行排序，显示总排名和各科排名，score 重复时合并名次
--
-- 18.统计各科成绩各分数段人数：课程编号，课程名称，[100-85]，[85-70]，[70-60]，[60-0] 及所占百分比
select b.course_id,c.course_name,total_no_students,
       more_than_85,round((b.more_than_85/b.total_no_students::float)::numeric,2)*100||'%' more_than_85_percent,
       more_than_70,round((b.more_than_70/b.total_no_students::float)::numeric,2)*100||'%' more_than_70_percent,
       more_than_60,round((b.more_than_60/b.total_no_students::float)::numeric,2)*100||'%' more_than_60_percent,
       less_than_60,round((b.less_than_60/b.total_no_students::float)::numeric,2)*100||'%' less_than_60_percent
from (
select a.course_id,
       sum(case when a.score>=85 then 1 else 0 end) more_than_85,
       sum(case when a.score>=70 and a.score<85 then 1 else 0 end) more_than_70,
       sum(case when a.score>=60 and a.score<70 then 1 else 0 end) more_than_60,
       sum(case when a.score<60 then 1 else 0 end) less_than_60,
       count(a.student_id) total_no_students
from t_score a group by a.course_id) b
left join t_course c on b.course_id=c.id;

-- 19.查询各科成绩前三名的记录
select b.course_id,json_object_agg(b.student_id,b.score order by b.score desc,b.student_id) top_three
from (select  a.*,row_number() over (partition by a.course_id order by a.score desc) as rn from t_score a) b
where b.rn<=3 group by b.course_id;

-- 20.查询出只选修两门课程的学生学号和姓名
select a.student_id,b.username,count(a.course_id) total_no_course from t_score a
left join t_student b on a.student_id=b.id
group by a.student_id,b.username having count(a.course_id)=2;

-- 21.查询名字中含有「风」字的学生信息
select id,username,birthday,gender from t_student where username like '%风%';

-- 22.查询 1990 年出生的学生名单
select id,username,birthday,gender from t_student where extract(year from birthday)=1990;

-- 23.成绩不重复，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩
select d.course_id,e.student_id,f.username,f.birthday,f.gender,e.score from (
select a.course_id,max(a.score) max_score
from t_score a where exists(select 1 from t_teacher b inner join t_course c on b.id=c.teacher_id where b.username='张三' and a.course_id=c.id)
group by a.course_id) d
left join t_score e on d.course_id=e.course_id and d.max_score=e.score
left join t_student f on e.student_id=f.id;

-- 24.成绩有重复的情况下，查询选修「张三」老师所授课程的学生中，成绩最高的学生信息及其成绩
--
-- 25.查询各学生的年龄，只按年份来算
select id,username,birthday,date_part('year', age(current_date, birthday))::int age from t_student;
-- 26.按照出生日期来算，当前月日 < 出生年月的月日则，年龄减一
select c.id,c.username,c.birthday,c.s_age_year+(case when c.s_age_month>=6 then 1 else 0 end) age from (
select b.id,b.username,b.birthday,date_part('year',b.s_age)::int s_age_year, date_part('month',b.s_age)::int s_age_month
from (select a.id,a.username,a.birthday,age(current_date, a.birthday) s_age from t_student a) b) c;

-- 27.查询本周过生日的学生
select b.id,b.username,b.birthday,b.start_date,b.end_date,
       (case when b.current_year between b.start_date and b.end_date then 1 else 0 end) is_current_week
from (select a.id,a.username,a.birthday,(date_part('year',current_date)||'-'||to_char(a.birthday,'MM-DD'))::date current_year,to_char(date_trunc('week',current_date) - interval '1' day,'YYYY-MM-DD')::date start_date,to_char(date_trunc('week',current_date) + interval '5' day,'YYYY-MM-DD')::date end_date from t_student a) b;

-- 28.查询本月过生日的学生
select b.id,b.username,b.birthday,b.start_date,b.end_date,
       (case when b.current_year between b.start_date and b.end_date then 1 else 0 end) is_current_month
from (select a.id,a.username,a.birthday,(date_part('year',current_date)||'-'||to_char(a.birthday,'MM-DD'))::date current_year,to_char(date_trunc('month',current_date),'YYYY-MM-DD')::date start_date,to_char(date_trunc('month',current_date) + interval '1' month - interval '1' day,'YYYY-MM-DD')::date end_date from t_student a) b;

-- 29.查询下月过生日的学生
select b.id,b.username,b.birthday,b.start_date,b.end_date,
       (case when b.current_year between b.start_date and b.end_date then 1 else 0 end) is_current_month
from (select a.id,a.username,a.birthday,(date_part('year',current_date)||'-'||to_char(a.birthday,'MM-DD'))::date current_year,to_char(date_trunc('month',current_date)+ interval '1' month,'YYYY-MM-DD')::date start_date,to_char(date_trunc('month',current_date) + interval '2' month - interval '1' day,'YYYY-MM-DD')::date end_date from t_student a) b;
