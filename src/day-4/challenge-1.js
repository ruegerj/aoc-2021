import { loadInput } from '../common/input.js';
import { getColumns, getScore, hasWon, parseBingo } from './utils.js';

const input = loadInput()
	.split('\n')
	.map((l) => l.trim());

const [numbersToDraw, boards] = parseBingo(input);

let winningBoard;
let winningNumber;
const drawnNumbers = new Map();

while (numbersToDraw.length > 0) {
	const drawnNumber = numbersToDraw.shift();
	drawnNumbers.set(drawnNumber);

	for (const board of boards) {
		const won = hasWon(board, drawnNumbers);

		if (!won) {
			continue;
		}

		winningBoard = board;
		break;
	}

	if (winningBoard) {
		winningNumber = drawnNumber;
		break;
	}
}

const boardScore = getScore(winningBoard, drawnNumbers);
const score = boardScore * winningNumber;

console.log(score);
