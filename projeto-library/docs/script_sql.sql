create database biblioteca;

drop database biblioteca;

create table livro(
	id serial primary key,
	titulo varchar(50) not null,
	autor varchar(50) not null,
	numeroPaginas integer not null,
	estado varchar(7) not null,
	status varchar(8) not null
);

drop table livro;
