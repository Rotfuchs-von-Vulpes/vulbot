import { Message } from "discord.js";
import { Client } from "discordx";

function isValid(str: string): boolean {
	let chars = str.split('');

	for (let char of chars) {
		let code = char.charCodeAt(0);
		if (code < 32 && code > 126) {
			return false;
		}
	}

	return true;
}

export default function createCommands(client: Client) {
	let prefix = 'fox!';
	let prefixGuildMap = new Map<string, string>();

	prefixGuildMap.set('standard', 'fox!');

	return async function commands(message: Message) {
		message.guild?.id

		if (message.author === client.user) return;

		let command = message.content.split(' ');

		if (command[0] === (prefixGuildMap.get(message.guildId ?? 'standard') ?? 'fox!')) {
			if (command.length === 1) {
				await message.channel.send(':fox::+1:');
				return;
			}

			switch (command[1]) {
				case 'ping':
					let latency = Date.now() - message.createdTimestamp;
					let apiLatency = Math.round(client.ws.ping);
		
					message.channel.send(`Pong! Latencia é ${latency}ms. Latencia da API é ${apiLatency}ms :fox:`);
		
					console.log(`Latency: ${latency}ms, API Latency:${apiLatency}`);
					break;
				case 'prefix':
					let gId = message.guildId;

					if (!gId) {
						await message.channel.send('Você não pode alterar o prefixo aqui!');
						return;
					}

					if (!command[2]) await message.channel.send('Você esqueceu de especificar o prefixo!');
					if (isValid(command[2])) {
						prefixGuildMap.set(gId, command[2]);
						await message.channel.send(`Agora meu prefixo é: ${prefixGuildMap.get(gId)}`);
					} else {
						await message.channel.send(`${command[2]} não é um prefixo válido!`);
					}
			}
		} else if (/rapos(a|o)|fox|fxoe|fuchs|vulp(e|o)?s?/i.test(message.content)) {
			await message.react('931731321670209596');
		}

		if (message.mentions.members?.has(client.user?.id ?? '')) {
			message.channel.send('<:pepe_ping:954135254329852014>');
			return;
		}
	}
}