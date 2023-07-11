CREATE DATABASE IF NOT EXISTS restaurant_planner_app;

USE restaurant_planner_app;


CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(128),
    email VARCHAR(255),
    first_name VARCHAR(35),
    last_name VARCHAR(35),
    PRIMARY KEY (uid)
);

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







-- Populate table
-- CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name VARCHAR(30));
-- INSERT INTO test (id, name) VALUES (1, 'random name 1');
-- INSERT INTO test (id, name) VALUES (2, 'random name 2');

INSERT INTO users (uid, email, first_name, last_name) VALUES ('9oGAOJpMeCSI10KBqTPx95TA3OF3', 'test@gmail.com', 'tester', 'account' );
INSERT INTO users (uid, email, first_name, last_name) VALUES ('oAxwJgo0I0PA8oSMJzOYh811Ek32', 'kivinej210@niback.com', 'kivine', 'j210' );

INSERT INTO events (event_name, host_id, duration) VALUES ('Tiff birthday party', '9oGAOJpMeCSI10KBqTPx95TA3OF3', 2 );  -- test@
INSERT INTO events (event_name, host_id, duration) VALUES ("mike's dinner", 'oAxwJgo0I0PA8oSMJzOYh811Ek32', 5 );        -- kivineh@
INSERT INTO events (event_name, host_id, duration) VALUES ("travel celebration", 'oAxwJgo0I0PA8oSMJzOYh811Ek32', 3 ); 


-- kivineh@ hosted
INSERT INTO participants (event_id, uid) VALUES (1, "9oGAOJpMeCSI10KBqTPx95TA3OF3");

-- kivineh@ invited
INSERT INTO participants (event_id, uid) VALUES (2, "oAxwJgo0I0PA8oSMJzOYh811Ek32");
INSERT INTO participants (event_id, uid) VALUES (2, "9oGAOJpMeCSI10KBqTPx95TA3OF3");

INSERT INTO participants (event_id, uid) VALUES (3, "oAxwJgo0I0PA8oSMJzOYh811Ek32");


