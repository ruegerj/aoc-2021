export const openingTagMap = new Map([
	[')', '('],
	[']', '['],
	['}', '{'],
	['>', '<'],
]);

export function isOpeningTag(char) {
	const openingTags = ['<', '[', '{', '('];

	return openingTags.includes(char);
}
