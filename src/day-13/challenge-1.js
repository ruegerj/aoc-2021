import { loadInput } from '../common/input.js';

const input = loadInput();
const lines = input.split('\n').map((l) => l.trim());

const points = parsePoints(lines.splice(0, lines.indexOf('')));
const instructions = parseInstructions(lines.filter((l) => l));

for (const { direction, value } of [instructions[0]]) {
	const affectedPoints = points.filter((p) => p[direction] < value);

	for (const point of affectedPoints) {
		const offset = value - point[direction];

		point[direction] = value + offset;

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

function parsePoints(lines) {
	return lines.map((coordinate) => {
		const [x, y] = coordinate.split(',').map((v) => +v);

		return {
			x,
			y,
		};
	});
}

function parseInstructions(input) {
	const instructions = [];
	const parseRegexp = /(x|y){1}=([0-9]+)/;

	for (const line of input) {
		const matches = line.match(parseRegexp);

		const instruction = {
			direction: matches[1],
			value: parseInt(matches[2]),
		};

		instructions.push(instruction);
	}

	return instructions;
}
