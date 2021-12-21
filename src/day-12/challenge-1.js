import { loadInput } from '../common/input.js';
import { CaveSystem } from './utils.js';

const input = loadInput();
const caveSystem = CaveSystem.parse(input);

const canBeVisited = (cave, path) => {
	const isBigCave = cave == cave.toUpperCase();

	if (isBigCave || cave == 'end') {
		return true;
	}

	return !path.includes(cave);
};

const foundPaths = caveSystem.searchAvailablePaths(
	'start',
	'end',
	canBeVisited,
);

console.log(foundPaths.length);
