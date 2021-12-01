import { loadInput } from '../common/input.js';
import { create, reverse } from './measurement.js';

const input = loadInput();
const values = input
	.split('\n')
	.map((v) => parseInt(v.trim()))
	.filter((v) => !isNaN(v));

let previous;
let increaseCounter = 0;

for (let i = 0; i < values.length; i++) {
	const measurement = values[i];

	if (previous && measurement > previous) {
		increaseCounter++;
	}

	previous = measurement;
}

console.log(increaseCounter);
