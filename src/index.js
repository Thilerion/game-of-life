import State from './models/State';
import Canvas from './models/Canvas';
import settings from './models/Settings';
import GameOfLife from './models/GameOfLife';

const game = new GameOfLife(
	State.random(settings.cols, settings.rows, 0.2),
	settings,
	Canvas
);

game.init();


// setInterval(() => {
// 	game.update();
// 	game.render();
// }, 1000/10);

const nextGenBtn = document.getElementById('nextGenBtn');
nextGenBtn.addEventListener('click', () => {
	game.tick();
})

const toggleStateBtn = document.getElementById('toggleStateBtn');
toggleStateBtn.addEventListener('click', () => {
	if (game.autoPlay) {
		game.stop();
		toggleStateBtn.innerText = "Start";
	} else {
		game.start();
		toggleStateBtn.innerText = "Stop";
	}
})
