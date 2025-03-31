type Player = {
    count: number,
    posX: number,
    posY: number
}
export class Contoller{
    private arrSize:number;
    constructor(arrSize:number){
       this.arrSize=arrSize;
       const value=this.init(arrSize);
       console.log(value);
       const player:Player={
         count:5,
         posX: 1,
         posY:2
       }
       const temp=this.addScore(value,player);
       console.log(`the score is ${temp.player.count} & ${temp.player.posX} ${temp.player.posY}`)
           
    }
    init(arrSize:number){
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
   
    addScore(arr:number[][], player: Player){
           player.count+=arr[player.posX][player.posY];
           arr[player.posX][player.posY]=0;
           return {arr,player};
    }
    

}
