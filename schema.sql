CREATE TABLE IF NOT EXISTS Statistic (PlayerName TEXT, Measurement TEXT, Count INTEGER, PRIMARY KEY (PlayerName, Measurement));
INSERT INTO Statistic (PlayerName, Measurement, Count)
VALUES ('Cara', 'Nat20s', 0);

CREATE TABLE IF NOT EXISTS SkillModifiers (PlayerName TEXT, Skill TEXT, Modifier INTEGER, PRIMARY KEY (PlayerName, Skill));
INSERT INTO SkillModifiers (PlayerName, Skill, Modifier)
VALUES ('Cara', 'Deception', 2);


CREATE TABLE IF NOT EXISTS CharacterDetails (PlayerName TEXT, Age INTEGER, Gender TEXT, Height TEXT, Weight TEXT, Hair TEXT, Eyes TEXT, Skin TEXT, Alignment TEXT, Faith TEXT,  PRIMARY KEY (PlayerName));
INSERT INTO CharacterDetails (PlayerName, Age, Gender, Height, Weight, Hair, Eyes, Skin, Alignment, Faith)
VALUES ('Cara', 20, 'Female', '160cm', '55kg', 'long, brown', 'green', 'pale', 'chaotic good','none');