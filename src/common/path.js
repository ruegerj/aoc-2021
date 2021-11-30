import { join } from 'node:path';
import { cwd } from 'node:process';
import { DAY_PREFIX, CHALLENGE_PREFIX } from './constants.js';

/**
 * Resolves the path of the directory holding the code of the given day
 * @param {number} day Number of the day whose code directory should be resolved
 * @returns {string} Path of the directory holding the code of the given day
 */
export function codeDirPath(day) {
	return join(cwd(), 'src', `${DAY_PREFIX}-${day}`);
}

/**
 * Resolves the path of the entry file of the given day and challenge
 * @param {number} day Number of the day of the challenge
 * @param {number} challenge Number of the challenge whose entry file should be resolved
 * @returns Path of the entry file of the given day and challenge
 */
export function entryFilePath(day, challenge) {
	return join(codeDirPath(day), `${CHALLENGE_PREFIX}-${challenge}.js`);
}

/**
 * Resolves the path of the directory holding the assets of the given day
 * @param {number} day Number of the day whose assets-directory should be resolved
 * @returns {string} Path of the directory holding the assets of the given day
 */
export function assetsDirPath(day) {
	return join(cwd(), '..', '..', 'assets', `${DAY_PREFIX}-${day}`);
}

/**
 * Resolves the name of the input file for the given challenge
 * @param {number} challenge Number of the challenge whose input file name should be resolved
 * @returns {string} Name of the input file for the given challenge
 */
export function inputFileName(challenge) {
	return `${CHALLENGE_PREFIX}-${challenge}.input.txt`;
}
