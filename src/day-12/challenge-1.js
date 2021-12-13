import { loadInput } from '../common/input.js';
import { parseCaveSystem } from './utils.js';

const input = loadInput();
const caveSystem = parseCaveSystem(input);

let pointer = 0;

const foundPaths = searchAvailablePaths('start', 'end');

console.log(foundPaths.length);

function searchAvailablePaths(from, to, visited = new Set(), paths = []) {
	const destinations = caveSystem.get(from);

	if (from == to) {
		const path = paths[pointer];
		paths.push([...path]);
		pointer += 1;

		return paths;
	}

	visited.add(from);

	for (const destination of destinations) {
		const skipDestination =
			visited.has(destination) && !canBeVisitedMultipleTimes(destination);

		if (skipDestination) {
			continue;
		}

		if (!paths[pointer]) {
			paths[pointer] = [];
		}

		paths[pointer].push(destination);

		paths = searchAvailablePaths(destination, to, visited, paths);

		paths[pointer].splice(paths[pointer].indexOf(destination), 1);
	}

	visited.delete(from);

	return paths.filter((p) => p.length);
}

function canBeVisitedMultipleTimes(cave) {
	return cave == cave.toUpperCase() || cave == 'end';
}
