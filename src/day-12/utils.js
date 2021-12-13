export class CaveSystem {
	constructor(caves, tunnels) {
		this.system = new Map();

		caves.forEach((c) => this.addCave(c));
		tunnels.forEach((t) => this.addTunnel(...t));
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
}

export function parseCaveSystem(input) {
	const tunnels = input.split('\n').map((l) => l.trim().split('-'));
	const caves = new Set(tunnels.flat());

	return new CaveSystem(caves, tunnels);
}
