export class Contoller{
    private arrSize:number;
    constructor(arrSize:number){
       this.arrSize=arrSize;
       console.log(this.init(arrSize));
     }
     init(arrSize:number):number[][]{
        const arr:number[][]=[]; 
        for (let a=0;a<arrSize;a++){
                arr[a]=[];
                for (let b=0;b<arrSize;b++){
                    const sum=Math.floor(Math.random()*10);
                    if(sum===0){
                        arr[a][b]=0;
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
}
