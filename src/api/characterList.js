import { getThumbnail } from '../utils/CharProfilePics.js';

class Campaign {
  constructor(name, characters) {
    this.name = name;
    this.characters = characters;
  }
}

class Character {
  constructor(name, pictureUrl) {
    this.name = name;
    this.pictureUrl = pictureUrl;
  }
}

export async function getList(env) {
  let campaignNames = await env.DB.prepare('SELECT Name FROM Campaigns').run();
  let list = [];

  for (const campaignName of campaignNames.results) {
    let campaign = await createCampaign(campaignName.Name, env);
    list.push(campaign);
  }

  console.log(list);
  return list;
}

async function createCampaign(campaignName, env) {
  let characters = [];
  let characterNames = await env.DB.prepare(
    'SELECT PlayerName FROM CharacterDetails WHERE Campaign = ?1',
  )
    .bind(campaignName)
    .run();

  characterNames.results.forEach((characterName) => {
    let character = new Character(
      characterName.PlayerName,
      getThumbnail(characterName.PlayerName),
    );
    characters.push(character);
  });
  return new Campaign(campaignName, characters);
}
