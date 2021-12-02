import { loadInput } from '../common/input.js';

const input = loadInput();
const operations = input
	.split('\n')
	.map((o) => o.trim())
	.filter((o) => o);

let depth = 0;
let position = 0;

const parseRegexp = /(\w+) (\d+)/;

for (const operation of operations) {
	const matches = operation.match(parseRegexp);

	const direction = matches[1];
	const units = +matches[2];

	switch (direction) {
		case 'forward':
			position += units;
			break;

		case 'down':
			depth += units;
			break;

		case 'up':
			depth -= units;
			break;
	}
}

const total = depth * position;

console.log(total);
