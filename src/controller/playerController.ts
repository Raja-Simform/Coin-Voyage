import { CONTROLS } from "../constants/constants";
import { Player } from "../model/player";
import { addScore } from "../utils";
import { PlayerView } from "../view/playerView";

export class PlayerController{
    view:PlayerView;
    currentPlayerNo: number = 1;
    totalPlayers: number = 2;
    player1:Player;
    player2:Player;
    currentGrid:Array<number[]>;
    constructor(view:PlayerView, totalPlayers:number){
        this.view = view;
        this.currentGrid = this.view.generateGrid();
        this.totalPlayers = totalPlayers;
        this.player1 = new Player(1, {x:0,y:0}, 0);
        this.player2 = new Player(2, {x:0, y:0}, 0);
    }
    handleController(e:Event){
        if(this.currentPlayerNo === 1){
            this.handleOperations(e,this.player1);
        }
        else if(this.currentPlayerNo === 2){
            this.handleOperations(e,this.player2);
        }
    }
    handleOperations(e:Event, player:Player){
        if(e.target instanceof HTMLButtonElement){
            const typeOfControl = e.target.name;
            switch(typeOfControl){
                case CONTROLS.UP:{
                    if(player.position.x === 0){
                        e.target.disabled = true;
                    }
                    else{
                        e.target.disabled = false;
                        player.position.x -= 1;
                        const obj = addScore(this.currentGrid,player);  
                        this.currentGrid = obj.arr;
                        player = obj.player;                    
                    }
                    break;
                }
                case CONTROLS.DOWN:{
                    if(player.position.x === 3){
                        e.target.disabled = true;
                    }
                    else{
                        e.target.disabled = false;
                        player.position.x += 1;    
                        const obj = addScore(this.currentGrid,player);  
                        this.currentGrid = obj.arr;
                        player = obj.player;                    
                    }
                    break;
                }
                case CONTROLS.LEFT:{
                    if(player.position.y === 0){
                        e.target.disabled = true;
                    }
                    else{
                        e.target.disabled = false;
                        player.position.y -= 1;   
                        const obj = addScore(this.currentGrid,player);  
                        this.currentGrid = obj.arr;
                        player = obj.player;                      
                    }
                    break;
                }
                case CONTROLS.RIGHT:{
                    if(player.position.y === 3){
                        e.target.disabled = true;
                    }
                    else{
                        e.target.disabled = false;
                        player.position.y += 1;
                        const obj = addScore(this.currentGrid,player);  
                        this.currentGrid = obj.arr;
                        player = obj.player; 
                    }
                    break;
                }
            }
        }
    }

}