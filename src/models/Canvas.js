export default class Canvas {
	constructor(el, settings) {
		this.canvas = el;
		this.ctx = el.getContext("2d");

		this.settings = settings;

		this.width = settings.canvasWidth;
		this.height = settings.canvasHeight;

		this.canvas.width = this.width;
		this.canvas.height = this.height;
	}

	render({ state, changes, efficient = true }) {
		this.drawGridLines();
	}

	drawGridLines() {
		this.ctx.strokeStyle = this.settings.colors.gridLine;
		
		const lineSize = this.settings.gridLineSize;
		const cellSize = this.settings.cellSize;
		const rows = this.settings.rows;
		const cols = this.settings.cols;
		const halfLineMod = lineSize % 2 === 0 ? 0 : lineSize / 2;

		// horizontal
		for (let i = 0; i <= cols; i++) {
			this.ctx.beginPath();
			this.ctx.lineWidth = lineSize;
			this.ctx.moveTo(0, (cellSize + lineSize) * i + halfLineMod);
			this.ctx.lineTo(this.width, (cellSize + lineSize) * i + halfLineMod);
			this.ctx.stroke();
		}

		// vertical
		for (let i = 0; i <= rows; i++) {
			this.ctx.beginPath();
			this.ctx.lineWidth = lineSize;
			this.ctx.moveTo((cellSize + lineSize) * i + halfLineMod, 0);
			this.ctx.lineTo((cellSize + lineSize) * i + halfLineMod, this.height);
			this.ctx.stroke();
		}
	}
}