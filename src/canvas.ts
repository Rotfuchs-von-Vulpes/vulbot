import Canvas from 'canvas';
import { MessageAttachment } from 'discord.js';

export default function draw() {
	const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, 700, 250);
	ctx.fillStyle = 'black';
	ctx.fillRect(10, 10, 680, 230);
	
	return new MessageAttachment(canvas.toBuffer(), 'canvas.png');
}
