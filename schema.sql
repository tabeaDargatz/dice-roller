CREATE TABLE IF NOT EXISTS Statistic (PlayerName TEXT, Measurement TEXT, Count INTEGER, PRIMARY KEY (PlayerName, Measurement));
CREATE TABLE IF NOT EXISTS SkillModifiers (PlayerName TEXT, Skill TEXT, Modifier INTEGER, PRIMARY KEY (PlayerName, Skill));
CREATE TABLE IF NOT EXISTS CharacterDetails (PlayerName TEXT, Age INTEGER, Gender TEXT, Height TEXT, Weight TEXT, Hair TEXT, Eyes TEXT, Skin TEXT, Alignment TEXT, Faith TEXT,
Backstory TEXT, Personality TEXT, Strength INTEGER, Dexterity INTEGER, Constitution INTEGER, Intelligence INTEGER, Wisdom INTEGER, Charisma INTEGER, Hp INTEGER, Ac INTEGER, 
Speed INTEGER, InitiativeBonus INTEGER, SpellAtkBonus INTEGER, SpellMod INTEGER, ClassFeatures TEXT, SpeciesTraits TEXT, Actions TEXT, BonusActions TEXT, Level INTEGER, 
Class TEXT, Race TEXT,  PRIMARY KEY (PlayerName));

INSERT INTO CharacterDetails (PlayerName, Age, Gender, Height, Weight, Hair, Eyes, Skin, Alignment, Faith, Backstory, Personality, Strength, Dexterity, Constitution, 
Intelligence, Wisdom, Charisma, Hp, Ac, Speed, InitiativeBonus, SpellAtkBonus, SpellMod, ClassFeatures, SpeciesTraits, Actions, BonusActions, Level, Class, Race)
VALUES ('Cara', 20, 'Female', '160cm', '55kg', 'long, brown', 'green', 'pale', 'chaotic good','none','She is a cool bean', 'Awesome personality', 11,15,16,10,10,18,
19,13,30,2,4,4,'Bardic Inspiration blabla', 'humans get heroic inspiration after long rest',
'Attack,Dash,Disengage,Dodge,Grapple,Help,Hide,Improvise,Influence,Magic,Ready,Search,Shove,Study,Utilize','Can give bardic inspiration',2,'Bard','Human');