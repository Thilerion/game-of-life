export default class GameOfLife {
	constructor(state, settings, Renderer) {
		this.state = state;
		this.settings = settings;

		const canvasEl = document.querySelector('canvas');
		this.renderer = new Renderer(canvasEl, settings);

		this.generation = 1;

		this.previousState = null;
	}

	update() {
		this.previousState = this.state;
		this.state = this.state.update();
		this.generation += 1;
	}

	render() {
		this.renderer.render({
			state: this.state,
			previousState: this.previousState,
			efficient: this.previousState != null && this.generation > 2
		});
	}
}