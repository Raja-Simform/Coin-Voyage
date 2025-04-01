import { Player } from "./model/player";

export function init(arrSize:number){
    const arr:number[][]=[]; 
    // const gameOver=0;
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
                }
                else{
                    arr[a][b]=5;
                }
            }
    }
    return arr;
}

export function addScore(arr:number[][], player: Player){
    player.score+=arr[player.position.x][player.position.y];
    arr[player.position.x][player.position.y]=0;
    return {arr,player};
}