import { loadInput } from '../common/input.js';

const input = loadInput();
const binNumbers = input
	.split('\n')
	.map((o) => o.trim())
	.filter((o) => o);

const indexBitMap = [];

for (const binNumber of binNumbers) {
	const bits = binNumber.split('');

	for (let i = 0; i < bits.length; i++) {
		const bit = +bits[i];

		if (!indexBitMap[i]) {
			indexBitMap[i] = [];
		}

		indexBitMap[i].push(bit);
	}
}

let gamma = '';
let epsilon = '';

for (let i = 0; i < indexBitMap.length; i++) {
	const bitsAtIndex = indexBitMap[i];

	const mostCommonBit = bitsAtIndex.reduce((acc, cur, _, arr) => {
		return arr.filter((b) => b === acc).length >=
			arr.filter((b) => b === cur).length
			? acc
			: cur;
	}, undefined);

	gamma += mostCommonBit;
	epsilon += mostCommonBit == 1 ? 0 : 1;
}

const gammaRate = parseInt(gamma, 2);
const epsilonRate = parseInt(epsilon, 2);

const powerConsumption = gammaRate * epsilonRate;
console.log(powerConsumption);
