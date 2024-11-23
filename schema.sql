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
CREATE TABLE IF NOT EXISTS Spells (PlayerName TEXT, Level TEXT, Slots INTEGER, Spells TEXT, PRIMARY KEY (PlayerName, Level));
CREATE TABLE IF NOT EXISTS Campaigns (Name TEXT,PRIMARY KEY (Name));