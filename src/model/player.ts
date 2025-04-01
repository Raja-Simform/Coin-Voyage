type Position = {
    x:number,
    y:number,
}
export class Player{
    id:number;
    position:Position;
    score:number;
    constructor(id:number,position:Position,score:number){
        this.id = id;
        this.position = position;
        this.score = score;
    }
}