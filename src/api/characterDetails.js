import { getThumbnail } from '../utils/CharProfilePics.js';

export async function getDetails(characterName, env) {
  let characterDetails = await env.DB.prepare(
    'SELECT * FROM CharacterDetails WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  characterDetails['Languages'] = await getLanguages(characterName, env);
  characterDetails['Tools'] = await getTools(characterName, env);
  characterDetails['Proficiencies'] = await getProficiencies(
    characterName,
    env,
  );
  characterDetails['Spells'] = await getSpells(characterName, env);
  characterDetails['Skills'] = await getSkills(characterName, env);
  characterDetails['Inventory'] = await getInventory(characterName, env);
  characterDetails['PictureUrl'] = getThumbnail(characterName);
  return characterDetails;
}

async function getSpells(characterName, env) {
  let spellsResult = await env.DB.prepare(
    'SELECT * FROM Spells WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  spellsResult.results.forEach((element) => {
    delete element['PlayerName'];
  });

  return spellsResult.results;
}

async function getInventory(characterName, env) {
  let inventoryResult = await env.DB.prepare(
    'SELECT * FROM InventoryItems WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  let items = [];
  inventoryResult.results.forEach((element) => {
    items.push(element.Item);
  });

  return items;
}

async function getSkills(characterName, env) {
  let skillsResult = await env.DB.prepare(
    'SELECT * FROM SkillModifiers WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  let skills = new Map();

  skillsResult.results.forEach((element) => {
    skills.set(element.Skill, element.Modifier);
  });

  return Object.fromEntries(skills);
}

async function getProficiencies(characterName, env) {
  let proficiencyResult = await env.DB.prepare(
    'SELECT * FROM Proficiencies WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  let proficiencies = [];
  proficiencyResult.results.forEach((element) => {
    proficiencies.push(element.Proficiency);
  });

  return proficiencies;
}

async function getTools(characterName, env) {
  let toolResult = await env.DB.prepare(
    'SELECT * FROM Tools WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  let tools = [];
  toolResult.results.forEach((element) => {
    tools.push(element.Tool);
  });

  return tools;
}

async function getLanguages(characterName, env) {
  let languageResult = await env.DB.prepare(
    'SELECT * FROM Languages WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  let languages = [];
  languageResult.results.forEach((element) => {
    languages.push(element.Language);
  });

  return languages;
}
