import { loadInput } from '../common/input.js';

const input = loadInput(1);
const values = input
	.split('\n')
	.map((v) => parseInt(v.trim()))
	.filter((v) => !isNaN(v));

const checksums = values
	.map((v, i, arr) => v + arr[i + 1] + arr[i + 2])
	.filter((c) => !isNaN(c));

let previous;
let increaseCounter = 0;

for (let i = 0; i < checksums.length; i++) {
	const measurement = checksums[i];

	if (previous && measurement > previous) {
		increaseCounter++;
	}

	previous = measurement;
}

console.log(increaseCounter);
