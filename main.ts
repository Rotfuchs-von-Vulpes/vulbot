import 'dotenv/config';
import 'reflect-metadata';
import { Client } from 'discordx';
import { Intents, Message } from 'discord.js';

import createCommands from './commands';

(async function start() {
	const client = new Client({
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.GUILD_MEMBERS,
		],
		silent: false,
	});

	const commands = createCommands(client);

	client.on('ready', async () => {
		console.log(`Vulbot started ${client.user?.tag}`);

		// to create/update/delete discord application commands
		await client.initApplicationCommands();
		await client.initApplicationPermissions();
	});

	client.on('messageCreate', commands);
	client.on('messageUpdate', (oldMessage, newMessage) => {
		commands(newMessage as Message);
	});

	client.on('presenceUpdate', (oldPresence, newPresence) => {
		console.log(newPresence);
	})

	if (!process.env.BOT_TOKEN) {
		throw Error('Where is the token?');
	}

	client.login(process.env.BOT_TOKEN);
})();
