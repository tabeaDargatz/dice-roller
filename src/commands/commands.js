/**
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

import { getSkillList } from "./skillList.js";

// ----------MISC----------
export const INVITE_COMMAND = {
  name: 'invite',
  description: 'Get an invite link to add the bot to your server',
};

export const HELP_COMMAND = {
  name: 'help',
  description: 'Explains useful commands',
};

// ----------SKILLS----------
export const SHOW_SKILLS_COMMAND = {
  name: 'showskills',
  description: 'Displays all registered skills for your current character',
};

export const ADD_SKILL_COMMAND = {
  name: 'addskill',
  description: 'Adds a skill with a modifier to your current character',
  options: [{
    name: "modifier",
    type: 4,
    description: "Adds bonus to skill"
  },
  {
    name: "skill",
    type: 3,
    description: "Skill to add modifier to",
    choices: getSkillList()
  }
]
};

export const DELETE_SKILL_COMMAND = {
  name: 'deleteskill',
  description: 'Deletes a skill from your current character',
  options: [
  {
    name: "skill",
    type: 3,
    description: "Skill to delete modifier for",
    choices: getSkillList()
  }
]
};

// ----------DICE ROLLS----------

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
    choices: getSkillList()
  }
]
};
