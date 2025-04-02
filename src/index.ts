import { PlayerController } from './controller/playerController';
import { BoardView } from './views/BoardView';

document.addEventListener('DOMContentLoaded', () => {
  const playerController = new PlayerController(new BoardView());
  const gameControlContainer = document.getElementById('controller');
  if (gameControlContainer) {
    gameControlContainer.addEventListener('click', (e: Event) => {
      playerController.handleController(e);
    });
    // gameControlContainer.addEventListener('keypress', (e: KeyboardEvent) => {
    //   playerController.handleControllerViaKeyboard(e);
    // });
  }
  const startBtn = document.getElementById('start');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      playerController.handleStart();
    });
  }
  const numberOfPlayers: HTMLSelectElement | null =
    document.querySelector('#players');
  if (numberOfPlayers) {
    numberOfPlayers.addEventListener('change', (e: Event) => {
      playerController.totalNoOfPlayers(e);
    });
  }
  const difficultySelection = document.querySelector(
    '.difficulty-selection',
  ) as HTMLInputElement;
  if (difficultySelection) {
    difficultySelection.addEventListener(
      'click',
      (e:Event)=>{playerController.selectGameDifficulty(e)}
    );
  }
});
