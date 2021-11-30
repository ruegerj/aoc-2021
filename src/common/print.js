/**
 * Prints the given text to the console, formatted as a warning
 * @param {string} warning Warning to print out
 */
export function printWarning(warning) {
	console.warn(`❓ ${warning}`);
}

/**
 * Prints the given text to the console, formatted as a time label
 * @param {string} warning Time label to print out
 */
export function printTimeLabel(label) {
	console.log(`⏰ ${label}`);
}

/**
 * Prints the given text to the console, formatted as a result of a challenge
 * @param {string} warning Result to print out
 */
export function printResult(result) {
	console.log('🔎 Result:');
	console.log('-----');
	console.log(result);
	console.log('-----');
}
