CREATE DATABASE IF NOT EXISTS restaurant_planner_app;

USE restaurant_planner_app;


CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(100) PRIMARY KEY, 
    firstname VARCHAR(100) NOT NULL, 
    lastname VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name VARCHAR(30));
CREATE TABLE IF NOT EXISTS users (uid VARCHAR(128), name VARCHAR(30), email VARCHAR(255), first_name VARCHAR(35), last_name VARCHAR(35), PRIMARY KEY (uid));

CREATE TABLE IF NOT EXISTS events 
(
event_id BIGINT AUTO_INCREMENT, 
event_name VARCHAR(50) NOT NULL, 
event_description VARCHAR(500) NOT NULL, -- Ryan added this
-- host_id VARCHAR(128) DEFAULT 999, -- Ryan added default for checkpoint 2  
-- duration INT DEFAULT 60,  -- Ryan addded default for checkpoint 2
PRIMARY KEY(event_id)
-- FOREIGN KEY (host_id) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS restaurants (place_id VARCHAR(128), name VARCHAR(50), address VARCHAR(100), rating FLOAT, opening_hours VARCHAR(100), PRIMARY KEY(place_id));
CREATE TABLE IF NOT EXISTS participants (event_id BIGINT, uid VARCHAR(128), PRIMARY KEY(event_id, uid), FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE, FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS time_candidates (time_candidates_id BIGINT AUTO_INCREMENT, event_id BIGINT, timeslot VARCHAR(128), PRIMARY KEY(time_candidates_id), FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS time_votes (time_candidates_id BIGINT, uid VARCHAR(128), PRIMARY KEY(time_candidates_id, uid), FOREIGN KEY (time_candidates_id) REFERENCES time_candidates(time_candidates_id) ON DELETE CASCADE, FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE);
CREATE TABLE If NOT EXISTS place_candidates (place_candidates_id BIGINT AUTO_INCREMENT, event_id BIGINT, place_id VARCHAR(128), PRIMARY KEY(place_candidates_id), FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE, FOREIGN KEY (place_id) REFERENCES restaurants(place_id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS place_votes (place_candidates_id BIGINT, uid VARCHAR(128), PRIMARY KEY(place_candidates_id, uid), FOREIGN KEY (place_candidates_id) REFERENCES place_candidates(place_candidates_id) ON DELETE CASCADE, FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE); 


-- INSERT INTO test (id, name) VALUES (1, 'random name 1');
-- INSERT INTO test (id, name) VALUES (2, 'random name 2');

INSERT INTO events (event_name, event_description) 
VALUES ('event 1', 'event 1 description');
INSERT INTO events (event_name, event_description) 
VALUES ('event 2', 'event 2 description');

/*
Ryan Test:

docker run --name mysql-test -e MYSQL_ROOT_PASSWORD=secret -p 3307:3306 -d mysql
docker exec -i mysql-test mysql -u root -psecret < init.sql
*/