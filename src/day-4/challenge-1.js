import { loadInput } from '../common/input.js';

const input = loadInput()
	.split('\n')
	.map((l) => l.trim());

const [numberInput] = input.splice(0, 2);
const numbersToDraw = numberInput.split(',').map((n) => +n);

const boards = [];
let board = [];

for (let i = 0; i < input.length; i++) {
	const line = input[i];

	if (!line || i == input.length - 1) {
		boards.push(board);
		board = [];

		continue;
	}

	const row = line
		.split(' ')
		.filter((n) => n)
		.map((n) => +n);

	board.push(row);
}

let winningBoard;
let winningNumber;
const drawnNumbers = new Map();

while (numbersToDraw.length > 0) {
	const drawnNumber = numbersToDraw.shift();
	drawnNumbers.set(drawnNumber);

	for (const board of boards) {
		const columns = [];
		for (let i = 0; i < boards.length; i++) {
			columns.push(board.map((row) => row[i]));
		}

		const numberCheck = (numbers) =>
			numbers.every((num) => drawnNumbers.has(num));

		const hasWinningRow = board.filter(numberCheck).length > 0;
		const hasWinningCol = columns.filter(numberCheck).length > 0;

		if (hasWinningRow || hasWinningCol) {
			winningBoard = board;
			break;
		}
	}

	if (winningBoard) {
		winningNumber = drawnNumber;
		break;
	}
}

let unmarkedNumbers = [];

for (let i = 0; i < winningBoard.length; i++) {
	const row = winningBoard[i];

	for (let j = 0; j < row.length; j++) {
		const number = row[j];

		if (drawnNumbers.has(number)) {
			continue;
		}

		unmarkedNumbers.push(number);
	}
}

const unmarkedNumberSum = unmarkedNumbers.reduce((acc, cur) => (acc += cur), 0);
const score = unmarkedNumberSum * winningNumber;

console.log(score);
