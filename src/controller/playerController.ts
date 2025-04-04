import { CONTROLS, ERROR, ARROWCONTROLS } from '../constants/constants';
import { Player, Position } from '../model/player';
import { Utility } from '../utility';
import { BoardView } from '../views/BoardView';

type GridRowAndCol = { row: number; column: number };
export class PlayerController {
  view: BoardView;
  totalPlayers: number = 2;
  playerPosition!: Array<Position>;
  players: Array<Player> = [];
  currentGrid!: Array<number[]>;
  utility: Utility;
  rowAndCol!: GridRowAndCol;
  constructor(view: BoardView) {
    this.init();
    this.view = view;
    this.utility = new Utility();
  }
  init() {
    const startBtn = document.getElementById('start');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        this.handleStart();
      });
    }
    const goToMainMenu: HTMLButtonElement | null =
      document.querySelector('.main-restart');
    goToMainMenu?.addEventListener('click', this.showMainMenu);
    const restart: HTMLButtonElement | null =
      document.querySelector('#restart');
    restart?.addEventListener('click', () => {
      this.handleRestartGame();
    });
    const numberOfPlayers: HTMLSelectElement | null =
      document.querySelector('#players');
    if (numberOfPlayers) {
      numberOfPlayers.addEventListener('change', (e: Event) => {
        this.totalNoOfPlayers(e);
      });
    }
    const difficultySelection = document.querySelector(
      '.difficulty-selection',
    ) as HTMLInputElement;
    if (difficultySelection) {
      difficultySelection.addEventListener('click', (e: Event) => {
        this.selectGameDifficulty(e);
      });
    }
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      this.handleKeyControl(e);
    });
  }

  createPlayers(totalPlayers: number) {
    for (let i = 0; i < totalPlayers; i++) {
      this.players.push(
        new Player(
          i,
          this.playerPosition[i],
          0,
          i === 0,
          this.utility.generateRandomColour(),
        ),
      );
    }
  }
  handleStart() {
    this.rowAndCol = this.view.getArraySize();
    this.currentGrid = this.getGrid(this.rowAndCol);
    this.players = [];
    this.createPlayers(this.totalPlayers);
    this.currentGrid = this.utility.getcleargrid(this.currentGrid);
    this.view.displayGame(this.currentGrid, this.players);
    this.hideGameRequirements();
    this.toggleMainComponent();
  }

  hideGameRequirements() {
    const gameStartRequirements: HTMLDivElement | null = document.querySelector(
      '.start-game-requirements',
    );
    if (gameStartRequirements) {
      gameStartRequirements.style.display = 'none';
    }
  }

  toggleMainComponent() {
    const mainComponent: HTMLElement | null = document.querySelector('main');

    if (mainComponent) {
      if (mainComponent.style.display === 'none') {
        mainComponent.style.display = 'flex';
        mainComponent.style.opacity = '100%';
      } else if (mainComponent.style.display === 'flex')
        mainComponent.style.display = 'none';
    }
  }

  showMainMenu() {
    const gameStartRequirements: HTMLDivElement | null = document.querySelector(
      '.start-game-requirements',
    );
    const mainComponent: HTMLElement | null = document.querySelector('main');
    const popup: HTMLElement | null = document.querySelector('.popup');
    if (gameStartRequirements) {
      gameStartRequirements.style.display = 'flex';
      if (mainComponent) {
        mainComponent.style.opacity = '100%';
        mainComponent.style.display = 'none';
      }
      if (popup) popup?.classList.remove('show-popup');
    }
  }

  handleRestartGame() {
    const popup: HTMLElement | null = document.querySelector('.popup');
    if (popup) popup?.classList.remove('show-popup');
    const mainComponent = document.querySelector('main');
    if (mainComponent) {
      mainComponent.style.opacity = '100%';
      this.toggleMainComponent();
    }
    this.players = [];
    this.currentGrid = [];
    this.handleStart();
  }

  handleController(e: Event) {
    const currentPlayer = this.players.find((player) => player.turn);
    if (currentPlayer) {
      this.handleOperations(e, currentPlayer);
    }
  }

  handleOperations(e: Event, player: Player) {
    if (e.target instanceof HTMLElement) {
      const typeOfControl = e.target.closest('button')?.name;
      switch (typeOfControl) {
        case CONTROLS.UP:
          this.movePlayer(player, -1, 0, ERROR.UP);
          break;
        case CONTROLS.DOWN:
          this.movePlayer(player, 1, 0, ERROR.DOWN);
          break;
        case CONTROLS.LEFT:
          this.movePlayer(player, 0, -1, ERROR.LEFT);
          break;
        case CONTROLS.RIGHT:
          this.movePlayer(player, 0, 1, ERROR.RIGHT);
          break;
      }
    }
  }

  isOutOfGrid(cellIndex: number, playerIndex: number) {
    return cellIndex < 0 && playerIndex === 0;
  }

  movePlayer(player: Player, x: number, y: number, error: string) {
    let row = player.position.x + x;
    let col = player.position.y + y;

    if (this.isOutOfGrid(x, player.position.x)) {
      row = this.rowAndCol.row + x;
    } else if (this.isOutOfGrid(y, player.position.y)) {
      col = this.rowAndCol.column + y;
    } else {
      row = (player.position.x + x) % this.rowAndCol.row;
      col = (player.position.y + y) % this.rowAndCol.column;
    }
    if (!this.utility.checkposition(this.players, row, col)) {
      alert(error);
      return;
    }
    player.position.x = row;
    player.position.y = col;
    this.updateScoreAndGrid(this.currentGrid, player);
    this.view.displayGame(this.currentGrid, this.players);
  }

  getGrid(arrObj: GridRowAndCol) {
    const coinGrid = this.utility.generateGridCoin(arrObj);
    this.playerPosition = this.utility.genrateRandom(this.totalPlayers, arrObj);
    const grid2 = this.utility.clearPosition(this.playerPosition, coinGrid);
    return this.utility.getGridWithMagnetCoins(grid2);
  }
  handleTurn() {
    const currentIndex = this.players.findIndex((player) => player.turn);
    if (currentIndex !== -1) {
      this.players[currentIndex].turn = false;
      const nextIndex = (currentIndex + 1) % this.players.length;
      this.players[nextIndex].turn = true;
    }
  }
  updateScoreAndGrid(grid: Array<number[]>, player: Player) {
    let obj;
    if (grid[player.position.x][player.position.y] === 10) {
      obj = this.utility.addNeighbourCoinScore(grid, player, this.rowAndCol);
    } else {
      obj = this.utility.addScore(grid, player);
    }

    if (obj.arr[0]!.length === 0) {
      this.view.checkIfGameOver(this.players);
    } else {
      this.currentGrid = obj.arr;
      player = obj.player;
      this.handleTurn();
    }
  }
  totalNoOfPlayers(e: Event) {
    this.totalPlayers = this.view.totalPlayers(e);
  }
  selectGameDifficulty(e: Event) {
    this.view.selectGameDifficulty(e);
  }

  handleKeyControl(e: KeyboardEvent) {
    const currPlayer = this.players.find((player) => player.turn);
    if (!currPlayer) {
      return;
    }
    switch (e.key) {
      case ARROWCONTROLS.ArrowUp:
        this.movePlayer(currPlayer, -1, 0, ERROR.UP);
        break;
      case ARROWCONTROLS.ArrowDown:
        this.movePlayer(currPlayer, 1, 0, ERROR.DOWN);
        break;
      case ARROWCONTROLS.ArrowLeft:
        this.movePlayer(currPlayer, 0, -1, ERROR.LEFT);
        break;
      case ARROWCONTROLS.ArrowRight:
        this.movePlayer(currPlayer, 0, 1, ERROR.RIGHT);
        break;
    }
  }
}
