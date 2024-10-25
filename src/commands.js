/**
 * Share command metadata from a common spot to be used for both runtime
 * and registration.
 * 
 * option types:
 * SUB_COMMAND 1   
 * SUB_COMMAND_GROUP 2 
 * STRING 3    
 * INTEGER 4
 * BOOLEAN 5   
 * USER 6  
 * CHANNEL 7
 * ROLE 8  
 * MENTIONABLE 9
 * NUMBER 10
 * ATTACHMENT 11
 */

export const INVITE_COMMAND = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
};

export const ROLL_COMMAND = {
  name: 'roll',
  description: 'Roll some dice',
  options: [{
    name: "sides",
    type: 4,
    description: "Specific number of sides on the die"
  },
  {
    name: "times",
    type: 4,
    description: "Specifies the number of times the die should be rolled."
  },
  {
    name: "skill",
    type: 3,
    description: "Adds bonuses from the skill.",
    choices: [
      { name: "Acrobatics", value: "acrobatics" },
          { name: "Animal Handling", value: "animal handling" },
          { name: "Arcana", value: "arcana" },
          { name: "Athletics", value: "athletics" },
          { name: "Deception", value: "deception" },
          { name: "History", value: "history" },
          { name: "Insight", value: "insight" },
          { name: "Intimidation", value: "intimidation" },
          { name: "Investigation", value: "investigation" },
          { name: "Medicine", value: "medicine" },
          { name: "Nature", value: "nature" },
          { name: "Perception", value: "perception" },
          { name: "Performance", value: "performance" },
          { name: "Persuasion", value: "persuasion" },
          { name: "Religion", value: "religion" },
          { name: "Sleight of Hand", value: "sleight of hand" },
          { name: "Stealth", value: "stealth" },
          { name: "Survival", value: "survival" }
    ]
  }
]
};
