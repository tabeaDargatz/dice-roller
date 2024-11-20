CREATE TABLE IF NOT EXISTS Statistic (PlayerName TEXT, Measurement TEXT, Count INTEGER, PRIMARY KEY (PlayerName, Measurement));
CREATE TABLE IF NOT EXISTS SkillModifiers (PlayerName TEXT, Skill TEXT, Modifier INTEGER, PRIMARY KEY (PlayerName, Skill));
CREATE TABLE IF NOT EXISTS CharacterDetails (PlayerName TEXT, Age INTEGER, Gender TEXT, Height TEXT, Weight TEXT, Hair TEXT, Eyes TEXT, Skin TEXT, Alignment TEXT, Faith TEXT,
Backstory TEXT, Personality TEXT, Strength INTEGER, Dexterity INTEGER, Constitution INTEGER, Intelligence INTEGER, Wisdom INTEGER, Charisma INTEGER, Hp INTEGER, Ac INTEGER, 
Speed INTEGER, InitiativeBonus INTEGER, SpellAtkBonus INTEGER, SpellMod INTEGER, ClassFeatures TEXT, SpeciesTraits TEXT, Actions TEXT, BonusActions TEXT, Level INTEGER, 
Class TEXT, Race TEXT,  PRIMARY KEY (PlayerName));
CREATE TABLE IF NOT EXISTS Languages (PlayerName TEXT, Language TEXT, PRIMARY KEY (PlayerName, Language));
CREATE TABLE IF NOT EXISTS Tools (PlayerName TEXT, Tool TEXT, PRIMARY KEY (PlayerName, Tool));
CREATE TABLE IF NOT EXISTS Proficiencies (PlayerName TEXT, Proficiency TEXT, PRIMARY KEY (PlayerName, Proficiency));
CREATE TABLE IF NOT EXISTS InventoryItems (PlayerName TEXT, Item TEXT, PRIMARY KEY (PlayerName, Item));
/*
INSERT INTO CharacterDetails
VALUES ('Xulle', '94', 'female','6''3"','212lb','Gray to jet black', 'dark w/ gold', 'light gray', 'chaotic neutral','none',
'She is a witch that always preferred to be alone with nature, she holed up in a small cottage deep in the forest and lived off of her land for many years until a group of goblins pushed her out of her home. Now she is a traveling bounty hunter looking for a new home to retire to.',
'CAUTIOUS, OBSERVANT, QUIET, CUNNING,  PERCEPTIVE, CURIOUS, CRAFTY. CLUMSY, GREEDY, NERVOUS, INTIMIDATING, UNTRUSTING, JUDGEMENTAL. Their most treasured possession was her home before it was taken from her and she was forced out of the forest she grew up in.  Now she cares about protecting herself and nature and tries to limit herself to focusing on those ideals.',
 18,13,14,12,15,8,12,11,30,1,4,2,'Always has Hunter''s Mark prepared and can cast it without expending a spell slot 2x per Long Rest','Darkvision 120 ft., advantage on saving throws to avoid/end the Charmed condition, can''t be put to sleep',
 'Attack, Magic, Dash, Disengage, Dodge, Help, Hide, Ready, Search, Utilize, Opportunity Attack, Grapple, Shove, Improvise, Two-Weapon Fighting, Interact with an Object, Study, Influence', 
 'Hunter''s Mark',2,'Ranger','Drow');

 /*