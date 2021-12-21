export function parsePoints(lines) {
	return lines.map((coordinate) => {
		const [x, y] = coordinate.split(',').map((v) => +v);

		return {
			x,
			y,
		};
	});
}

export function parseInstructions(lines) {
	const parseRegexp = /(?<axis>x|y){1}=(?<value>[0-9]+)/;

	return lines.map((line) => {
		const { axis, value } = line.match(parseRegexp).groups;

		return {
			axis,
			value: +value,
		};
	});
}
