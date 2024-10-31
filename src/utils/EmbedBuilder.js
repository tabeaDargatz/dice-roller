export class EmbedBuilder {
  #author = {};
  #title = 'You are rolling dice.';
  #description = 'The results do not include any skill bonus.';
  #thumbnail = {};
  #fields = [];
  #footer = {};

  setThumbnail(thumbnailUrl) {
    this.thumbnail = { url: thumbnailUrl };
    return this;
  }

  setTitle(characterName, sides, skill) {
    var title = `${characterName} is rolling a D${sides}`;
    if (skill) {
      title += ` for ${skill}`;
    }

    this.title = title;
    return this;
  }

  setFields(fields) {
    this.fields = fields;
    return this;
  }

  withBonus(bonusValue) {
    if (bonusValue > 0) {
      this.description = `The results include a +${bonusValue} skill bonus.`;
    } else if (bonusValue < 0) {
      this.description = `The results include a ${bonusValue} skill bonus.`;
    } else {
      this.description = 'The results do not include any skill bonus.';
    }
    return this;
  }

  //builds footer part of embed to indicate statistics have been updated
  withStatisticUpdate(statsUpdated) {
    if (statsUpdated) {
      this.footer = {
        text: 'Statistics have been updated.',
        icon_url: 'https://i.imgur.com/CqTEdTi.png',
      };
    }
    return this;
  }

  //builds author part of embed from user info
  withUser(user) {
    const userId = user.id;
    const userAvatar = user.avatar;
    this.author = {
      name: user.username,
      icon_url: `https://cdn.discordapp.com/avatars/${userId}/${userAvatar}.png`,
    };
    return this;
  }

  build() {
    return {
      author: this.author,
      title: this.title,
      description: this.description,
      footer: this.footer,
      thumbnail: this.thumbnail,
      fields: this.fields,
    };
  }
}
