import { loadInput } from '../common/input.js';

const input = loadInput()
	.split('\n')
	.map((l) => l.trim());

let maxX = 0;
let maxY = 0;

const coveredPoints = [];

const getXY = (v) => {
	const [x, y] = v.split(',');
	return {
		x: +x,
		y: +y,
	};
};

const updateGridDimensions = (point) => {
	const { x, y } = point;

	maxX = x > maxX ? x : maxX;
	maxY = y > maxY ? y : maxY;
};

for (const value of input) {
	const [from, to] = value.split('->').map((v) => v.trim());

	const start = getXY(from);
	const end = getXY(to);

	updateGridDimensions(start);
	updateGridDimensions(end);

	const hasXLine = start.x - end.x != 0;
	const hasYLine = start.y - end.y != 0;

	// Skip diagonals
	if (hasXLine && hasYLine) {
		continue;
	}

	if (hasXLine) {
		const from = start.x < end.x ? start.x : end.x;
		const to = start.x > end.x ? start.x : end.x;

		let pointer = from;

		while (pointer <= to) {
			coveredPoints.push({
				x: pointer,
				y: start.y,
			});

			pointer++;
		}
	}

	if (hasYLine) {
		const from = start.y < end.y ? start.y : end.y;
		const to = start.y > end.y ? start.y : end.y;

		let pointer = from;

		while (pointer <= to) {
			coveredPoints.push({
				x: start.x,
				y: pointer,
			});

			pointer++;
		}
	}
}

maxX++;
maxY++;

const grid = [];

for (let i = 0; i < maxY; i++) {
	const row = [];

	for (let j = 0; j < maxX; j++) {
		row.push(0);
	}

	grid.push(row);
}

for (const point of coveredPoints) {
	grid[point.y][point.x]++;
}

let overlapCount = 0;

for (const row of grid) {
	for (const point of row) {
		if (point <= 1) {
			continue;
		}

		overlapCount++;
	}
}

console.log(overlapCount);
