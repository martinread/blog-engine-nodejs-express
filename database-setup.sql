drop table if exists Users;
drop table if exists Articles;
drop table if exists Comments;

create table Users (
    username varchar(20) not null primary key,
    password varchar(30) not null,
    country varchar(30) not null,
    fname varchar(30) not null,
    lname varchar(50) not null
);

create table Articles (
    articleId integer not null primary key autoincrement,
    author varchar(20),
    timestamp TIMESTAMP,
    title varchar(100),
    content text,
    foreign key (author) references Users (username)
);

create table Comments (
    commentId integer not null primary key autoincrement,
    articleId integer,
    author varchar(20),
    timestamp TIMESTAMP,
    content text,
    foreign key (author) references Users (username),
    foreign key (articleId) references Articles (articleId)
);

insert into Users values
    ('admin', 'admin', 'New Zealand', 'admin', 'admin');
