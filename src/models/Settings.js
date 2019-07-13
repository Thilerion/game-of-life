import { DEAD, LIVE } from '../constants';

class Settings {
	constructor() {
		this.cellSize = 6;
		this.gridLineSize = 1;
		
		this.rows = 100;
		this.cols = 100;

		this.colors = {
			[LIVE]: "#AAAAAA",
			[DEAD]: "#000000",
			gridLine: "#222"
		}
	}

	get canvasWidth() {
		return this.gridLineSize + this.cols * (this.cellSize + this.gridLineSize);
	}
	get canvasHeight() {
		return this.gridLineSize + this.rows * (this.cellSize + this.gridLineSize);
	}
}

const settings = new Settings();

export default settings;