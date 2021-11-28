import minimist from 'minimist';
import { run } from './common/day-runner.js';
import { printWarning } from './common/printer.js';

// Parse cli args
const args = minimist(process.argv.slice(2), {
	alias: {
		c: 'challenge',
		d: 'day',
	},
});

if (!args.day) {
	printWarning('Please specify the day which should be ran');
	process.exit(0);
}

console.log('🎄 Advent of Code 2021');

run(args.day, args.challenge);
