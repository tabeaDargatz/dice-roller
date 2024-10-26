CREATE TABLE IF NOT EXISTS Statistic (PlayerName TEXT, Measurement TEXT, Count INTEGER, PRIMARY KEY (PlayerName, Measurement));
INSERT INTO Statistic (PlayerName, Measurement, Count)
VALUES ('Cara', 'Nat20s', 0);

CREATE TABLE IF NOT EXISTS SkillModifiers (PlayerName TEXT, Skill TEXT, Modifier INTEGER, PRIMARY KEY (PlayerName, Skill));
INSERT INTO SkillModifiers (PlayerName, Skill, Modifier)
VALUES ('Cara', 'Deception', 2);
