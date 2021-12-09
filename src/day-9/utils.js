export class Point {
	constructor(row, position, height) {
		this.row = row;
		this.position = position;
		this.height = height;
	}
}

export function getAdjacentPoints(row, position, array) {
	const rowAbove = array[row + 1];
	const rowBelow = array[row - 1];

	const adjacentPoints = [
		new Point(row, position + 1, array[row][position + 1]),
		new Point(row, position - 1, array[row][position - 1]),
	];

	if (rowAbove) {
		adjacentPoints.push(new Point(row + 1, position, rowAbove[position]));
	}

	if (rowBelow) {
		adjacentPoints.push(new Point(row - 1, position, rowBelow[position]));
	}

	return adjacentPoints.filter((p) => p.height != undefined);
}

export function getLowPoints(heightMap) {
	const lowPoints = [];

	for (let i = 0; i < heightMap.length; i++) {
		const row = heightMap[i];

		for (let j = 0; j < row.length; j++) {
			const height = row[j];

			const adjacentPoints = getAdjacentPoints(i, j, heightMap);

			if (adjacentPoints.some((p) => p.height <= height)) {
				continue;
			}

			lowPoints.push(new Point(i, j, height));
		}
	}

	return lowPoints;
}

export function parseHeightMap(input) {
	return input.split('\n').map((l) =>
		l
			.trim()
			.split('')
			.map((v) => +v),
	);
}
