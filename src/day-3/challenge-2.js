import { loadInput } from '../common/input.js';
import {
	binToDec,
	getIndexMap,
	getLeastCommonBit,
	getMostCommonBit,
} from './utils.js';

const input = loadInput(1);
const binNumbers = input
	.split('\n')
	.map((o) => o.trim())
	.filter((o) => o);

const resolveRating = (binValues, mostCommon, index = 0) => {
	const indexBitMap = getIndexMap(binValues);

	let bitCriteria = mostCommon
		? getMostCommonBit(indexBitMap[index])
		: getLeastCommonBit(indexBitMap[index]);

	const validNumbers = binValues.filter(
		(b) => b.charAt(index) == bitCriteria,
	);

	if (validNumbers.length > 1) {
		return resolveRating(validNumbers, mostCommon, ++index);
	}

	return binToDec(validNumbers[0]);
};

const oxygenRating = resolveRating(binNumbers, true);
const co2ScrubberRating = resolveRating(binNumbers, false);

const lifeSupportRating = oxygenRating * co2ScrubberRating;
console.log(lifeSupportRating);
