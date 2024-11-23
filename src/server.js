import { AutoRouter } from 'itty-router';
import {
  InteractionResponseType,
  InteractionType,
  verifyKey,
} from 'discord-interactions';
import {
  TEST_COMMAND,
  SHOW_STATS_COMMAND,
  RESET_ALL_STATS_COMMAND,
  DELETE_ALL_SKILLS_COMMAND,
  DELETE_SKILL_COMMAND,
  ADD_SKILL_COMMAND,
  SHOW_SKILLS_COMMAND,
  HELP_COMMAND,
  INVITE_COMMAND,
  ROLL_COMMAND,
} from './commands/commands.js';
import { helpMessage } from './commands/help.js';
import { saveEdit } from './api/characterEdit.js';
import { getDetails } from './api/characterDetails.js';
import { getList } from './api/characterList.js';
import { InteractionResponseFlags } from 'discord-interactions';
import { roll } from './commands/roll.js';
import { deleteAllStats, getStats } from './commands/statistics.js';
import {
  getSkillModifiers,
  setSkillModifier,
  deleteSkillModifier,
  deleteAllSkills,
} from './commands/skillModifiers.js';
class JsonResponse extends Response {
  constructor(body, init) {
    const jsonBody = JSON.stringify(body);
    init = init || {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    super(jsonBody, init);
  }
}

const router = AutoRouter();
router.get('/', (request, env) => {
  return new Response(`Worker is up and running.`);
});

router.get('/api/characters', async (request, env) => {
  const details = await getDetails(request.query.name, env);
  return new JsonResponse(details, {
    //TODO: change to dnd website address once its setup
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
});

router.get('/api/campaigns', async (request, env) => {
  const details = await getList(env);
  return new JsonResponse(details, {
    //TODO: change to dnd website address once its setup
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
});

router.put('/api/edit', async (request, env) => {
  const newResObj = new Response(request.body);
  const body = await newResObj.json();

  const details = await saveEdit(body, request.query.name, env);
  return new JsonResponse(details, {
    //TODO: change to dnd website address once its setup
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
});

/**
 * Main route for all requests sent from Discord.  All incoming messages will
 * include a JSON payload described here:
 * https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object
 */
router.post('/', async (request, env) => {
  const { isValid, interaction } = await server.verifyDiscordRequest(
    request,
    env,
  );
  if (!isValid || !interaction) {
    return new Response('Bad request signature.', { status: 401 });
  }

  if (interaction.type === InteractionType.PING) {
    // The `PING` message is used during the initial webhook handshake, and is
    // required to configure the webhook in the developer portal.
    return new JsonResponse({
      type: InteractionResponseType.PONG,
    });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    switch (interaction.data.name.toLowerCase()) {
      //-----------ROLLS------------
      case ROLL_COMMAND.name.toLowerCase(): {
        const msg = await roll(interaction, env);
        return constructEmbedJsonResponse(msg);
      }

      //-----------SKILLS------------
      case SHOW_SKILLS_COMMAND.name.toLocaleLowerCase(): {
        const msg = await getSkillModifiers(interaction, env);
        return constructJsonResponse(msg);
      }
      case ADD_SKILL_COMMAND.name.toLowerCase(): {
        const msg = await setSkillModifier(interaction, env);
        return constructJsonResponse(msg);
      }
      case DELETE_SKILL_COMMAND.name.toLowerCase(): {
        const msg = await deleteSkillModifier(interaction, env);
        return constructJsonResponse(msg);
      }
      case DELETE_ALL_SKILLS_COMMAND.name.toLowerCase(): {
        const msg = await deleteAllSkills(interaction, env);
        return constructJsonResponse(msg);
      }

      //-----------STATS------------
      case RESET_ALL_STATS_COMMAND.name.toLowerCase(): {
        const msg = await deleteAllStats(interaction, env);
        return constructJsonResponse(msg);
      }
      case SHOW_STATS_COMMAND.name.toLowerCase(): {
        const msg = await getStats(interaction, env);
        return constructJsonResponse(msg);
      }

      //-----------MISC------------
      case HELP_COMMAND.name.toLocaleLowerCase(): {
        const msg = constructJsonResponse(helpMessage);
        return msg;
      }
      case TEST_COMMAND.name.toLocaleLowerCase(): {
        return constructEmbedJsonResponse(constructEmbed(interaction));
      }
      case INVITE_COMMAND.name.toLowerCase(): {
        const applicationId = env.DISCORD_APPLICATION_ID;
        const INVITE_URL = `https://discord.com/oauth2/authorize?client_id=${applicationId}&scope=applications.commands`;
        return new JsonResponse({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: INVITE_URL,
            flags: InteractionResponseFlags.EPHEMERAL,
          },
        });
      }

      default:
        return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
    }
  }

  console.error('Unknown Type');
  return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});
router.all('*', () => new Response('Not Found.', { status: 404 }));

function constructJsonResponse(msg) {
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: msg,
    },
  });
}

function constructEmbedJsonResponse(embed) {
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [embed],
    },
  });
}

async function verifyDiscordRequest(request, env) {
  const signature = request.headers.get('x-signature-ed25519');
  const timestamp = request.headers.get('x-signature-timestamp');
  const body = await request.text();
  const isValidRequest =
    signature &&
    timestamp &&
    (await verifyKey(body, signature, timestamp, env.DISCORD_PUBLIC_KEY));
  if (!isValidRequest) {
    return { isValid: false };
  }

  return { interaction: JSON.parse(body), isValid: true };
}

const server = {
  verifyDiscordRequest,
  fetch: router.fetch,
};

export default server;
