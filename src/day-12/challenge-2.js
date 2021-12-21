import { loadInput } from '../common/input.js';
import { CaveSystem } from './utils.js';

const input = loadInput(1);
const caveSystem = CaveSystem.parse(input);

const canBeVisited = (cave, path) => {
	if (cave == 'start') {
		return false;
	}

	const isBigCave = cave === cave.toUpperCase();

	if (isBigCave || cave === 'end') {
		return true;
	}

	const visitCounts = path
		.filter((c) => c === c.toLowerCase())
		.reduce((counter, c) => {
			const count = counter.get(c) ?? 0;
			counter.set(c, count + 1);

			return counter;
		}, new Map());

	const visitCount = visitCounts.get(cave) ?? 0;

	const cavesVisitedTwice = Array.from(visitCounts.keys()).filter(
		(c) => visitCounts.get(c) > 1,
	);

	if (cavesVisitedTwice.includes(cave)) {
		return false;
	}

	return cavesVisitedTwice.length == 0 || visitCount == 0;
};

const foundPaths = caveSystem.searchAvailablePaths(
	'start',
	'end',
	canBeVisited,
);

console.log(foundPaths.length);
