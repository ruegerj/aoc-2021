import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { cwd } from 'node:process';
import { assetsDirPath, inputFileName } from './path.js';

/**
 * Loads the content of the input file for the corresponding day and challenge.
 * Day and challenge number will be resolved based on the path of the caller file
 * @param {number | undefined} challenge Optional challenge number
 * @returns {string | undefined} Content of file or `undefined` if not found
 */
export function loadInput(challenge = undefined) {
	const challengeRegexp = /challenge-(\d).*/;

	if (isNaN(challenge)) {
		// Get challenge number from caller file name
		const challengeFile = basename(getCallerFile());
		challenge = +challengeFile.match(challengeRegexp)[1];
	}

	const inputFile = inputFileName(challenge);

	return loadFile(inputFile);
}

/**
 * Loads the content of the given asset file of the corresponding day
 * @param {string} name Name of the asset file whose content should be loaded
 * @returns {string | undefined} Content of the file or `undefined` if not found
 */
export function loadFile(name) {
	// CWD will be the folder holding the challenge files of the according day
	const currentDir = basename(cwd());
	const day = currentDir.split('-')[1];
	const assetsDir = assetsDirPath(day);

	const path = join(assetsDir, name);

	if (!existsSync(path)) {
		return undefined;
	}

	return readFileSync(path, {
		encoding: 'utf-8',
	});
}

/**
 * Resolves the path to the caller file of the function
 * @returns {string} File uri pointing to the caller file
 */
function getCallerFile() {
	// Credits: https://stackoverflow.com/a/29581862
	const originalFunc = Error.prepareStackTrace;

	let callerFile;

	try {
		const error = new Error();
		let currentFile;

		Error.prepareStackTrace = (_, stack) => {
			return stack;
		};

		currentFile = error.stack.shift().getFileName();

		while (error.stack.length) {
			callerFile = error.stack.shift().getFileName();

			if (currentFile !== callerFile) {
				break;
			}
		}
	} catch (error) {}

	Error.prepareStackTrace = originalFunc;

	return callerFile;
}
