import { PlayerController } from './controller/playerController';
import { BoardView } from './views/BoardView';

document.addEventListener('DOMContentLoaded', () => {
  const playerController = new PlayerController(new BoardView());
  const gameControlContainer = document.getElementById('controller');
  if (gameControlContainer) {
    gameControlContainer.addEventListener('click', (e: Event) => {
      playerController.handleController(e);
    });
  }
});
