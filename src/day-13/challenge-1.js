import { loadInput } from '../common/input.js';
import { parseInstructions, parsePoints } from './utils.js';

const input = loadInput();
const lines = input.split('\n').map((l) => l.trim());

const points = parsePoints(lines.splice(0, lines.indexOf('')));
const instructions = parseInstructions(lines.filter((l) => l));

for (const { axis, value } of [instructions[0]]) {
	const affectedPoints = points.filter((p) => p[axis] < value);

	for (const point of affectedPoints) {
		const offset = value - point[axis];

		point[axis] = value + offset;

		const overlappingPoint = points.find(
			(c) => c != point && c.x == point.x && c.y == point.y,
		);

		if (!overlappingPoint) {
			continue;
		}

		points.splice(points.indexOf(overlappingPoint), 1);
	}
}

const visibleDots = points.length;

console.log(visibleDots);
