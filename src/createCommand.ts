import { Client } from 'discordx';
import { Message } from 'discord.js';

import { command } from './utils';

// Uma função que retorna uma função que adiciona commands ao map sem precisar passar o map como parametro
export default function createComandHandler(commandsMap: Map<string, command>) {
	return function createCommand(name: string, callback: command) {
		commandsMap.set(name, callback);
	}
}
