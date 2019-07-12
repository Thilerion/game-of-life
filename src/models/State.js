import { LIVE, DEAD } from '../constants';
import { copy2dArray } from '../utils';

export default class State {
	constructor(grid) {
		this.grid = grid;

		this.rows = this.grid.length;
		this.cols = this.grid[0].length;
	}

	cellAt(x, y) {
		return this.grid[y][x];
	}

	withinBounds(x, y) {
		return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
	}

	getNeigbors(x, y) {
		let count = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (i === 0 && j === 0) {
					continue; //skip own cell
				} else if (!this.withinBounds(x + i, y + j)) {
					continue; //skip cells outside of grid
				} else if (this.cellAt(x + i, y + j) === LIVE) {
					count++;
				}
			}
		}
		return count;
	}

	update() {
		const changes = this.getNextGeneration();
		const newGrid = copy2dArray(this.grid);

		for (let { x, y, type } of changes) {
			newGrid[y][x] = type;
		}

		return {
			state: new State(newGrid),
			changes
		};
	}

	getNextGeneration() {
		const changes = [];

		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const type = this.cellAt(x, y);
				const count = this.getNeigbors(x, y);

				if (type === DEAD && count === 3) {
					changes.push({ x, y, type: LIVE });
				} else if (type === LIVE) {
					if (count < 2 || count > 3) {
						changes.push({ x, y, type: DEAD });
					}
				}
			}
		}
		return changes;
	}

	static random(width, height, threshold = 0.25) {
		let arr = [];
		for (let y = 0; y < height; y++) {
			arr[y] = [];
			for (let x = 0; x < width; x++) {
				if (Math.random() < threshold) {
					arr[y][x] = LIVE;
				} else {
					arr[y][x] = DEAD;
				}
			}
		}
		return new State(arr);
	}
}