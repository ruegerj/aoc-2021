export function parseInput(input) {
	const lines = input.split('\n').map((l) => l.trim());

	const polymer = lines.splice(0, 2).shift();

	const insertionRules = lines.reduce((map, line) => {
		const [matcher, element] = line.split(' -> ');
		map.set(matcher, element);
		return map;
	}, new Map());

	return [polymer, insertionRules];
}
