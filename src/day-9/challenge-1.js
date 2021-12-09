import { loadInput } from '../common/input.js';

const input = loadInput();

const heightMap = input.split('\n').map((l) =>
	l
		.trim()
		.split('')
		.map((v) => +v),
);

const lowestPoints = [];

for (let i = 0; i < heightMap.length; i++) {
	const row = heightMap[i];

	for (let j = 0; j < row.length; j++) {
		const height = row[j];

		const adjacentHeights = getAdjacentHeights(i, j, heightMap);

		if (adjacentHeights.some((h) => h <= height)) {
			continue;
		}

		lowestPoints.push(height);
	}
}

const riskLevel = lowestPoints.reduce((counter, height) => {
	counter += height + 1;
	return counter;
}, 0);

console.log(riskLevel);

function getAdjacentHeights(row, position, array) {
	const rowAbove = array[row + 1];
	const rowBelow = array[row - 1];

	const adjacentHeights = [
		array[row][position + 1],
		array[row][position - 1],
	];

	if (rowAbove) {
		adjacentHeights.push(rowAbove[position]);
	}

	if (rowBelow) {
		adjacentHeights.push(rowBelow[position]);
	}

	return adjacentHeights.filter((h) => h != undefined);
}
