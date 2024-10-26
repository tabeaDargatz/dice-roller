export async function getSkillModifiers(interaction, env){
    let playerName = interaction.member.nick;
    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?").bind(playerName).run();
    let skillModifierEntries = dbResult.results;
    
    let message = "**Showing all registered skills for " + playerName + ":** \n";
    skillModifierEntries.forEach(skillModifierEntry => {
        console.log(skillModifierEntry);
        message += "\n" + skillModifierEntry.Skill + ": " + skillModifierEntry.Modifier
    });

    return message;
  }


  export async function setSkillModifier(interaction, env){
    let playerName = interaction.member.nick;
    let skill = null;
    let modifier = null;
    if(Object.hasOwn(interaction.data,"options")){
        interaction.data.options.forEach(element => {
          if(element.name === "skill"){
            skill = element.value;
          }
          if(element.name === "modifier"){
            modifier = element.value;
          }
        });
    }
    if(!skill || !modifier){
        return "Skill and modifier options are required.";
    }

    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?1 AND Skill = ?2").bind(playerName,skill).run();
    let skillModifierEntries = dbResult.results;
    let insertOrUpdate = "UPDATE";
    if(dbResult.length === 0){
        insertOrUpdate = "INSERT";
    }
    await env.DB.prepare(insertOrUpdate + " SkillModifiers SET Modifier = ?1 WHERE PlayerName = ?2 AND Skill = ?3").bind(modifier,playerName,skill).run();
    
    return skill + " was successfully set to " + modifier + " for " + playerName;
  }