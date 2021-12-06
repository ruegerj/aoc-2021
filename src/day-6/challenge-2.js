import { loadInput } from '../common/input.js';

const input = loadInput(1);
const daysToSimulate = 256;

const lanternFish = input.split(',').map((iv) => +iv);

let lifecycle = lanternFish.reduce((acc, cur) => {
	const population = acc.get(cur) ?? 0;
	acc.set(cur, population + 1);

	return acc;
}, new Map());

for (let i = 0; i < daysToSimulate; i++) {
	const updatedLifecycle = new Map();

	let newbornFish = 0;

	for (const stage of lifecycle.keys()) {
		const population = lifecycle.get(stage);

		if (stage > 0) {
			updatedLifecycle.set(stage - 1, population);
			continue;
		}

		newbornFish = population;
	}

	const initialPopulation = updatedLifecycle.get(6) ?? 0;

	updatedLifecycle.set(6, initialPopulation + newbornFish);
	updatedLifecycle.set(8, newbornFish);

	lifecycle = updatedLifecycle;
}

const fishPopulation = Array.from(lifecycle.values()).reduce((acc, cur) => {
	acc += cur;
	return acc;
}, 0);

console.log(fishPopulation);
