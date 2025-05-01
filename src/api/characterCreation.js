export async function createChar(createPayload, env) {
  console.log(createPayload);
  let characterName = createPayload['name'];
  let campaign = createPayload['campaign'];
  await env.DB.prepare(
    'INSERT INTO CharacterDetails (PlayerName,Campaign) VALUES (?1,?2);',
  )
    .bind(characterName, campaign)
    .run();
}
