export async function getDetails(characterName, env) {
  let dbResult = await env.DB.prepare(
    'SELECT * FROM CharacterDetails WHERE PlayerName = ?1',
  )
    .bind(characterName)
    .run();

  return dbResult;
}
