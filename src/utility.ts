import { Player, Position } from './model/player';
import { MAGNET_LEVELS, MAGNET_COIN } from './constants/constants';
type RowAndColumn = { row: number; column: number };
export class Utility {
  private totalScore: number = 0;

  clearPosition(position: Position[], grid: number[][]) {
    for (let i = 0; i < position.length; i++) {
      this.totalScore -= grid[position[i].x][position[i].y];
      grid[position[i].x][position[i].y] = -1;
    }
    return grid;
  }
  genrateRandom(playerSize: number, arrObj: RowAndColumn) {
    const arr: number[] = [];
    const position: Position[] = [];
    let numx = 0;
    let numy = 0;
    while (playerSize) {
      numx = Math.floor(Math.random() * arrObj.row);
      numy = Math.floor(Math.random() * arrObj.column);

      if (arr.indexOf(numx) !== -1 && arr.indexOf(numy) !== -1) {
        continue;
      }
      const pos = {
        x: numx,
        y: numy,
      };
      position.push(pos);
      arr.push(numx);
      arr.push(numy);
      playerSize--;
    }
    return position;
  }
  generateGridCoin(arrObj: RowAndColumn) {
    const arr: number[][] = [];
    for (let a = 0; a < arrObj.row; a++) {
      arr[a] = [];

      for (let b = 0; b < arrObj.column; b++) {
        const sum = Math.floor(Math.random() * 10);
        if (sum === 0) {
          arr[a][b] = 0;
        } else if (sum % 2 === 0) {
          arr[a][b] = 3;
          this.totalScore += 3;
        } else {
          arr[a][b] = 5;
          this.totalScore += 5;
        }
      }
    }
    return arr;
  }

  getcleargrid(arr: Array<number[]>) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === -1) {
          arr[i][j] = 0;
        }
      }
    }
    return arr;
  }

  getGridWithMagnetCoins(grid: Array<number[]>) {
    let count = 0;
    const ct1 = Math.floor(Math.random() * 3);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        const randomNumber = Math.floor(Math.random() * 10);
        if (randomNumber % 7 === 0 && count < 2) {
          if (grid[i][j] !== -1) {
            this.totalScore -= grid[i][j];
            grid[i][j] = MAGNET_COIN;
            count++;
          }
        }
        if (count === ct1) {
          break;
        }
      }
    }
    return grid;
  }
  addScore(arr: number[][], player: Player) {
    player.score += arr[player.position.x][player.position.y];
    this.totalScore -= arr[player.position.x][player.position.y];
    arr[player.position.x][player.position.y] = 0;
    if (this.totalScore === 0) {
      arr = [[]];
      return { arr, player };
    }
    return { arr, player };
  }
  checkposition(player: Player[], x: number, y: number) {
    for (let i = 0; i < player.length; i++) {
      if (player[i].position.x === x && player[i].position.y === y) {
        return false;
      }
    }
    return true;
  }

  addNeighbourCoinScore(
    arr: Array<number[]>,
    player: Player,
    rowAndColumn: RowAndColumn,
  ) {
    const directionRows = [-1, +1, 0, 0];
    const directionColumns = [0, 0, +1, -1];
    let noOfLevels = MAGNET_LEVELS;
    arr[player.position.x][player.position.y] = 0;
    while (noOfLevels) {
      for (let i = 0; i < 4; i++) {
        const neighbourRow = player.position.x + directionRows[i];
        const neighbourColumn = player.position.y + directionColumns[i];

        if (
          neighbourRow < 0 ||
          neighbourColumn < 0 ||
          arr[neighbourRow][neighbourColumn] === MAGNET_COIN
        ) {
          continue;
        }
        if (
          neighbourRow >= rowAndColumn.row ||
          neighbourColumn >= rowAndColumn.column
        ) {
          continue;
        }
        player.score += arr[neighbourRow][neighbourColumn];
        this.totalScore -= arr[neighbourRow][neighbourColumn];
        arr[neighbourRow][neighbourColumn] = 0;
        if (this.totalScore === 0) {
          arr = [[]];

          return { arr, player };
        }
      }
      noOfLevels -= 1;
    }

    return { arr, player };
  }
  generateRandomColour() {
    const r = Math.random() * 256;
    const g = Math.random() * 256;
    const b = Math.random() * 256;
    return `rgb(${r},${g},${b})`;
  }
}
