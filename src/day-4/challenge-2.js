import { loadInput } from '../common/input.js';
import { parseBingo, hasWon, getScore } from './utils.js';

const input = loadInput(1)
	.split('\n')
	.map((l) => l.trim());

const [numbersToDraw, boards] = parseBingo(input);

const winningNumberScoreMap = new Map();

for (const board of boards) {
	const drawnNumbers = new Map();

	for (const number of numbersToDraw) {
		drawnNumbers.set(number);

		if (!hasWon(board, drawnNumbers)) {
			continue;
		}

		const boardScore = getScore(board, drawnNumbers);

		winningNumberScoreMap.set(number, boardScore * number);
		break;
	}
}

const [lastWinningNumber] = Array.from(winningNumberScoreMap.keys()).sort(
	(a, b) => numbersToDraw.indexOf(b) - numbersToDraw.indexOf(a),
);

const score = winningNumberScoreMap.get(lastWinningNumber);

console.log(score);
