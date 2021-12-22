import { loadInput } from '../common/input.js';

const input = loadInput();
const lines = input.split('\n').map((l) => l.trim());

let polymer = lines.splice(0, 2).shift();
const insertionRules = lines.map((l) => {
	const [matcher, element] = l.split(' -> ');
	return {
		matcher,
		element,
	};
});

const steps = 10;

for (let i = 0; i < steps; i++) {
	let insertions = [];

	for (const { matcher, element } of insertionRules) {
		let matcherRegexpSource = `(?=(${matcher}{1}))`;

		const matcherRegexp = new RegExp(matcherRegexpSource, 'g');

		const matches = polymer.matchAll(matcherRegexp);

		for (const { index } of matches) {
			insertions.push({
				matcher,
				insertAt: index + 1,
				element,
			});
		}
	}

	insertions = insertions.sort((a, b) => a.insertAt - b.insertAt);

	const polymerElements = polymer.split('');

	for (let i = 0; i < insertions.length; i++) {
		const { insertAt, element } = insertions[i];

		polymerElements.splice(insertAt + i, 0, element);
	}

	polymer = polymerElements.join('');
}

const elementCounter = new Map();
const elements = polymer.split('');

for (const element of elements) {
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
