import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import ora from 'ora';
import { entryFilePath, codeDirPath } from './path.js';
import { printResult, printTimeLabel, printWarning } from './print.js';

/**
 * Executes the code of the day with the given number
 * @param {number} day Number of the day which should be ran
 * @param {number} challenge Number of the challenge of the given day, defaults to 1
 */
export function run(day, challenge = 1) {
	const exists = checkIfDayExists(day, challenge);

	if (!exists) {
		printWarning(`Day ${day} / Challenge ${challenge} could not be found`);
		return;
	}

	const dirPath = codeDirPath(day);
	const filePath = entryFilePath(day, challenge);

	const startedAt = new Date();

	const spinner = ora(` Day ${day} / Challenge ${challenge}`);
	spinner.start();

	// Run entry file of day/challenge
	exec(
		`node ${filePath}`,
		{
			cwd: dirPath,
		},
		(err, stdout, stderr) => {
			if (err) {
				spinner.fail('Something went wrong...');
				console.error(stderr);
				return;
			}

			const executionTime = new Date().getTime() - startedAt.getTime();

			spinner.succeed();
			printTimeLabel(`Executed in ${executionTime}ms`);
			printResult(stdout);
		},
	);
}

/**
 * Checks if the entry file for the given challenge and day exists
 * @param {number} day Number of the day for whose existence shall be checked
 * @param {number} challenge Number of the challenge of the given day, defaults to 1
 * @returns {boolean} If the entry-file for the given day and challenge exists
 */
function checkIfDayExists(day, challenge = 1) {
	const path = entryFilePath(day, challenge);

	return existsSync(path);
}
