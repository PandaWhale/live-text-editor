CREATE TABLE users
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  username VARCHAR(50) NOT NULL,
  password VARCHAR(250) NOT NULL
);

CREATE TABLE rooms
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  room_name VARCHAR(50) NOT NULL,
  contents VARCHAR(50) NOT NULL,
  UNIQUE (room_name)
);

CREATE TABLE user_rooms
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  users_id BIGINT REFERENCES users(id),
  rooms_id BIGINT REFERENCES rooms(id)
);

CREATE TABLE sessions
(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  sId BIGINT NOT NULL,
  users_id BIGINT REFERENCES users(id)
);



ALTER TABLE users ADD user_rooms_id BIGINT REFERENCES user_rooms(id);
ALTER TABLE rooms ADD user_rooms_id BIGINT REFERENCES user_rooms(id);