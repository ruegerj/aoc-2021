import { loadInput } from '../common/input.js';
import { parseOctopusGrid } from './utils.js';

const input = loadInput(1);
const octopusGrid = parseOctopusGrid(input);

let stepCounter = 0;
let simultaneousFlash = false;

while (!simultaneousFlash) {
	let flashedOctopuses = [];
	stepCounter++;

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

	simultaneousFlash = octopusGrid.flat().every((o) => o.lightLevel == 0);
}

console.log(stepCounter);
