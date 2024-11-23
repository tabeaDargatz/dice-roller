export async function saveEdit(characterDetails, characterName, env) {
  var statement = createSqlStatement(characterDetails, characterName);
  console.log(statement);
  await env.DB.prepare(statement).run();
}

function createSqlStatement(characterDetails, characterName) {
  let statement = 'UPDATE CharacterDetails SET ';
  Object.keys(characterDetails).forEach(function (key, index) {
    statement += key + ' = "' + characterDetails[key] + '", ';
  });

  //Delete last two characters from statement string, as there is an extra ", " at the end
  statement = statement.substring(0, statement.length - 2);

  statement += ' WHERE PlayerName = "' + characterName + '"';
  return statement;
}
