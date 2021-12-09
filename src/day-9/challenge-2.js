import { loadInput } from '../common/input.js';
import { getAdjacentPoints, getLowPoints, parseHeightMap } from './utils.js';

const input = loadInput(1);
const heightMap = parseHeightMap(input);
const lowPoints = getLowPoints(heightMap);

const basinSizes = [];

for (const point of lowPoints) {
	const basinPoints = getBasinPoints(point, heightMap);

	basinSizes.push(basinPoints.length);
}

const basinSizesSum = basinSizes
	.sort((a, b) => b - a)
	.slice(0, 3)
	.reduce((counter, size) => {
		counter *= size;
		return counter;
	});

console.log(basinSizesSum);

function getBasinPoints(point, map, basinPoints = []) {
	const { row, position } = point;

	basinPoints.push(point);

	const ascendingPoints = getAdjacentPoints(row, position, map).filter(
		(ap) => ap.height < 9,
	);

	for (const ascendingPoint of ascendingPoints) {
		const isAlreadyTracked = basinPoints.some(
			(bp) =>
				bp.row == ascendingPoint.row &&
				bp.position == ascendingPoint.position,
		);

		if (isAlreadyTracked) {
			continue;
		}

		basinPoints = getBasinPoints(ascendingPoint, map, basinPoints);
	}

	return basinPoints;
}
