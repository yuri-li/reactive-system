create table t_schoolmaster
(
    id           varchar(36) not null primary key,
    username     varchar(50) not null,
    country_code varchar(4)  not null,
    phone_no     varchar(11) not null,
    password     varchar(65) not null,
    version      bigint    default 0,
    create_time  timestamp default CURRENT_TIMESTAMP,
    update_time  timestamp
);
comment on table t_schoolmaster is '校长';

-- 1. 检查表是否为空/10万条数据
truncate table t_schoolmaster;
select count(*) from t_schoolmaster;
select * from t_schoolmaster limit 10;
-- 2. 快速插入10万条测试数据
insert into t_schoolmaster(id,username,country_code, phone_no,password)
select uuid_in(md5(random()::text || random()::text)::cstring) as id,
       'user-'||generate_series(1,100000)::text as username,
       '86' as country_code,
       '13753532765' as phone_no,
       '$2a$04$IQye8lEkPEmS8lu4hwCzOeQb.Yw4Wzm9d7LNTGWHv5R3ELp6AtVSW' as password;
