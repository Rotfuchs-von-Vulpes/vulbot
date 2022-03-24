import { Message } from "discord.js";
import { Client } from "discordx";

import draw from "./canvas";
import { command } from './utils';
import createCommandHandler from './createCommand';

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

export default function getCommands(client: Client) {
	const guildPrefixesMap = new Map<string, string>();

	guildPrefixesMap.set('standard', 'fox!');
	
	const commandMap = new Map<string, command>();
	const createCommand = createCommandHandler(commandMap);

	createCommand('ping', (msg: Message) => {
		let latency = Date.now() - msg.createdTimestamp;
		let apiLatency = Math.round(client.ws.ping);

		msg.channel.send(`Pong! Latencia é ${latency}ms. Latencia da API é ${apiLatency}ms :fox:`);
	});
	// createCommand('prefix', async (msg: Message, inputs: string[]) => {
	// 	let gId = msg.guildId;

	// 	if (!gId) {
	// 		msg.channel.send('Você não pode alterar o prefixo aqui!');
	// 		return;
	// 	}

	// 	if (!inputs[0]) {
	// 		msg.channel.send('Você esqueceu de especificar o prefixo!');
	// 		return;
	// 	}
	// 	if (isValid(inputs[0])) {
	// 		guildPrefixesMap.set(gId, inputs[0]);
	// 		msg.channel.send(`Agora meu prefixo é: ${guildPrefixesMap.get(gId)}`);
	// 	} else {
	// 		msg.channel.send(`${inputs[0]} não é um prefixo válido!`);
	// 	}
	// });
	// createCommand('code', async (msg: Message, inputs: string[]) => {
	// 	let code = inputs.join(' ');

	// 	console.log(code.substring(code.indexOf('```') + 3, code.lastIndexOf('```')));

	// 	if (/^(\`){3}(.*)(\`){3}$/.test(code)) {
	// 		msg.channel.send('Tem código aí');
	// 	} else {
	// 		msg.channel.send('Não tem código aí');
	// 	}
	// });
	// createCommand('draw', async (msg: Message) => {
	// 	msg.channel.send({files: [ draw() ]});
	// });
	createCommand('fuder', async (msg: Message) => {
		msg.channel.send(`${msg.author} foi fudido com sucesso.`);
	});
	createCommand('matar', async (msg: Message) => {
		msg.channel.send(`${msg.author} foi morto com sucesso.`);
	});
	createCommand('roubar', async (msg: Message) => {
		msg.channel.send(`${msg.author} foi roubado com sucesso.`);
	});

	return async function commands(msg: Message) {
		if (msg.author === client.user) return;

		const [prefix, name, ...inputs] = msg.content.split(/\s/);

		if (prefix === (guildPrefixesMap.get(msg.guildId ?? 'standard') ?? 'fox!')) {
			if (!name) {
				msg.channel.send(':fox::+1:');
			} else {
				(commandMap.get(name) ?? (() => {}))(msg, inputs);
			}
		} else {
			if (/rapos(a|o)|fox|fxoe|fuchs|vulp/i.test(msg.content)) {
				msg.react('931731321670209596');
			}

			if (msg.mentions.members?.has(client.user?.id ?? '')) {
				msg.channel.send('<:pepe_ping:954135254329852014>');
			}
		}
	}
}