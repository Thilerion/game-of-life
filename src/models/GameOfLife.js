export default class GameOfLife {
	constructor(state, settings, Renderer) {
		this.state = state;
		this.settings = settings;

		const canvasEl = document.querySelector('canvas');
		this.renderer = new Renderer(canvasEl, settings);

		this.generation = 1;

		this.changes = null;
		this.previousState = null;
	}

	update() {
		this.previousState = this.state;
		const { state, changes } = this.state.update();
		
		this.changes = changes;
		this.state = state;
		this.generation += 1;
	}

	render() {
		this.renderer.render({
			state: this.state,
			changes: this.changes,
			efficient: this.changes !== null && this.generation > 1
		});
	}
}