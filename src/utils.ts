import { Message } from "discord.js";

export type command = (msg: Message, inputs: string[]) => void;
