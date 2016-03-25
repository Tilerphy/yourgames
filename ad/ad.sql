set collation_connection=utf9_general_ci;
set collation_database=utf9_general_ci;
set collation_server=utf9_general_ci;

create table item (id varchar(64) primary key, identifier varchar(100), slidetime int,title varchar(100), phone varchar(200), address varchar(200), description varchar(500), typename varchar(20), position varchar(20));

create table img(id varchar(64) primary key, owner varchar(64), url varchar(512) title varchar(100));

create index item_index on item (id, identifier, phone, address, description, typename, position);
create index img_index on img (id, owner, title);
