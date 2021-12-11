export class Octopus {
	constructor(row, position, lightLevel) {
		this.row = row;
		this.position = position;
		this.lightLevel = lightLevel;
	}

	adjacentOctopuses(grid) {
		const rowAbove = grid[this.row + 1];
		const rowBelow = grid[this.row - 1];

		let adjacentOctopuses = [
			grid[this.row][this.position + 1],
			grid[this.row][this.position - 1],
		];

		if (rowAbove) {
			adjacentOctopuses = adjacentOctopuses.concat([
				rowAbove[this.position],
				rowAbove[this.position + 1],
				rowAbove[this.position - 1],
			]);
		}

		if (rowBelow) {
			adjacentOctopuses = adjacentOctopuses.concat([
				rowBelow[this.position],
				rowBelow[this.position + 1],
				rowBelow[this.position - 1],
			]);
		}

		return adjacentOctopuses.filter((o) => o != undefined);
	}

	flash(grid, flashedOctopuses = []) {
		const hasFlashedAlready = flashedOctopuses.some(
			(o) => o.row == this.row && o.position == this.position,
		);

		if (hasFlashedAlready) {
			return flashedOctopuses;
		}

		this.lightLevel = 0;
		flashedOctopuses.push(this);

		const adjacentOctopuses = this.adjacentOctopuses(grid);

		for (const octopus of adjacentOctopuses) {
			if (octopus.lightLevel == 0) {
				continue;
			}

			octopus.lightLevel += 1;

			if (octopus.lightLevel <= 9) {
				continue;
			}

			flashedOctopuses = octopus.flash(grid, flashedOctopuses);
		}

		return flashedOctopuses;
	}
}

export function parseOctopusGrid(input) {
	return input.split('\n').map((l, i) =>
		l
			.trim()
			.split('')
			.map((v, j) => new Octopus(i, j, +v)),
	);
}
