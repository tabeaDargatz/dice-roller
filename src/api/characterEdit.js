const lists = ['Tools', 'Proficiencies', 'Languages', 'InventoryItems'];

export async function saveEdit(updates, characterName, env) {
  saveUpdateForCharacterDetails(
    updates['characterDetails'],
    env,
    characterName,
  );

  saveUpdateForSkillModifiers(updates['skillModifiers'], env, characterName);
  saveUpdateForLists(updates, env, characterName);
}

async function saveUpdateForLists(updates, env, characterName) {
  console.log('Trying to save updates for lists:');
  console.log(lists);
  for (const listName of lists) {
    const table = listName;
    const newItems = updates[listName];

    // 1. Get existing items from DB
    const { results } = await env.DB.prepare(
      `SELECT Item FROM ${table} WHERE PlayerName = ?`,
    )
      .bind(characterName)
      .all();

    const existingItems = results.map((row) => row.Item);

    // 2. Filter out items that already exist
    const itemsToInsert = newItems.filter(
      (item) => !existingItems.includes(item),
    );

    // 3. Insert new items only
    for (const item of itemsToInsert) {
      await env.DB.prepare(
        `INSERT INTO ${table} (PlayerName, Item) VALUES (?, ?)`,
      )
        .bind(characterName, item)
        .run();
    }
  }
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
