export function getIndexMap(binValues) {
	const indexBitMap = [];

	for (const binValue of binValues) {
		const bits = binValue.split('');

		for (let i = 0; i < bits.length; i++) {
			const bit = +bits[i];

			if (!indexBitMap[i]) {
				indexBitMap[i] = [];
			}

			indexBitMap[i].push(bit);
		}
	}

	return indexBitMap;
}

export function getMostCommonBit(bits) {
	const zeroBitsCount = bits.filter((b) => b === 0).length;
	const oneBitsCount = bits.length - zeroBitsCount;

	if (zeroBitsCount === oneBitsCount) {
		return 1;
	}

	return oneBitsCount > zeroBitsCount ? 1 : 0;
}

export function getLeastCommonBit(bits) {
	const zeroBitsCount = bits.filter((b) => b === 0).length;
	const oneBitsCount = bits.length - zeroBitsCount;

	if (zeroBitsCount === oneBitsCount) {
		return 0;
	}

	return oneBitsCount < zeroBitsCount ? 1 : 0;
}

export function binToDec(bin) {
	return parseInt(bin, 2);
}
