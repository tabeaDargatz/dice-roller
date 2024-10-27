const defaultRowLength = 34; //34 whitespace characters needed to fill the row between the borders
const chunkSize = 4; // Number of values per row
const defaultSumRowLength = 7;
const defaultRollRowLength = defaultRowLength - defaultSumRowLength - 1;
const measurementNat20 = "Nat20s";
const measurementCritFail = "CritFails";

class Rolls {
  constructor(rolls, nat20, critFails) {
    this.rolls = rolls;
    this.nat20 = nat20;
    this.critFails = critFails;
  }

}

function generateMessage(playerName, skill, skillBonus, rollValues, diceType) {
  let message = "";
  if (skill) {
    message += `**${playerName}** tries rolling a check for **${skill}**.\n A modifier of **${skillBonus}** was automatically added to all rolls, except for crit fails and nat 20s. \n`;
  }

  const diceTypeRow = createDiceTypeRow(diceType);
  const rollRows = createRollAndSumRows(rollValues);
  message += `\`\`\`
  ╔══════════════════════════════════╗
  ║${diceTypeRow}║
  ╠══════════════════════════╤═══════╣
  ║           rolls          │  sum  ║
  ╟──────────────────────────┼───────╢
  ${rollRows}
  ╚══════════════════════════╧═══════╝
  \`\`\``;
  return message;
}

function createDiceTypeRow(diceType) {
  const paddingSize = (defaultRowLength - diceType.length) / 2;
  const paddingOdd = paddingSize % 1 != 0;
  const padding = " ".repeat(paddingSize);
  if (paddingOdd) {
    diceType += " ";
  }
  return padding + diceType + padding;
}

function createRollAndSumRows(rollValues) {
  const sum = rollValues.reduce((acc, val) => acc + val, 0);
  const chunks = splitToChunks(rollValues);

  //generates a row for each chunk and patches them together
  return chunks
    .map((chunk, index) => {
      const rollLine = chunk.map((val) => val.toString().padStart(4)).join(" ");
      const rollSubrow = createRollSubrow(rollLine);
      const sumSubrow = createSumSubrow(sum, index, chunks.length);
      return rollSubrow + sumSubrow;
    })
    .join("\n  ");
}

function splitToChunks(rollValues) {
  const chunks = [];
  for (let i = 0; i < rollValues.length; i += chunkSize) {
    chunks.push(rollValues.slice(i, i + chunkSize));
  }
  return chunks;
}

function createRollSubrow(rollLine) {
  const rollChars = rollLine.length;
  const paddingSize = (defaultRollRowLength - rollChars) / 2;
  const paddingOdd = paddingSize % 1 != 0;
  const padding = " ".repeat(paddingSize);
  if (paddingOdd) {
    rollLine += " ";
  }
  return `║${padding}${rollLine}${padding}│`;
}

function createSumSubrow(sum, index, chunkLength) {
  //if not last row: create empty sum subrow
  if (index != chunkLength - 1) {
    return " ".repeat(defaultSumRowLength) + "║";
  }

  let sumText = `[${sum}]`;
  const paddingSize = (defaultSumRowLength - sumText.length) / 2;
  const paddingOdd = paddingSize % 1 != 0;
  const padding = " ".repeat(paddingSize);
  if (paddingOdd) {
    sumText = " " + sumText;
  }

  return `${padding}${sumText}${padding}║`;
}

function rollDice(times, sides, skillBonus) {
  let rolls = [];
  let nat20 = 0;
  let critFail = 0;

  for (let i = 0; i < times; i++) {
    let roll = Math.floor(Math.random() * sides) + 1;
    if (roll === 1) {
      console.log("CritFail");
      critFail++;
    } else if (roll === 20) {
      console.log("Nat20");
      nat20++;
    } else {
      roll += skillBonus;
    }
    rolls.push(roll);
  }
  return new Rolls(rolls,nat20,critFail);
}

export async function roll(interaction,env){
  //TODO: add db to make skillBonus and stats work
  const playerName = interaction.member.nick;
  let skillBonus = 0;
  let sides = 20;
  let times = 1;
  let skill = null;
  if(Object.hasOwn(interaction.data,"options")){
    interaction.data.options.forEach(element => {
      if(element.name === "sides"){
        sides = element.value;
      }
      if(element.name === "times"){
        times = element.value;
      }
      if(element.name === "skill"){
        skill = element.value;
      }
    });
  }

  if(skill){
    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?1 AND Skill = ?2").bind(playerName,skill).run();
    if(dbResult.results && dbResult.results.length > 0){
      skillBonus = dbResult.results[0].Modifier;
    }
  }

  let rollDetails = rollDice(times, sides, skillBonus);
  let message = generateMessage(playerName, skill, skillBonus, rollDetails.rolls, `${times}d${sides}`);
  if(sides === 20){
    logStats(rollDetails, skill, playerName,env);
  }
  return message;
}

async function logStats(rollDetails, skill,playerName,env){
  if(rollDetails.nat20 > 0){
    console.log("logging nat20:" + rollDetails.nat20);
    logStat(rollDetails.nat20,playerName,measurementNat20,env);
  }
  
  if(rollDetails.critFails > 0){
    console.log("logging critFailCounter:" + rollDetails.critFails);
    logStat(rollDetails.critFails,playerName,measurementCritFail,env);
  }
  
  if(skill){
    console.log("logging skill:" + skill);
    logStat(rollDetails.rolls.length,playerName,skill,env);
  }
}

async function logStat(value, playerName,measurement,env){
  let dbResult = await env.DB.prepare("SELECT * FROM Statistic WHERE PlayerName = ?1 AND Measurement = ?2").bind(playerName,measurement).run();
  console.log(dbResult.results);
  if(dbResult.results.length === 0){
    try {
      await env.DB.prepare("INSERT INTO Statistic(Count, PlayerName, Measurement) VALUES (?1,?2,?3)").bind(value,playerName,measurement).run();
    } catch (error) {
      console.log(error);
    }
    
  } else {
    try {
      let newValue = value + dbResult.results[0].count;
    await env.DB.prepare("UPDATE Statistic SET Count = ?1 WHERE PlayerName = ?2 AND Measurement = ?3").bind(newValue,playerName,measurement).run();
    } catch (error) {
      console.log(error);
    }
    
  }
}
