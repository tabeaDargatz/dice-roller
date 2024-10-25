const defaultRowLength = 34; //34 whitespace characters needed to fill the row between the borders
const chunkSize = 4; // Number of values per row
const defaultSumRowLength = 7;
const defaultRollRowLength = defaultRowLength - defaultSumRowLength - 1;

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

  for (let i = 0; i < times; i++) {
    let roll = Math.floor(Math.random() * sides) + 1;

    if (roll === 1) {
    } else if (roll === 20) {
    } else {
      roll += skillBonus;
    }
    rolls.push(roll);
  }
  return rolls;
}

export async function roll(interaction){
  //TODO: add db to make skillBonus and stats work
  const playerName = interaction.member.nick;
  const skillBonus = 0;
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
  let rolls = rollDice(times, sides, skillBonus);
  let message = generateMessage(playerName, skill, skillBonus, rolls, `${times}d${sides}`);
  if(sides === 20){
    //logStats(rolls, skill, id);
  }

  return message;
}

/*
async function logStats(rolls, skill,id){
  const nat20Counter = rolls.filter((roll) => roll == 20).length;
  if(nat20Counter > 0){
    const nat20 = (await db.get(id + "nat20")).value ?? 0;
    await db.set(id + "nat20", nat20+nat20Counter);
  }
  
  const critFailCounter = rolls.filter((roll) => roll == 1).length;
  if(critFailCounter > 0){
    const critFail = (await db.get(id + "critFail")).value ?? 0;
    await db.set(id + "critFail", critFail+critFailCounter);
  }
  
  if(skill){
    let skillUsed = (await db.get(id + "used" + skill)).value ?? 0;
    skillUsed += rolls.length;
    await db.set(id + "used" + skill, skillUsed);
  }
}
*/

