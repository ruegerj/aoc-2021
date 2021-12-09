import { loadInput } from '../common/input.js';
import { getLowPoints, parseHeightMap } from './utils.js';

const input = loadInput();
const heightMap = parseHeightMap(input);
const lowPoints = getLowPoints(heightMap);

const riskLevel = lowPoints.reduce((counter, point) => {
	counter += point.height + 1;
	return counter;
}, 0);

console.log(riskLevel);
