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

//TODO: change to return info from DB instead
export async function getList(env) {
  let campaigns = [];
  let characters = [];
  let ruut = new Character('Ruut', getThumbnail('Ruut'));
  let xulle = new Character('Xulle', getThumbnail('Xulle'));
  let cara = new Character('Cara', getThumbnail('Cara'));
  characters.push(ruut);
  characters.push(xulle);
  characters.push(cara);

  let campaign = new Campaign('Gods of Corrupt Fate', characters);
  campaigns.push(campaign);

  return campaigns;
}
