export async function getSkillModifiers(interaction, env){
    let playerName = interaction.member.nick;
    console.log(playerName);
    let dbResult = await env.DB.prepare("SELECT * FROM SkillModifiers WHERE PlayerName = ?").bind(playerName).run();
    let skillModifierEntries = dbResult.results;
    
    let message = "**Showing all registered skills for " + playerName + ":** \n";
    skillModifierEntries.forEach(skillModifierEntry => {
        console.log(skillModifierEntry);
        message += "\n" + skillModifierEntry.Skill + ": " + skillModifierEntry.Modifier
    });

    return message;
  }