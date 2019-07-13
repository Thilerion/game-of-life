export default class GameOfLife {
	constructor(state, settings, Renderer) {
		this.state = state;
		this.settings = settings;

		const canvasEl = document.querySelector('canvas');
		this.renderer = new Renderer(canvasEl, settings);

		this.generation = 1;

		this.previousState = null;

		this.initialised = false;
		this.autoPlay = false;
	}

	update() {
		this.previousState = this.state;
		this.state = this.state.update();
		this.generation += 1;
		return this;
	}

	render() {
		this.renderer.render({
			state: this.state,
			previousState: this.previousState,
			efficient: this.previousState != null && this.generation > 1
		});
		return this;
	}

	tick() {
		if (!this.initialised) {
			this.init();
		}
		this.update();
		this.render();

		if (this.autoPlay) {
			requestAnimationFrame(() => {
				if (this.autoPlay) {
					this.tick();
				}
			})
		}
	}

	init() {
		this.render();
		this.initialised = true;
		return this;
	}

	start() {
		this.autoPlay = true;
		this.tick();
	}

	stop() {
		this.autoPlay = false;
	}
}