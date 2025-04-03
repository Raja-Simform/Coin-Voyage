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
        const svgEl = this.modifyColour(player[i])!;
        playerImageDiv.className = 'player-icon';
        playerImageDiv.innerHTML = svgEl;
        playerScore.append(playerImageDiv, `: ${player[i].score}`);
        score.append(playerScore);
      }
    }
  }

  displayTurn(players: Array<Player>) {
    const turn = document.querySelector('.turn');
    if (turn) {
      const player = players.find((player) => player.turn);
      if (player) {
        const svgEl = this.modifyColour(player)!;
        turn.innerHTML = `
          Turn: ${svgEl}
        `;
      }
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
          if (coins[i][j] === 10) {
            cell.innerHTML = `
            <div id=magnet>
            </div>`;
            gameBoard.appendChild(cell);
          } else {
            if (coins[i][j] === 0) {
              cell.style.backgroundColor = '#E9E9E9';
            }
            cell.textContent = coins[i][j].toString();
            gameBoard.appendChild(cell);
          }
          for (let k = 0; k < player.length; k++) {
            if (player[k].position.x === i && player[k].position.y === j) {
              const svgEl = this.modifyColour(player[k]);
              cell.innerHTML = `
              <div class="player-icon">
                ${svgEl}
              </div>`;
              cell.style.backgroundColor = '#ADD8E6';
              gameBoard.appendChild(cell);
            }
          }
        }
      }
    }
  }

  modifyColour(players: Player) {
    const svgString =
      '<svg height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60.671 60.671" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <ellipse style="fill:#ff0000;" cx="30.336" cy="12.097" rx="11.997" ry="12.097"></ellipse> <path style="fill:#ff0000;" d="M35.64,30.079H25.031c-7.021,0-12.714,5.739-12.714,12.821v17.771h36.037V42.9 C48.354,35.818,42.661,30.079,35.64,30.079z"></path> </g> </g> </g></svg>';
    return svgString.replace(/fill:#ff0000/g, `fill:${players.colour}`);
  }

  checkIfGameOver(player: Player[]) {
    const popup: HTMLElement | null = document.querySelector('.popup');
    let winnerId = -100;
    for (let i = 0; i < player.length; i++) {
      if (player[i].score > winnerId) {
        winnerId = player[i].id;
      }
    }
    const winner = document.querySelector('.winnerOfGame');
    if (winner) {
      winner.innerHTML = `
            <div id="player${winnerId}" class="player-icon"></div>
          `;
    }
    popup?.classList.add('show-popup');
  }

  checkIfRestart() {
    const popup: HTMLElement | null = document.querySelector('.popup');
    if (popup) popup?.classList.remove('show-popup');
  }

  displayGame(coins: number[][], player: Array<Player>) {
    this.createGameBoard(coins, player);
    this.displayScore(player);
    this.displayTurn(player);
    this.displayController();
  }
}
