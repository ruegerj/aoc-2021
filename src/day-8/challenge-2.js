import { loadInput } from '../common/input.js';

const input = loadInput(1);

const entries = input.split('\n').map((l) => l.trim());

const parsedOutputValues = [];

for (const entry of entries) {
	const [patterns, outputValue] = entry.split(' | ').map((v) => v.split(' '));

	const digitNumberMask = buildDigitNumberMask(patterns);

	let outputValueDigits = '';

	for (const part of outputValue) {
		const digit = getMaskedDigit(part, digitNumberMask);

		outputValueDigits += digit;
	}

	parsedOutputValues.push(parseInt(outputValueDigits));
}

const outputValuesSum = parsedOutputValues.reduce((sum, num) => {
	sum += num;
	return sum;
}, 0);

console.log(outputValuesSum);

function buildDigitNumberMask(patterns) {
	const digitCountUniqueNumberMap = new Map([
		[2, 1],
		[4, 4],
		[3, 7],
		[7, 8],
	]);

	const mask = new Map();

	const commonPatterns = [];

	// Map unique numbers to mask
	for (const pattern of patterns) {
		const length = pattern.length;

		const isUniquePattern = digitCountUniqueNumberMap.has(length);

		if (!isUniquePattern) {
			commonPatterns.push(pattern);
			continue;
		}

		mask.set(digitCountUniqueNumberMap.get(length), pattern);
	}

	for (const pattern of commonPatterns) {
		const length = pattern.length;
		const commonDigitsWithOne = getCommonDigitCount(pattern, mask.get(1));
		const commonDigitsWithFour = getCommonDigitCount(pattern, mask.get(4));
		const commonDigitsWithSeven = getCommonDigitCount(pattern, mask.get(7));
		const commonDigitsWithEight = getCommonDigitCount(pattern, mask.get(8));

		if (length == 5 && commonDigitsWithFour == 2) {
			mask.set(2, pattern);
			continue;
		}

		if (length == 5 && commonDigitsWithSeven == 3) {
			mask.set(3, pattern);
			continue;
		}

		if (
			length == 5 &&
			commonDigitsWithOne == 1 &&
			commonDigitsWithFour == 3
		) {
			mask.set(5, pattern);
			continue;
		}

		if (length == 6 && commonDigitsWithOne == 1) {
			mask.set(6, pattern);
			continue;
		}

		if (length == 6 && commonDigitsWithFour == 4) {
			mask.set(9, pattern);
			continue;
		}

		if (
			length == 6 &&
			commonDigitsWithFour == 3 &&
			commonDigitsWithSeven == 3
		) {
			mask.set(0, pattern);
			continue;
		}
	}

	return mask;
}

function getCommonDigitCount(patternA, patternB) {
	let commonDigitCount = 0;

	const digitsA = patternA.split('');
	const digitsB = patternB.split('');

	for (const digit of digitsA) {
		if (!digitsB.includes(digit)) {
			continue;
		}

		commonDigitCount++;
	}

	return commonDigitCount;
}

function getMaskedDigit(value, mask) {
	let digit;

	for (const [number, pattern] of mask.entries()) {
		const matchesPattern = pattern
			.split('')
			.every((d) => value.includes(d));

		if (value.length != pattern.length || !matchesPattern) {
			continue;
		}

		digit = number;
		break;
	}

	return digit;
}
