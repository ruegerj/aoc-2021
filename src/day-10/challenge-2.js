import { loadInput } from '../common/input.js';
import { openingTagMap, isOpeningTag } from './utils.js';

const input = loadInput(1);

const codeLines = input.split('\n').map((l) => l.trim());

const closingTagMap = new Map([
	['(', ')'],
	['[', ']'],
	['{', '}'],
	['<', '>'],
]);

const autoCompletions = [];

for (const line of codeLines) {
	let isCorrupt = false;
	const openingTagQueue = [];

	for (const char of line) {
		if (isOpeningTag(char)) {
			openingTagQueue.push(char);
			continue;
		}

		const openingTag = openingTagQueue.pop();

		if (openingTag != openingTagMap.get(char)) {
			isCorrupt = true;
			break;
		}
	}

	if (isCorrupt) {
		continue;
	}

	if (!openingTagQueue.length) {
		continue;
	}

	const autoCompletion = openingTagQueue
		.reverse()
		.map((t) => closingTagMap.get(t));

	autoCompletions.push(autoCompletion);
}

const score = calculateScore(autoCompletions);

console.log(score);

function calculateScore(completions) {
	const characterPointMap = new Map([
		[')', 1],
		[']', 2],
		['}', 3],
		['>', 4],
	]);

	const scores = [];

	for (const completion of completions) {
		const score = completion.reduce((points, char) => {
			points = points * 5;
			points += characterPointMap.get(char);

			return points;
		}, 0);

		scores.push(score);
	}

	const sortedScores = scores.sort((a, b) => a - b);
	const middleIndex = Math.floor(sortedScores.length / 2);

	return sortedScores[middleIndex];
}
