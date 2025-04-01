import {
  EASY,
  EASY_MATRIX_COLUMNS,
  EASY_MATRIX_ROWS,
  HARD_MATRIX_COLUMNS,
  HARD_MATRIX_ROWS,
  MEDIUM,
  MEDIUM_MATRIX_COLUMNS,
  MEDIUM_MATRIX_ROWS,
} from '../constants';
import { Board } from '../models/GameBoardModel';
import { Player } from '../models/PlayerModel';

export class BoardView {
  public difficultySelection: HTMLElement;

  constructor() {
    this.difficultySelection = document.querySelector(
      '.difficulty-selection',
    ) as HTMLInputElement;
  }

  public difficulty: string = EASY;

  init() {
    if (this.difficultySelection) {
      this.difficultySelection.addEventListener(
        'click',
        this.selectGameDifficulty,
      );
    }
  }

  getArraySize(): Board {
    if (this.difficulty === EASY) {
      return {
        row: EASY_MATRIX_ROWS,
        column: EASY_MATRIX_COLUMNS,
      };
    } else if (this.difficulty === MEDIUM) {
      return {
        row: MEDIUM_MATRIX_ROWS,
        column: MEDIUM_MATRIX_COLUMNS,
      };
    } else {
      return {
        row: HARD_MATRIX_ROWS,
        column: HARD_MATRIX_COLUMNS,
      };
    }
  }

  selectGameDifficulty(e: Event) {
    const target = e.target;
    if (target instanceof HTMLElement) {
      const btnValue = target.closest('button')?.value;
      if (btnValue) {
        this.difficulty = btnValue;
      }
    }
  }

  displayScore() {
    const score = document.querySelector('.scores');
    if (score) score.textContent = 'Scores:';
  }

  displayTurn() {
    const turn = document.querySelector('.turn');
    if (turn) turn.textContent = 'Turn:';
  }

  totalPlayers() {
    const numberOfPlayers: HTMLSelectElement | null =
      document.querySelector('#players');
    if (numberOfPlayers) {
      numberOfPlayers.addEventListener('change', (e) => {
        const target = e.target;
        if (target instanceof HTMLSelectElement) {
          return target.value;
        }
      });
    }
  }

  createGameBoard(coins: number[][], player: Array<Player>) {
    const gameBoard: HTMLDivElement | null =
      document.querySelector('#game-board');
    if (gameBoard) {
      gameBoard.innerHTML = '';
      gameBoard.style.gridTemplateColumns = `repeat(${coins.length}, 40px)`;
      gameBoard.style.gridTemplateRows = `repeat(${coins[0].length}, 40px)`;
      for (let i = 0; i < coins.length; i++) {
        for (let j = 0; j < coins[i].length; j++) {
          const cell = document.createElement('div');
          cell.classList.add('grid-item');
          cell.textContent = coins[i][j].toString();
          gameBoard.appendChild(cell);
          for (let k = 0; k < player.length; k++) {
            if (player[k].position.x === i && player[k].position.y === j) {
              console.log('enter');
              cell.innerHTML = `
              <div class="player-icon">
              </div>`;
              gameBoard.appendChild(cell);
            }
          }
        }
      }
    }
  }

  displayGame(coins: number[][], player: Array<Player>) {
    this.createGameBoard(coins, player);
    this.displayScore();
    this.displayTurn();
  }
}
