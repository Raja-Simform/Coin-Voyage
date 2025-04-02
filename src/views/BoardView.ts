import {
  EASY,
  EASY_MATRIX_COLUMNS,
  EASY_MATRIX_ROWS,
  HARD_MATRIX_COLUMNS,
  HARD_MATRIX_ROWS,
  MEDIUM,
  MEDIUM_MATRIX_COLUMNS,
  MEDIUM_MATRIX_ROWS,
  NUMBER_OF_DEFAULT_USERS,
} from '../constants/constants';
import { Board } from '../model/GameBoardModel';
import { Player } from '../model/player';

export class BoardView {
  public difficultySelection: HTMLElement;

  constructor() {
    this.difficultySelection = document.querySelector(
      '#difficulty-selection',
    ) as HTMLInputElement;
  }

  public difficulty: string = EASY;

  init() {
    if (this.difficultySelection) {
      this.difficultySelection.addEventListener(
        'change',
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
    if (target instanceof HTMLSelectElement) {
      const btnValue = target.value;
      if (btnValue) {
        this.difficulty = btnValue;
      }
    }
  }

  displayScore(player: Player[]) {
    const score = document.querySelector('.scores');
    if (score) {
      score.textContent = 'Scores:';
      for (let i = 0; i < player.length; i++) {
        const playerScore = document.createElement('li');
        playerScore.style.display = 'flex';
        const playerImageDiv = document.createElement('div');
        playerImageDiv.className = 'player-icon';
        playerImageDiv.id = `player${player[i].id}`;
        playerScore.append(playerImageDiv, `: ${player[i].score}`);
        score.append(playerScore);
      }
    }
  }

  displayTurn(players: Array<Player>) {
    const turn = document.querySelector('.turn');
    if (turn) {
      const player = players.find((player) => player.turn);
      turn.innerHTML = `
        Turn: <div id="player${player?.id}" class="player-icon"></div>
      `;
    }
  }

  totalPlayers(e: Event): number {
    const target = e.target;
    if (target instanceof HTMLSelectElement) {
      return Number(target.value);
    }
    return NUMBER_OF_DEFAULT_USERS;
  }

  displayController() {
    const controller: HTMLDivElement | null =
      document.querySelector('#controller');
    if (controller) {
      controller.style.display = 'flex';
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
              cell.innerHTML = `
              <div class="player-icon" id=player${player[k].id}>
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
    this.displayScore(player);
    this.displayTurn(player);
    this.displayController();
  }
}
