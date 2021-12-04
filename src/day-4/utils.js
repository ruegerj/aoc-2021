export function parseBingo(input) {
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

	return [numbersToDraw, boards];
}

export function getScore(board, drawnNumbers) {
	let unmarkedNumbers = [];

	for (let i = 0; i < board.length; i++) {
		const row = board[i];

		for (let j = 0; j < row.length; j++) {
			const number = row[j];

			if (drawnNumbers.has(number)) {
				continue;
			}

			unmarkedNumbers.push(number);
		}
	}

	return unmarkedNumbers.reduce((acc, cur) => (acc += cur), 0);
}

export function getColumns(board) {
	const columns = [];

	for (let i = 0; i < board.length; i++) {
		columns.push(board.map((row) => row[i]));
	}

	return columns;
}

export function hasWon(board, drawnNumbers) {
	const columns = getColumns(board);

	const numberCheck = (numbers) =>
		numbers.every((num) => drawnNumbers.has(num));

	const hasWinningRow = board.filter(numberCheck).length > 0;
	const hasWinningCol = columns.filter(numberCheck).length > 0;

	return hasWinningRow || hasWinningCol;
}
