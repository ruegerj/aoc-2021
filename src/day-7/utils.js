export function getDifference(a, b) {
	let difference = a - b;

	difference = difference < 0 ? difference * -1 : difference;

	return difference;
}

export function getMaxValue(values) {
	let maxValue = 0;

	for (const value of values) {
		maxValue = value > maxValue ? value : maxValue;
	}

	return maxValue;
}

export function factorialSum(number) {
	let sum = 0;

	for (let i = number; i > 0; i--) {
		sum += i;
	}

	return sum;
}

export function parsePositions(input) {
	return input.split(',').map((p) => +p);
}
