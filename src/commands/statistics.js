export async function deleteAllStats(interaction, env) {
  let playerName = interaction.member.nick;

  let dbResult = await env.DB.prepare(
    'SELECT * FROM Statistic WHERE PlayerName = ?1',
  )
    .bind(playerName)
    .run();
  if (dbResult.results.length === 0) {
    return (
      'There are no statistics registered for ' +
      playerName +
      ' and therefor nothing was reset.'
    );
  }
  await env.DB.prepare('DELETE FROM Statistic WHERE PlayerName = ?1')
    .bind(playerName)
    .run();

  return 'Statistics were successfully reset for ' + playerName;
}

export async function getStats(interaction, env) {
  let playerName = interaction.member.nick;
  let dbResult = await env.DB.prepare(
    'SELECT * FROM Statistic WHERE PlayerName = ?',
  )
    .bind(playerName)
    .run();
  let statistics = dbResult.results;
  if (statistics.length === 0) {
    return 'There are no statistics registered for ' + playerName + ' yet.';
  }
  let message = '**Showing statistics for ' + playerName + ':** \n';
  statistics.forEach((statisticMeasurement) => {
    console.log(statisticMeasurement);
    message +=
      '\n' +
      statisticMeasurement.Measurement +
      ': ' +
      statisticMeasurement.Count;
  });
  return message;
}

export async function logStats(rollDetails, skill, playerName, env) {
  if (rollDetails.nat20 > 0) {
    logStat(rollDetails.nat20, playerName, measurementNat20, env);
  }

  if (rollDetails.critFails > 0) {
    logStat(rollDetails.critFails, playerName, measurementCritFail, env);
  }

  if (skill) {
    logStat(rollDetails.totalRolls, playerName, skill, env);
  }
}

async function logStat(value, playerName, measurement, env) {
  let dbResult = await env.DB.prepare(
    'SELECT * FROM Statistic WHERE PlayerName = ?1 AND Measurement = ?2',
  )
    .bind(playerName, measurement)
    .run();
  if (dbResult.results.length === 0) {
    await env.DB.prepare(
      'INSERT INTO Statistic(Count, PlayerName, Measurement) VALUES (?1,?2,?3)',
    )
      .bind(value, playerName, measurement)
      .run();
  } else {
    let newValue = value + dbResult.results[0].count;
    await env.DB.prepare(
      'UPDATE Statistic SET Count = ?1 WHERE PlayerName = ?2 AND Measurement = ?3',
    )
      .bind(newValue, playerName, measurement)
      .run();
  }
}
