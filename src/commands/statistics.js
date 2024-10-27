export async function deleteAllStats(interaction, env){
    let playerName = interaction.member.nick;

    let dbResult = await env.DB.prepare("SELECT * FROM Statistic WHERE PlayerName = ?1").bind(playerName).run();
    if(dbResult.results.length === 0){
        return "There are no statistics registered for " + playerName + " and therefor nothing was reset.";
    }
    await env.DB.prepare("DELETE FROM Statistic WHERE PlayerName = ?1").bind(playerName).run();
    
    return "Statistics were successfully reset for " + playerName;
  }

  export async function getStats(interaction, env){
    let playerName = interaction.member.nick;
    let dbResult = await env.DB.prepare("SELECT * FROM Statistic WHERE PlayerName = ?").bind(playerName).run();
    let statistics = dbResult.results;
    if(statistics.length === 0){
        return "There are no statistics registered for " + playerName + " yet.";
    }
    let message = "**Showing statistics for " + playerName + ":** \n";
    statistics.forEach(statisticMeasurement => {
        console.log(statisticMeasurement);
        message += "\n" + statisticMeasurement.Measurement + ": " + statisticMeasurement.Count;
    });
    return message;
  }