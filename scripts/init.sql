CREATE DATABASE IF NOT EXISTS restaurant_planner_app;

USE restaurant_planner_app;


CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(128),
    email VARCHAR(255),
    firstname VARCHAR(35),
    lastname VARCHAR(35),
    PRIMARY KEY (uid)
);

<<<<<<< HEAD
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
=======
CREATE TABLE IF NOT EXISTS events (
    event_id BIGINT AUTO_INCREMENT,
    event_name VARCHAR(50),
    host_id VARCHAR(128),
    duration INT,
    PRIMARY KEY(event_id),
    FOREIGN KEY (host_id) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS restaurants (
    place_id VARCHAR(128),
    name VARCHAR(50),
    address VARCHAR(100),
    rating FLOAT,
    -- opening_hours VARCHAR(100),
    PRIMARY KEY(place_id)
);

CREATE TABLE IF NOT EXISTS participants (
    event_id BIGINT,
    uid VARCHAR(128),
    PRIMARY KEY(event_id, uid),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS time_candidates (
    time_candidates_id BIGINT AUTO_INCREMENT,
    event_id BIGINT,
    timeslot VARCHAR(128),
    PRIMARY KEY(time_candidates_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS time_votes (
    time_candidates_id BIGINT, uid VARCHAR(128),
    PRIMARY KEY(time_candidates_id, uid),
    FOREIGN KEY (time_candidates_id) REFERENCES time_candidates(time_candidates_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
);

CREATE TABLE If NOT EXISTS place_candidates (
    place_candidates_id BIGINT AUTO_INCREMENT,
    event_id BIGINT, place_id VARCHAR(128),
    PRIMARY KEY(place_candidates_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    FOREIGN KEY (place_id) REFERENCES restaurants(place_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS place_votes (
    place_candidates_id BIGINT,
    uid VARCHAR(128),
    PRIMARY KEY(place_candidates_id, uid),
    FOREIGN KEY (place_candidates_id) REFERENCES place_candidates(place_candidates_id) ON DELETE CASCADE,
    FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE
); 




/* test data */
INSERT INTO test (id, name) VALUES (1, 'random name 1');
INSERT INTO test (id, name) VALUES (2, 'random name 2');
INSERT INTO users (uid, email, firstname, lastname) VALUES ("uid1", "test1@test.com", "test_first_name", "test_last_name");
INSERT INTO users (uid, email, firstname, lastname) VALUES ("uid2", "test2@test.com", "test_first_name2", "test_last_name2");
INSERT INTO events (event_id, event_name, host_id, duration) VALUES (1, "test_event_name", "uid1", 60);
INSERT INTO restaurants (place_id, name, address, rating) VALUES ("place_id1", "test_restaurant_name", "test_restaurant_address", 4.5 );
INSERT INTO restaurants (place_id, name, address, rating) VALUES ("place_id2", "test_restaurant_name2", "test_restaurant_address2", 4.0);
INSERT INTO participants (event_id, uid) VALUES (1, "uid1");
INSERT INTO time_candidates (time_candidates_id, event_id, timeslot) VALUES (1, 1, "7PM to 8PM");
INSERT INTO place_candidates (place_candidates_id, event_id, place_id) VALUES (1, 1, "place_id1");
INSERT INTO place_candidates (place_candidates_id, event_id, place_id) VALUES (2, 1, "place_id2");
>>>>>>> 416e3952f1524a49e43cf6c008ad976789a6934d
