// type Player = {
//     count: number,
//     posX: number,
//     posY: number
// }

export class Utility{

    private arrSize:number;
    private playerSize:number;
    private totalScore:number=0;

    constructor(arrSize:number,playerSize:number){
    this.arrSize=arrSize;
    this.playerSize=playerSize;
       
    const value1=this.generateGridCoin(arrSize);
    const value2=this.genrateRandom(playerSize,arrSize);
    const value3=this.clearPoaition(value2,value1);
    console.log({value3,value2,})//return to inshiya contoller
    console.log(this.totalScore);//to check when game is over exceeding total score;

           
    }
    clearPoaition(position:object[],grid:number[][]){
         for(let i=0;i<position.length;i++){
             this.totalScore-=grid[position[i].row][position[i].col];
             grid[position[i].row][position[i].col]=-1;
         }
         return grid;
    }
    genrateRandom(playerSize:number,arrSize:number){
        const arr:number[]=[];
        const position:object[]=[];
        let numx=0;
        let numy=0;
        while(playerSize){
            numx=Math.floor(Math.random()*(arrSize));
            numy=Math.floor(Math.random()*(arrSize));
            
            if(arr.indexOf(numx)!==-1 && arr.indexOf(numy)!==-1){
                continue;
            }
            const pos={
              row: numx,
              col: numy,
            }
            position.push(pos);
            arr.push(numx);
            arr.push(numy);
            playerSize--;
            
        }
        return position;
    }
    generateGridCoin(arrSize:number){
        const arr:number[][]=[]; 
        for (let a=0;a<arrSize;a++){
                arr[a]=[];
                
                for (let b=0;b<arrSize;b++){
                    const sum=Math.floor(Math.random()*10);
                    if(sum===0){
                        arr[a][b]=0;
                        // gameOver++;
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
    


    
   
    // addScore(arr:number[][], player: Player){
    //        player.count+=arr[player.posX][player.posY];
    //     //    if( arr[player.posX][player.posY]){
    //     //     gameover++;
    //     //    }
    //        arr[player.posX][player.posY]=0;
    //        return {arr,player};
    // }

}
// new Utility(4,2);