CREATE DATABASE IF NOT EXISTS restaurant_planner_app;

USE restaurant_planner_app;


CREATE TABLE IF NOT EXISTS users (
    uid VARCHAR(100) PRIMARY KEY, 
    firstname VARCHAR(100) NOT NULL, 
    lastname VARCHAR(100) NOT NULL, 
    email VARCHAR(100) NOT NULL
);






CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name VARCHAR(30));

INSERT INTO test (id, name) VALUES (1, 'random name 1');
INSERT INTO test (id, name) VALUES (2, 'random name 2');