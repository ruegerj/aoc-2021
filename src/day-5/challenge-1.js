import { loadInput } from '../common/input.js';
import {
	countOverlappingPoints,
	createGrid,
	calculateGridDimension,
	parsePoints,
} from './utils.js';

const input = loadInput()
	.split('\n')
	.map((l) => l.trim());

const coveredPoints = parsePoints(input);

const { width, height } = calculateGridDimension(coveredPoints);

const grid = createGrid(width, height);

for (const point of coveredPoints) {
	grid[point.y][point.x]++;
}

const overlapCount = countOverlappingPoints(grid);

console.log(overlapCount);
