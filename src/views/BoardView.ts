import {
  CELL_BG,
  COIN_SVG,
  CURRENT_PLAYER_BG,
  DISABLE_BG,
  EASY,
  EASY_MATRIX_COLUMNS,
  EASY_MATRIX_ROWS,
  HARD_MATRIX_COLUMNS,
  HARD_MATRIX_ROWS,
  MAGNET_COIN,
  MEDIUM,
  MEDIUM_MATRIX_COLUMNS,
  MEDIUM_MATRIX_ROWS,
  NUMBER_OF_DEFAULT_USERS,
  PLAYER_SVG,
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
          if (coins[i][j] === MAGNET_COIN) {
            cell.innerHTML = `
            <div id=magnet>
            </div>`;
            gameBoard.appendChild(cell);
          } else {
            if (coins[i][j] === 0) {
              cell.style.backgroundColor = CELL_BG;
            }
            if (coins[i][j] === 0) {
              cell.innerHTML = '';
            } else {
              cell.innerHTML = this.modifyCoinSVG(coins[i][j]);
            }
            gameBoard.appendChild(cell);
          }
          const currentPlayer = player.find((player) => player.turn);
          for (let k = 0; k < player.length; k++) {
            if (player[k].position.x === i && player[k].position.y === j) {
              const svgEl = this.modifyColour(player[k]);
              cell.innerHTML = `
              <div class="player-icon">
                ${svgEl}
              </div>`;
              if (
                currentPlayer?.position.x === i &&
                currentPlayer.position.y === j
              ) {
                cell.style.backgroundColor = CURRENT_PLAYER_BG;
              } else {
                cell.style.backgroundColor = DISABLE_BG;
              }
              gameBoard.appendChild(cell);
            }
          }
        }
      }
    }
  }

  modifyColour(players: Player) {
    const svgString = PLAYER_SVG;
    return svgString.replace(/fill:#ff0000/g, `fill:${players.colour}`);
  }

  checkIfGameOver(player: Player[]) {
    const popup: HTMLElement | null = document.querySelector('.popup');
    let winnerId = -100;
    let maxScore = -100;
    for (let i = 0; i < player.length; i++) {
      if (player[i].score > maxScore) {
        maxScore = player[i].score;
        winnerId = player[i].id;
      }
    }
    const winner = document.querySelector('.winnerOfGame');
    if (winner) {
      winner.innerHTML = `${this.modifyColour(player[winnerId])}
           
          `;
    }
    const allScores = document.querySelector('.allScores');
    if (allScores) {
      allScores.innerHTML = '';
      for (let i = 0; i < player.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `${this.modifyColour(player[i])} ${player[i].score}`;
        allScores.append(li);
      }
    }
    popup?.classList.add('show-popup');
    const mainComponent = document.querySelector('main');
    if (mainComponent) {
      mainComponent.style.opacity = '50%';
    }
  }

  modifyCoinSVG(coinValue: number) {
    const coinSvg = COIN_SVG;
    return coinSvg.replace(
      '<text x="18" y="20" font-size="10" font-weight="bold" text-anchor="middle" fill="#3B2900">1</text>',
      `<text x="18" y="20" font-size="10" font-weight="bold" text-anchor="middle" fill="#3B2900">${coinValue}</text>`,
    );
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
