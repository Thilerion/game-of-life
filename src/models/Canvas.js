export default class Canvas {
	constructor(el, width, height) {
		this.canvas = el;
		this.ctx = el.getContext("2d");

		this.width = width;
		this.height = height;
	}
}