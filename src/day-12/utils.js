export class CaveSystem {
	constructor(caves, tunnels) {
		this.system = new Map();

		caves.forEach((c) => this.addCave(c));
		tunnels.forEach((t) => this.addTunnel(...t));
	}

	static parse(input) {
		const tunnels = input.split('\n').map((l) => l.trim().split('-'));
		const caves = new Set(tunnels.flat());

		return new CaveSystem(caves, tunnels);
	}

	addCave(cave) {
		this.system.set(cave, []);
	}

	addTunnel(from, to) {
		this.system.get(from).push(to);
		this.system.get(to).push(from);
	}

	get(cave) {
		return this.system.get(cave);
	}

	searchAvailablePaths(from, to, canBeVisited, visited = [], paths = []) {
		if (from === to) {
			paths.push([...visited]);
			return paths;
		}

		visited.push(from);

		const adjacentCaves = this.get(from);

		for (const cave of adjacentCaves) {
			const skipCave = !canBeVisited(cave, visited);

			if (skipCave) {
				continue;
			}

			paths = this.searchAvailablePaths(
				cave,
				to,
				canBeVisited,
				[...visited],
				paths,
			);
		}

		return paths;
	}
}
