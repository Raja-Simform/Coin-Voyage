import { Player, Position } from "./model/player";
type RowAndColumn={row:number,column:number};
export class Utility{
    private totalScore:number=0;

    clearPosition(position:Position[],grid:number[][]){
         for(let i=0;i<position.length;i++){
             this.totalScore-=grid[position[i].x][position[i].y];
             grid[position[i].x][position[i].y]=0;
         }
         return grid;
    }
    genrateRandom(playerSize:number,arrObj:RowAndColumn){
        const arr:number[]=[];
        const position:Position[]=[];
        let numx=0;
        let numy=0;
        while(playerSize){
            numx=Math.floor(Math.random()*(arrObj.row));
            numy=Math.floor(Math.random()*(arrObj.column));
            
            if(arr.indexOf(numx)!==-1 && arr.indexOf(numy)!==-1){
                continue;
            }
            const pos={
              x: numx,
              y: numy,
            }
            position.push(pos);
            arr.push(numx);
            arr.push(numy);
            playerSize--;
            
        }
        return position;
    }
    generateGridCoin(arrObj:RowAndColumn){
        const arr:number[][]=[]; 
        for (let a=0;a<arrObj.row;a++){
                arr[a]=[];
                
                for (let b=0;b<arrObj.column;b++){
                    const sum=Math.floor(Math.random()*10);
                    if(sum===0){
                        arr[a][b]=0;
                    }
                    else if(sum%2===0){
                        arr[a][b]=3;
                        this.totalScore+=3;
                    }
                    else{
                        arr[a][b]=5;
                        this.totalScore+=5;
                    }
                }
        }
        return arr;
    }
    
   
    addScore(arr:number[][],player:Player){
        player.score+=arr[player.position.x][player.position.y];
        this.totalScore-=arr[player.position.x][player.position.y];
        arr[player.position.x][player.position.y]=0;
        if(this.totalScore===0){
            console.log("game over");
        }
        return {arr,player};
    }
    checkposition(player:Player[],x:number,y:number){
         for(let i=0;i<player.length;i++){
            if(player[i].position.x===x && player[i].position.y===y){
               return false;
            }
         }
         return true;
    }

}