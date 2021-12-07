import { loadInput } from '../common/input.js';
import {
	getDifference,
	factorialSum,
	getMaxValue,
	parsePositions,
} from './utils.js';

const input = loadInput(1);

const crabPositions = parsePositions(input);

const uniquePositions = new Set(crabPositions);

const minPos = 0;
const maxPos = getMaxValue(uniquePositions);

const fuelCostMap = new Map();

for (let i = minPos; i <= maxPos; i++) {
	const fuelCost = crabPositions.reduce((cost, position) => {
		const difference = getDifference(position, i);

		cost += factorialSum(difference);

		return cost;
	}, 0);

	fuelCostMap.set(i, fuelCost);
}

const sortedValues = Array.from(fuelCostMap.values()).sort((a, b) => a - b);

const minimalFuelRequired = sortedValues.shift();

console.log(minimalFuelRequired);
