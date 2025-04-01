import {
  EASY,
  EASY_MATRIX_COLUMNS,
  EASY_MATRIX_ROWS,
  HARD,
  HARD_MATRIX_COLUMNS,
  HARD_MATRIX_ROWS,
  MEDIUM,
  MEDIUM_MATRIX_COLUMNS,
  MEDIUM_MATRIX_ROWS,
} from '../constants';
import { Board } from '../models/GameBoardModel';

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
        if (this.difficulty === EASY) {
          this.displayGame(EASY_MATRIX_ROWS, EASY_MATRIX_COLUMNS);
        }
        if (this.difficulty === MEDIUM) {
          this.displayGame(MEDIUM_MATRIX_ROWS, MEDIUM_MATRIX_COLUMNS);
        }
        if (this.difficulty === HARD) {
          this.displayGame(HARD_MATRIX_ROWS, HARD_MATRIX_COLUMNS);
        }
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

  createGameBoard(rowSize: number, columnSize: number) {
    const gameBoard: HTMLDivElement | null =
      document.querySelector('#game-board');
    if (gameBoard) {
      gameBoard.innerHTML = '';

      gameBoard.style.gridTemplateColumns = `repeat(${columnSize}, 40px)`;
      gameBoard.style.gridTemplateRows = `repeat(${rowSize}, 40px)`;
      console.log(gameBoard.style.gridTemplateColumns);

      for (let i = 0; i < rowSize * columnSize; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-item');
        cell.textContent = (i + 1).toString();
        gameBoard.appendChild(cell);
      }
    }
  }

  displayGame(rowSize: number, columnSize: number) {
    this.createGameBoard(rowSize, columnSize);
    this.displayScore();
    this.displayTurn();
  }
}
