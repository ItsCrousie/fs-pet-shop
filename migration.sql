DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
  id serial NOT NULL PRIMARY KEY,
  age int,
  kind varchar(255),
  name varchar(60)
);

