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
		
		if (this.efficient) {
			this.drawChanges(changes);
		} else {
			this.drawState(state);
		}
	}

	drawState(state) {
		console.log(state.cols, state.rows);
		for (let y = 0; y < state.cols; y++) {
			for (let x = 0; x < state.rows; x++) {
				this.drawCell(x, y, state.cellAt(x, y));		
			}
		}
	}

	drawCell(x, y, type) {
		const color = this.settings.colors[type];
		const lineSize = this.settings.gridLineSize;
		const cellSize = this.settings.cellSize;

		const startX = lineSize + (cellSize + lineSize) * x;
		const startY = lineSize + (cellSize + lineSize) * y;

		this.ctx.fillStyle = color;
		this.ctx.fillRect(startX, startY, cellSize, cellSize);
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