import { loadInput } from '../common/input.js';

const input = loadInput();

const entries = input.split('\n').map((l) => l.trim());

const numberDigitCountMap = new Map([
	[1, 2],
	[4, 4],
	[7, 3],
	[8, 7],
]);

let digitCount = 0;

for (const entry of entries) {
	const [patterns, outputValue] = entry.split(' | ');

	const digitCombinations = outputValue.split(' ');

	for (const combination of digitCombinations) {
		const isSearchedNumber = Array.from(
			numberDigitCountMap.values(),
		).includes(combination.length);

		if (!isSearchedNumber) {
			continue;
		}

		digitCount++;
	}
}

console.log(digitCount);
