export type Position = {
  x: number;
  y: number;
};
export class Player {
  id: number;
  position: Position;
  score: number;
  turn: boolean;
  colour: string;
  constructor(
    id: number,
    position: Position,
    score: number,
    turn: boolean,
    colour: string,
  ) {
    this.id = id;
    this.position = position;
    this.score = score;
    this.turn = turn;
    this.colour = colour;
  }
}
