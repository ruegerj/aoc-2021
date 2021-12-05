export class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

export function calculateGridDimension(points) {
	let maxX = 0;
	let maxY = 0;

	for (const point of points) {
		const { x, y } = point;

		maxX = x > maxX ? x : maxX;
		maxY = y > maxY ? y : maxY;
	}

	return {
		height: maxY + 1,
		width: maxX + 1,
	};
}

export function countOverlappingPoints(grid, minValue = 2) {
	let overlapCount = 0;

	for (const row of grid) {
		for (const point of row) {
			if (point < minValue) {
				continue;
			}

			overlapCount++;
		}
	}

	return overlapCount;
}

export function createGrid(width, height) {
	const grid = [];

	for (let i = 0; i < height; i++) {
		const row = [];

		for (let j = 0; j < width; j++) {
			row.push(0);
		}

		grid.push(row);
	}

	return grid;
}

export function getXY(point) {
	const [x, y] = point.split(',');
	return {
		x: +x,
		y: +y,
	};
}

export function parsePoints(values, diagonal = false) {
	const points = [];

	for (const value of values) {
		const [from, to] = value.split('->').map((v) => v.trim());

		const start = getXY(from);
		const end = getXY(to);

		const isHorizontal = start.y - end.y == 0;
		const isVertical = start.x - end.x == 0;

		if (isHorizontal) {
			const from = start.x < end.x ? start.x : end.x;
			const to = start.x > end.x ? start.x : end.x;

			let pointer = from;

			while (pointer <= to) {
				points.push(new Point(pointer, start.y));

				pointer++;
			}
		} else if (isVertical) {
			const from = start.y < end.y ? start.y : end.y;
			const to = start.y > end.y ? start.y : end.y;

			let pointer = from;

			while (pointer <= to) {
				points.push(new Point(start.x, pointer));

				pointer++;
			}
		} else {
			// Skip diagonal lines if not requested
			if (!diagonal) {
				continue;
			}

			const increaseX = start.x < end.x;
			const increaseY = start.y < end.y;

			let pointerX = start.x;
			let pointerY = start.y;

			while (
				(increaseX && pointerX <= end.x) ||
				(!increaseX && pointerX >= end.x) ||
				(increaseY && pointerY <= end.y) ||
				(!increaseY && pointerY >= end.y)
			) {
				points.push(new Point(pointerX, pointerY));

				pointerX = increaseX ? pointerX + 1 : pointerX - 1;
				pointerY = increaseY ? pointerY + 1 : pointerY - 1;
			}
		}
	}

	return points;
}
