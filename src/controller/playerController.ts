import { CONTROLS, ERROR } from '../constants/constants';
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
  }
  createPlayers(totalPlayers: number) {
    for (let i = 0; i < totalPlayers; i++) {
      this.players.push(new Player(i, this.playerPosition[i], 0, i === 0));
    }
  }
  handleStart() {
    this.rowAndCol = this.view.getArraySize();
    this.currentGrid = this.getGrid(this.rowAndCol);
    this.players = [];
    this.createPlayers(this.totalPlayers);
    this.currentGrid=this.utility.getcleargrid(this.currentGrid);
    this.view.displayGame(this.currentGrid, this.players);
    this.hideGameRequirements();
  }

  hideGameRequirements() {
    const gameStartRequirements: HTMLDivElement | null = document.querySelector(
      '.start-game-requirements',
    );
    if (gameStartRequirements) {
      gameStartRequirements.style.display = 'none';
    }
  }

  showMainMenu() {
    const gameStartRequirements: HTMLDivElement | null = document.querySelector(
      '.start-game-requirements',
    );
    if (gameStartRequirements) {
      gameStartRequirements.style.display = 'flex';
    }
  }

  handleRestartGame() {
    const popup: HTMLElement | null = document.querySelector('.popup');
    if (popup) popup?.classList.remove('show-popup');

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
        case CONTROLS.UP: {
          if (player.position.x === 0) {
            alert(ERROR.UP);
          } else {
            if (
              !this.utility.checkposition(
                this.players,
                player.position.x - 1,
                player.position.y,
              )
            ) {
              alert(ERROR.UP);
              break;
            }
            player.position.x -= 1;
            
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
        case CONTROLS.DOWN: {
          if (player.position.x === this.rowAndCol.row - 1) {
            alert(ERROR.DOWN);
          } else {
            if (
              !this.utility.checkposition(
                this.players,
                player.position.x + 1,
                player.position.y,
              )
            ) {
              alert(ERROR.DOWN);
              break;
            }
            player.position.x += 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
        case CONTROLS.LEFT: {
          if (player.position.y === 0) {
            alert(ERROR.LEFT);
          } else {
            if (
              !this.utility.checkposition(
                this.players,
                player.position.x,
                player.position.y - 1,
              )
            ) {
              alert(ERROR.LEFT);
              break;
            }
            player.position.y -= 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
        case CONTROLS.RIGHT: {
          if (player.position.y === this.rowAndCol.column - 1) {
            alert(ERROR.RIGHT);
          } else {
            if (
              !this.utility.checkposition(
                this.players,
                player.position.x,
                player.position.y + 1,
              )
            ) {
              alert(ERROR.RIGHT);
              break;
            }
            player.position.y += 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
      }
    }
  }
  getGrid(arrObj: GridRowAndCol) {
    const coinGrid = this.utility.generateGridCoin(arrObj);
    this.playerPosition = this.utility.genrateRandom(this.totalPlayers, arrObj);
    const grid2=this.utility.clearPosition(this.playerPosition, coinGrid);
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
    if(grid[player.position.x][player.position.y]===10){
      obj=this.utility.addNeighbourCoinScore(grid,player,this.rowAndCol);
    }
    else{
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
}
