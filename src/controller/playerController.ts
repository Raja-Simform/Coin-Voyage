import { CONTROLS } from '../constants/constants';
import { Player, Position } from '../model/player';
import { Utility } from '../utility';
import { BoardView } from '../views/BoardView';

export class PlayerController {
  view: BoardView;
  totalPlayers: number = 2;
  playerPosition!: Array<Position>;
  players: Array<Player> = [];
  currentGrid!: Array<number[]>;
  utility: Utility;
  rowAndCol!: { row: number; column: number };
  constructor(view: BoardView) {
    this.view = view;
    this.utility = new Utility();
  }

  createPlayers(totalPlayers: number) {
    for (let i = 0; i < totalPlayers; i++) {
      this.players.push(new Player(i, this.playerPosition[i], 0, i === 0));
    }
  }
  handleStart() {
    this.rowAndCol = this.view.getArraySize();
    this.currentGrid = this.getGrid(this.rowAndCol);
    this.createPlayers(this.totalPlayers);
    this.view.displayGame(this.currentGrid, this.players);
  }
  handleController(e: Event) {
    const currentPlayer = this.players.find((player) => player.turn)!;
    this.handleOperations(e, currentPlayer);
  }
  handleControllerViaKeyboard(e: KeyboardEvent) {
    this.players.forEach((player: Player) => {
      if (player.turn === true) {
        this.handleKeyOperations(e, player);
      }
    });
  }
  handleKeyOperations(e: KeyboardEvent, player: Player) {
    const key = e.key;
    switch (key) {
      case '37': {
        player.position.y -= 1;
        this.updateScoreAndGrid(this.currentGrid, player);
        this.view.displayGame(this.currentGrid, this.players);
        break;
      }
      case '38': {
        player.position.x -= 1;
        this.updateScoreAndGrid(this.currentGrid, player);
        this.view.displayGame(this.currentGrid, this.players);
        break;
      }
      case '39': {
        player.position.y += 1;
        this.updateScoreAndGrid(this.currentGrid, player);
        this.view.displayGame(this.currentGrid, this.players);
        break;
      }
      case '40': {
        player.position.x += 1;
        this.updateScoreAndGrid(this.currentGrid, player);
        this.view.displayGame(this.currentGrid, this.players);
        break;
      }
    }
  }
  handleOperations(e: Event, player: Player) {
    if (e.target instanceof HTMLButtonElement) {
      const typeOfControl = e.target.name;
      switch (typeOfControl) {
        case CONTROLS.UP: {
          if (player.position.x === 0) {
            e.target.disabled = true;
          } else {
            e.target.disabled = false;
            player.position.x -= 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
        case CONTROLS.DOWN: {
          if (player.position.x === this.rowAndCol.row - 1) {
            e.target.disabled = true;
          } else {
            e.target.disabled = false;
            player.position.x += 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
        case CONTROLS.LEFT: {
          if (player.position.y === 0) {
            e.target.disabled = true;
          } else {
            e.target.disabled = false;
            player.position.y -= 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
        case CONTROLS.RIGHT: {
          if (player.position.y === this.rowAndCol.column - 1) {
            e.target.disabled = true;
          } else {
            e.target.disabled = false;
            player.position.y += 1;
            this.updateScoreAndGrid(this.currentGrid, player);
            this.view.displayGame(this.currentGrid, this.players);
          }
          break;
        }
      }
    }
  }
  getGrid(arrObj: { row: number; column: number }) {
    const coinGrid = this.utility.generateGridCoin(arrObj);
    this.playerPosition = this.utility.genrateRandom(this.totalPlayers, arrObj);
    return this.utility.clearPosition(this.playerPosition, coinGrid);
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
    const obj = this.utility.addScore(grid, player);
    this.currentGrid = obj.arr;
    player = obj.player;
    this.handleTurn();
  }
  totalNoOfPlayers(e: Event) {
    this.totalPlayers = this.view.totalPlayers(e);
  }
  selectGameDifficulty(e: Event) {
    this.view.selectGameDifficulty(e);
  }
}
