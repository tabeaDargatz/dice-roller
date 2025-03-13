export function getThumbnail(characterName) {
  switch (characterName) {
    case 'Cara':
      return 'https://imgur.com/gyfLWmd';
    case 'Xulle':
      return 'https://i.imgur.com/MNMaFar.png';
    case 'Ruut':
      return 'https://i.imgur.com/x2dioxD.png';
    case 'Ainikki':
      return 'https://imgur.com/z8tZMJb';
    case 'The Almighty DnD God (DM)':
      return 'https://i.imgur.com/4y4N3Xh.png';
    default:
      return 'https://i.imgur.com/2mmvP7y.png';
  }
}
