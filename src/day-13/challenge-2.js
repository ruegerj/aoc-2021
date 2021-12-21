import { loadInput } from '../common/input.js';
import { parseInstructions, parsePoints } from './utils.js';

const input = loadInput(1);
const lines = input.split('\n').map((l) => l.trim());

const points = parsePoints(lines.splice(0, lines.indexOf('')));
const instructions = parseInstructions(lines.filter((l) => l));

for (const { axis, value } of instructions) {
	const affectedPoints = points.filter((p) => p[axis] > value);

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

const rowMap = points.reduce((map, point) => {
	const row = map.get(point.y) ?? [];
	row[point.x] = '[]';
	map.set(point.y, row);

	return map;
}, new Map());

const sortedRows = Array.from(rowMap.keys())
	.sort((a, b) => a - b)
	.map((y) => rowMap.get(y));

for (const row of sortedRows) {
	let line = '';

	for (const point of row) {
		const char = point ?? '  ';
		line += char;
	}

	console.log(line);
}
