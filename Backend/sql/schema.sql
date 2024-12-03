-- CS4400: Introduction to Database Systems (Fall 2024)
-- Project Phase II: Database Schema SOLUTION [v0] Monday, Oct 21, 2024
set global transaction isolation level serializable;
set global SQL_MODE = 'ANSI,TRADITIONAL';
set names utf8mb4;
set SQL_SAFE_UPDATES = 0;
SET SESSION sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

set @thisDatabase = 'business_supply';
drop database if exists business_supply;
create database if not exists business_supply;
use business_supply;

-- -----------------------------------------------
-- table structures
-- -----------------------------------------------

create table users (
username varchar(40) not null,
first_name varchar(100) not null,
last_name varchar(100) not null,
address varchar(500) not null,
birthdate date not null,
primary key (username)
) engine = innodb;

create table employees (
username varchar(40) not null,
taxID varchar(40) not null,
hired date not null,
experience integer not null,
salary integer not null,
primary key (username),
unique key (taxID)
) engine = innodb;

create table business_owners (
username varchar(40) not null,
primary key (username)
) engine = innodb;

create table drivers (
username varchar(40) not null,
licenseID varchar(40) not null,
license_type varchar(100) not null,
successful_trips integer not null,
primary key (username),
unique key (licenseID)
) engine = innodb;

create table workers (
username varchar(40) not null,
primary key (username)
) engine = innodb;

create table products (
barcode varchar(40) not null,
iname varchar(100) not null,
weight integer not null,
primary key (barcode)
) engine = innodb;

create table locations (
label varchar(40) not null,
x_coord integer not null,
y_coord integer not null,
space integer,
primary key (label)
) engine = innodb;

create table businesses (
long_name varchar(40) not null,
rating integer not null,
spent integer not null,
location varchar(40) not null,
primary key (long_name)
) engine = innodb;

create table delivery_services (
id varchar(40) not null,
long_name varchar(100) not null,
home_base varchar(40) not null,
manager varchar(40),
primary key (id),
unique key (manager)
) engine = innodb;

create table vans (
id varchar(40) not null,
tag integer not null,
fuel integer not null,
capacity integer not null,
sales integer not null,
driven_by varchar(40) default null,
located_at varchar(40) not null,
primary key (id, tag)
) engine = innodb;

create table contain (
id varchar(40) not null,
tag integer not null,
barcode varchar(40) not null,
quantity integer not null,
price integer not null,
primary key (id, tag, barcode)
) engine = innodb;

create table work_for (
username varchar(40) not null,
id varchar(40) not null,
primary key (username, id)
) engine = innodb;

create table fund (
username varchar(40) not null, 
invested integer, 
invested_date date not null, 
business varchar(40) not null, 
primary key (username, business)
) engine=innodb;

-- -----------------------------------------------
-- referential structures
-- -----------------------------------------------

alter table employees add constraint fk1 foreign key (username) references users (username)
	on update cascade on delete cascade;
alter table business_owners add constraint fk2 foreign key (username)
	references users (username) on update cascade on delete cascade;
alter table drivers add constraint fk3 foreign key (username) references employees (username)
	on update cascade on delete cascade;
alter table workers add constraint fk4 foreign key (username) references employees (username)
	on update cascade on delete cascade;
alter table businesses add constraint fk10 foreign key (location) references locations (label)
	on update cascade;
alter table delivery_services add constraint fk11 foreign key (home_base)
	references locations (label) on update cascade;
alter table delivery_services add constraint fk15 foreign key (manager)
	references workers (username);
alter table vans add constraint fk5 foreign key (id) references delivery_services (id);
alter table vans add constraint fk13 foreign key (driven_by) references drivers (username);
alter table vans add constraint fk16 foreign key (located_at) references locations (label)
	on update cascade;
alter table contain add constraint fk6 foreign key (id, tag) references vans (id, tag);
alter table contain add constraint fk7 foreign key (barcode) references products (barcode);
alter table work_for add constraint fk8 foreign key (username) references employees (username);
alter table work_for add constraint fk9 foreign key (id) references delivery_services (id);
alter table fund add constraint fk17 foreign key (username) references business_owners (username);
alter table fund add constraint fk18 foreign key (business) references businesses (long_name);
