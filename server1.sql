DROP TABLE IF EXISTS workshops;

CREATE TABLE workshops (
	ID serial NOT NULL, 
	attendee Text NOT NULL,
	workshop Text NOT NULL default '',
	PRIMARY KEY (ID)
);

INSERT INTO workshops (attendee, workshop) VALUES ('Sarah Smith','DevOps 101');
INSERT INTO workshops (attendee, workshop) VALUES ('Brayden Doe','Docker Container Fundamentals');
INSERT INTO workshops (attendee, workshop) VALUES ('Parker Drover','Machine Learning');
INSERT INTO workshops (attendee, workshop) VALUES ('Sophie Fisher','MongoDB');
INSERT INTO workshops (attendee, workshop) VALUES ('Alec Spencer','React Fundamentals');

