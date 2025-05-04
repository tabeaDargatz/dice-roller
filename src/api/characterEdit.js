const lists = new Map([
  ['Tools', 'Tool'],
  ['Proficiencies', 'Proficiency'],
  ['Languages', 'Language'],
  ['InventoryItems', 'Item'],
]);

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
  for (const [key, value] of lists.entries()) {
    console.log('value: ' + value + 'key: ' + key);
    const table = key;
    const columnName = value;
    const newItems = updates[key];

    console.log('items from frontend: ' + newItems);
    // 1. Get existing items from DB
    const { results } = await env.DB.prepare(
      `SELECT * FROM ${table} WHERE PlayerName = ?`,
    )
      .bind(characterName)
      .all();

    const existingItems = results.map((row) => row[columnName]);
    console.log('EXISTING ITEMS for ' + key + ': ' + existingItems);
    // 2. Filter out items that already exist
    const itemsToInsert = newItems.filter(
      (item) => !existingItems.includes(item),
    );

    console.log(
      'Items that need to be inserted into ' +
        columnName +
        ': ' +
        itemsToInsert,
    );
    // 3. Insert new items only
    for (const item of itemsToInsert) {
      await env.DB.prepare(
        `INSERT INTO ${table} (PlayerName, ${columnName}) VALUES (?, ?)`,
      )
        .bind(characterName, item)
        .run();
    }

    // 4. Filter out items that should no longer exist
    const itemsToDelete = existingItems.filter(
      (item) => !newItems.includes(item),
    );
    console.log('Items that need to be deleted: ' + itemsToDelete);

    // 5. Delete removed items
    for (const item of itemsToDelete) {
      await env.DB.prepare(
        `DELETE FROM ${table} WHERE PlayerName = ? AND ${columnName} = ?`,
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
