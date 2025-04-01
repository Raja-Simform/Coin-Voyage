import { PlayerController } from "./controller/playerController"
import { PlayerView } from "./view/playerView";

document.addEventListener("DOMContentLoaded",()=>{
    const playerController = new PlayerController(new PlayerView());
    const gameControlContainer = document.getElementById('controller');
    if(gameControlContainer){
        gameControlContainer.addEventListener("click",(e:Event)=>{
            playerController.handleController(e);
        })
    }
})