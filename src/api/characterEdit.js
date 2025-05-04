export async function saveEdit(updates, characterName, env) {
  saveUpdateForCharacterDetails(
    updates['characterDetails'],
    env,
    characterName,
  );

  saveUpdateForSkillModifiers(updates['skillModifiers'], env, characterName);
}

async function saveUpdateForCharacterDetails(updates, env, characterName) {
  const keys = Object.keys(updates);
  const columns = keys.map((key) => `${key.toLowerCase()} = ?`).join(', ');
  const values = keys.map((key) => updates[key]);

  const statement = `UPDATE CharacterDetails SET ${columns} WHERE PlayerName = ?`;
  values.push(characterName);

  console.log(statement, values);

  await env.DB.prepare(statement)
    .bind(...values)
    .run();
}

async function saveUpdateForSkillModifiers(updates, env, characterName) {
  for (const key of Object.keys(updates)) {
    const statement = `UPDATE SkillModifiers SET Modifier = ? WHERE PlayerName = ? AND Skill = ?`;
    const values = [updates[key], characterName, key];

    console.log(statement, values);

    await env.DB.prepare(statement)
      .bind(...values)
      .run();
  }
}
