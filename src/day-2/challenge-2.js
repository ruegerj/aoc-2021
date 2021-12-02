import { loadInput } from '../common/input.js';

const input = loadInput(1);
const operations = input
	.split('\n')
	.map((o) => o.trim())
	.filter((o) => o);

let aim = 0;
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
			depth += aim * units;
			break;

		case 'down':
			aim += units;
			break;

		case 'up':
			aim -= units;
			break;
	}
}

const total = depth * position;

console.log(total);
