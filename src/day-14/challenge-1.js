import { loadInput } from '../common/input.js';
import { parseInput } from './utils.js';

const input = loadInput();
const [polymer, insertionRules] = parseInput(input);

const steps = 10;
let polymerElements = polymer.split('');

for (let i = 0; i < steps; i++) {
	let insertions = [];

	for (const [matcher, element] of insertionRules) {
		let matcherRegexpSource = `(?=(${matcher}{1}))`;

		const matcherRegexp = new RegExp(matcherRegexpSource, 'g');

		const matches = polymerElements.join('').matchAll(matcherRegexp);

		for (const { index } of matches) {
			insertions.push({
				matcher,
				insertAt: index + 1,
				element,
			});
		}
	}

	insertions = insertions.sort((a, b) => a.insertAt - b.insertAt);

	for (let i = 0; i < insertions.length; i++) {
		const { insertAt, element } = insertions[i];

		polymerElements.splice(insertAt + i, 0, element);
	}
}

const elementCounter = new Map();

for (const element of polymerElements) {
	const count = elementCounter.get(element) || 0;
	elementCounter.set(element, count + 1);
}

const sortedElementCounts = Array.from(elementCounter.values()).sort(
	(a, b) => a - b,
);

const min = sortedElementCounts.shift();
const max = sortedElementCounts.pop();

const score = max - min;

console.log(score);
