import { loadInput } from '../common/input.js';

const input = loadInput();
const daysToSimulate = 80;

let lanternFish = input.split(',').map((iv) => +iv);
let newbornFish = [];

for (let i = 0; i < daysToSimulate; i++) {
	for (let j = 0; j < lanternFish.length; j++) {
		const fish = lanternFish[j];

		if (fish > 0) {
			lanternFish[j]--;
			continue;
		}

		newbornFish.push(8);
		lanternFish[j] = 6;
	}

	lanternFish = lanternFish.concat(newbornFish);

	newbornFish = [];
}

console.log(lanternFish.length);
