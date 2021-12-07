import { loadInput } from '../common/input.js';

const input = loadInput();

const crabPositions = input.split(',').map((p) => +p);

const uniquePositions = new Set(crabPositions);

const minPos = 0;
let maxPos = 0;

for (const position of uniquePositions) {
	maxPos = position > maxPos ? position : maxPos;
}

const fuelCostMap = new Map();

for (let i = minPos; i <= maxPos; i++) {
	const fuelCost = crabPositions.reduce((cost, position) => {
		const difference = position - i;

		cost += difference < 0 ? difference * -1 : difference;

		return cost;
	}, 0);

	fuelCostMap.set(i, fuelCost);
}

const sortedEntries = Array.from(fuelCostMap.values()).sort((a, b) => a - b);

const minimalFuelRequired = sortedEntries.shift();

console.log(minimalFuelRequired);
