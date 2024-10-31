const defaultRowLength = 34; //34 whitespace characters needed to fill the row between the borders
const chunkSize = 4; // Number of values per row
const defaultSumRowLength = 7;
const defaultRollRowLength = defaultRowLength - defaultSumRowLength - 1;
const measurementNat20 = 'Nat20s';
const measurementCritFail = 'CritFails';
import { logStats } from './statistics.js';
import { getSkillBonus } from './skillModifiers.js';
import { EmbedBuilder } from '../utils/EmbedBuilder.js';
import { getThumbnail } from '../utils/CharProfilePics.js';

class Rolls {
  constructor(rolls, nat20, critFails, totalRolls) {
    this.rolls = rolls;
    this.nat20 = nat20;
    this.critFails = critFails;
    this.totalRolls = totalRolls;
  }
}

function rollDice(times, sides) {
  let rolls = [];
  let nat20 = 0;
  let critFail = 0;

  for (let i = 0; i < times; i++) {
    let roll = Math.floor(Math.random() * sides) + 1;
    if (roll === 1) {
      critFail++;
    } else if (roll === 20) {
      nat20++;
    }
    rolls.push(roll);
  }
  return new Rolls(rolls, nat20, critFail, times);
}

export async function roll(interaction, env) {
  const playerName = interaction.member.nick;
  let skillBonus = 0;
  let sides = 20;
  let times = 1;
  let skill = null;

  if (Object.hasOwn(interaction.data, 'options')) {
    interaction.data.options.forEach((element) => {
      if (element.name === 'sides') {
        sides = element.value;
      }
      if (element.name === 'times') {
        times = element.value;
      }
      if (element.name === 'skill') {
        skill = element.value;
      }
    });
  }
  if (skill) {
    skillBonus = (await getSkillBonus(playerName, skill, env)) ?? 0;
  }

  //skillBonus is NOT added here
  let rollDetails = rollDice(times, sides);

  //stat updates only happen for D20s if a crit fail or nat 20 happens, or a skill was used
  const statsUpdateNeeded =
    sides === 20 &&
    (rollDetails.nat20 > 0 || rollDetails.critFails > 0 || skill);

  if (statsUpdateNeeded) {
    logStats(rollDetails, skill, playerName, env);
  }

  return constructEmbedMessage(
    rollDetails,
    skillBonus,
    sides,
    statsUpdateNeeded,
    interaction,
    skill,
  );
}

function constructEmbedMessage(
  rollDetails,
  skillBonus,
  sides,
  statsUpdateNeeded,
  interaction,
  skill,
) {
  const fields = createFields(
    rollDetails,
    skillBonus,
    sides,
    statsUpdateNeeded,
  );

  const characterName = interaction.member.nick;

  const thumbnailUrl = getThumbnail(characterName);
  return new EmbedBuilder()
    .setTitle(characterName, sides, skill)
    .withBonus(skillBonus)
    .withStatisticUpdate(statsUpdateNeeded)
    .setThumbnail(thumbnailUrl)
    .setFields(fields)
    .withUser(interaction.member.user)
    .build();
}

function createFields(rollDetails, skillBonus, sides, statsUpdateNeeded) {
  var fields = [{ name: '', value: '\u1CBC' }];

  rollDetails.rolls.forEach((roll) => {
    var fieldName;
    var fieldValue;

    if (roll === 1) {
      fieldName = '1';
      fieldValue = 'Crit Fail!';
    } else if (sides === 20 && roll === 20) {
      fieldName = '20';
      fieldValue = 'Nat20!';
    } else {
      fieldName = roll + skillBonus;
      if (skillBonus >= 0) {
        fieldValue = `${roll} (+${skillBonus})`;
      } else {
        fieldValue = `${roll} (${skillBonus})`;
      }
    }

    fields.push({
      name: fieldName,
      value: fieldValue,
      inline: true,
    });
  });

  if (statsUpdateNeeded) {
    fields.push({ name: '', value: '\u1CBC' });
  }

  return fields;
}
