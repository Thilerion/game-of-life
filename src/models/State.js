import { LIVE, DEAD } from '../constants';
import { cloneNDArray } from '../utils';

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

	getNeighbors(x, y) {
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
		const newGrid = cloneNDArray(this.grid);

		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.cols; x++) {
				const type = this.cellAt(x, y);
				const count = this.getNeighbors(x, y);

				// if (x < 2 && y < 2) debugger;

				if (type === DEAD && count === 3) {
					newGrid[y][x] = LIVE;
				} else if (type === LIVE) {
					if (count < 2 || count > 3) {
						newGrid[y][x] = DEAD;
					}
				}
			}
		}

		return new State(newGrid);
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