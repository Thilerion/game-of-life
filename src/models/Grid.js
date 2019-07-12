import { copy2dArray } from '../utils';
import { LIVE } from '../constants';

export default class Grid {
	constructor(grid) {
		this._grid = grid;
		this._nextGrid = copy2dArray(grid);

		this.height = grid.length;
		this.width = grid[0].length;
	}

	getCell(x, y) {
		return this._grid[y][x];
	}

	setCell(x, y, type) {
		this._nextGrid[y][x] = type;
		return this;
	}

	next() {
		this._grid = copy2dArray(this._nextGrid);
		return this;
	}

	withinBounds(x, y) {
		return x >= 0 && y >= 0 && x < this.width && y < this.height;
	}

	getNeigbors(x, y) {
		let count = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (i === 0 && j === 0) {
					continue; //skip own cell
				} else if (!this.withinBounds(x + i, y + j)) {
					continue; //skip cells outside of grid
				} else if (this.getCell(x + i, y + j) === LIVE) {
					count++;
				}
			}
		}
		return count;
	}
}