import { loadInput } from '../common/input.js';
import { openingTagMap, isOpeningTag } from './utils.js';

const input = loadInput();

const codeLines = input.split('\n').map((l) => l.trim());

const illegalCharacters = [];

for (const line of codeLines) {
	const openingTagQueue = [];

	for (const char of line) {
		if (isOpeningTag(char)) {
			openingTagQueue.push(char);
			continue;
		}

		const openingTag = openingTagQueue.pop();

		if (openingTag == openingTagMap.get(char)) {
			continue;
		}

		illegalCharacters.push(char);
		break;
	}
}

const score = calculateScore(illegalCharacters);

console.log(score);

function calculateScore(characters) {
	const characterPointMap = new Map([
		[')', 3],
		[']', 57],
		['}', 1197],
		['>', 25137],
	]);

	return characters.reduce((score, char) => {
		score += characterPointMap.get(char);
		return score;
	}, 0);
}
