import State from './models/State';
import Canvas from './models/Canvas';
import settings from './models/Settings';
import GameOfLife from './models/GameOfLife';

const game = new GameOfLife(
	State.random(settings.cols, settings.rows, 0.25),
	settings,
	Canvas
);

game.render();

game.update();

setInterval(() => {
	game.update();
	game.render();
}, 100);
