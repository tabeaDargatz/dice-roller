export async function getSkillModifiers(interaction, env){
    let playerName = interaction.member.nick;
    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?").bind(playerName).run();
    let skillModifierEntries = dbResult.results;
    if(skillModifierEntries.length === 0){
        return "There are no skills registered for " + playerName + ".";
    }
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
    let result;
    if(dbResult.results.length === 0){
        result = await env.DB.prepare("INSERT INTO SkillModifiers(Modifier, PlayerName, Skill) VALUES (?1,?2,?3)").bind(modifier,playerName,skill).run();
    } else {
        result = await env.DB.prepare("UPDATE SkillModifiers SET Modifier = ?1 WHERE PlayerName = ?2 AND Skill = ?3").bind(modifier,playerName,skill).run();
    }
    return skill + " was successfully set to " + modifier + " for " + playerName;
  }
  
  export async function deleteSkillModifier(interaction, env){
    let playerName = interaction.member.nick;
    let skill = null;
    if(Object.hasOwn(interaction.data,"options")){
        interaction.data.options.forEach(element => {
          if(element.name === "skill"){
            skill = element.value;
          }
        });
    }
    if(!skill){
        return "Skill option is required.";
    }

    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?1 AND Skill = ?2").bind(playerName,skill).run();

    if(dbResult.results.length === 0){
        return "This skill has not been registered for " + playerName + " and therefor can not be deleted.";
    }
    await env.DB.prepare("DELETE FROM SkillModifiers WHERE PlayerName = ?1 AND Skill = ?2").bind(playerName,skill).run();
    
    return skill + " skill was successfully deleted for " + playerName;
  }

  export async function deleteAllSkills(interaction, env){
    let playerName = interaction.member.nick;

    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?1").bind(playerName).run();
    console.log(dbResult);
    if(dbResult.results.length === 0){
        return "There are no skills registered for " + playerName + " and therefor nothing was deleted.";
    }
    await env.DB.prepare("DELETE FROM SkillModifiers WHERE PlayerName = ?1").bind(playerName).run();
    
    return "Skills were successfully deleted for " + playerName;
  }