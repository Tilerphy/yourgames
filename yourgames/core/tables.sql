create table users (id varchar(36) primary key, username varchar(100), password varchar(512), icon varchar(2048));
create table games(id varchar(36) primary key, name varchar(100), icon varchar(2048), description text);
create table infos(id varchar(36) primary key, uid int, gid int);
create table baseinfo(id int primary key auto_increment, created_time bigint, modified_time bigint, oid varchar(36));
create table users_state(id varchar(36) primary key, uid varchar(36));
create table test(id varchar(36) primary key, val varchar(512));

create index users_index on users (id, username);
create index games_index on games(id, name);
create index infos_index on infos(id,uid,gid);
create index users_state_index on users_state(id, uid);

DELIMITER |
create trigger insert_test after insert on test
for each row
begin
insert into baseinfo (id, created_time,modified_time, oid) values(0, unix_timestamp(),unix_timestamp(), new.id);
end|

create trigger insert_users after insert on users
for each row
begin
insert into baseinfo (id, created_time,modified_time, oid) values(0, unix_timestamp(),unix_timestamp(), new.id);
end|

create trigger insert_games after insert on games
for each row
begin
insert into baseinfo (id, created_time,modified_time, oid) values(0, unix_timestamp(),unix_timestamp(), new.id);
end|

create trigger insert_infos after insert on infos
for each row
begin
insert into baseinfo (id, created_time,modified_time, oid) values(0, unix_timestamp(),unix_timestamp(), new.id);
end|

create trigger insert_users_state after insert on users_state
for each row
begin
insert into baseinfo (id, created_time,modified_time, oid) values(0, unix_timestamp(),unix_timestamp(), new.id);
end|

create trigger update_test after update on test
for each row
begin
update baseinfo set modified_time = unix_timestamp() where oid = old.id;
end|

create trigger update_users after update on users
for each row
begin
update baseinfo set modified_time = unix_timestamp() where oid = old.id;
end|

create trigger update_games after update on games
for each row
begin
update baseinfo set modified_time = unix_timestamp() where oid = old.id;
end|

create trigger update_infos after update on infos
for each row
begin
update baseinfo set modified_time = unix_timestamp() where oid = old.id;
end|

create trigger update_users_state after update on users_state
for each row
begin
update baseinfo set modified_time = unix_timestamp() where oid = old.id;
end|


create trigger delete_test after delete on test
for each row
begin
delete from baseinfo where oid = old.id;
end|

create trigger delete_users after delete on users
for each row
begin
delete from baseinfo where oid = old.id;
end|

create trigger delete_games after delete on games
for each row
begin
delete from baseinfo where oid = old.id;
end|

create trigger delete_infos after delete on infos
for each row
begin
delete from baseinfo where oid = old.id;
end|

create trigger delete_users_state after delete on users_state
for each row
begin
delete from baseinfo where oid = old.id;
end|


DELIMITER ;