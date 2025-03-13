export async function saveEdit(updates, characterName, env) {
  saveUpdateForCharacterDetails(
    updates['characterDetails'],
    env,
    characterName,
  );

  saveUpdateForSkillModifiers(updates['skillModifiers'], env, characterName);
}

async function saveUpdateForCharacterDetails(updates, env, characterName) {
  let statement = 'UPDATE CharacterDetails SET ';
  Object.keys(updates).forEach(function (key, index) {
    statement += key.toLowerCase() + ' = "' + updates[key] + '", ';
  });

  //Delete last two characters from statement string, as there is an extra ", " at the end
  statement = statement.substring(0, statement.length - 2);

  statement += ' WHERE PlayerName = "' + characterName + '"';
  console.log(statement);
  await env.DB.prepare(statement).run();
}

async function saveUpdateForSkillModifiers(updates, env, characterName) {
  Object.keys(updates).forEach(async function (key, index) {
    let statement =
      'UPDATE SkillModifiers SET Modifier = ' +
      updates[key] +
      " WHERE PlayerName = '" +
      characterName +
      "' AND Skill = '" +
      key +
      "'";
    console.log(statement);
    await env.DB.prepare(statement).run();
  });
}
