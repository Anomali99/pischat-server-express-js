drop database if exists db_pisces;
create database  `db_pisces`;

use db_pisces;

create table if not exists `users` (
  `user_id` int auto_increment,
  `user_uuid` text not null,
  `username` varchar(50) not null,
  `password` text not null,
  `name` varchar(50) not null,
  primary key(`user_id`)
) engine=InnoDB default charset=utf8;

create table if not exists `chats`(
  `chat_id` int auto_increment,
  `chat_uuid` text not null,
  `user_from_id` int not null,
  `user_from_uuid` text not null,
  `user_to_id` int not null,
  `user_to_uuid` text not null,
  `message` text not null,
  `read` boolean not null default false,
  `datetime` datetime not null, 
  primary key(`chat_id`),
  constraint `fk_user_from_id` foreign key (`user_from_id`) references `users`(user_id),
  constraint `fk_user_to_id` foreign key (`user_to_id`) references `users`(user_id)
) engine=InnoDB default charset=utf8;
