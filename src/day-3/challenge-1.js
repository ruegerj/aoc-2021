import { loadInput } from '../common/input.js';
import { binToDec, getIndexMap, getMostCommonBit } from './utils.js';

const input = loadInput();
const binNumbers = input
	.split('\n')
	.map((o) => o.trim())
	.filter((o) => o);

const indexBitMap = getIndexMap(binNumbers);

let gamma = '';
let epsilon = '';

for (let i = 0; i < indexBitMap.length; i++) {
	const bitsAtIndex = indexBitMap[i];

	const mostCommonBit = getMostCommonBit(bitsAtIndex);

	gamma += mostCommonBit;
	epsilon += mostCommonBit == 1 ? 0 : 1;
}

const gammaRate = binToDec(gamma);
const epsilonRate = binToDec(epsilon);

const powerConsumption = gammaRate * epsilonRate;
console.log(powerConsumption);
