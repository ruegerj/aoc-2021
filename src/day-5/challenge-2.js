import { loadInput } from '../common/input.js';
import {
	calculateGridDimension,
	countOverlappingPoints,
	createGrid,
	parsePoints,
} from './utils.js';

const input = loadInput(1)
	.split('\n')
	.map((l) => l.trim());

const coveredPoints = parsePoints(input, true);

const { width, height } = calculateGridDimension(coveredPoints);

const grid = createGrid(width, height);

for (const point of coveredPoints) {
	grid[point.y][point.x]++;
}

const overlapCount = countOverlappingPoints(grid);

console.log(overlapCount);
