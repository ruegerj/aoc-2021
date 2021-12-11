import { loadInput } from '../common/input.js';
import { parseOctopusGrid } from './utils.js';

const input = loadInput();

const octopusGrid = parseOctopusGrid(input);

const steps = 100;
let flashCounter = 0;

for (let i = 0; i < steps; i++) {
	let flashedOctopuses = [];

	for (const row of octopusGrid) {
		for (const octopus of row) {
			octopus.lightLevel += 1;
		}
	}

	const flashingOctopuses = octopusGrid
		.flat()
		.filter((o) => o.lightLevel > 9);

	for (const octopus of flashingOctopuses) {
		flashedOctopuses = octopus.flash(octopusGrid, flashedOctopuses);
	}

	flashCounter += flashedOctopuses.length;
}

console.log(flashCounter);
