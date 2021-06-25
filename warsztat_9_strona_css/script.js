windowXsize = window.screen.width;
windowYsize = window.screen.height;  

let width = 0.4*windowXsize;
let height = 0.6*windowYsize;

let posX = (windowXsize/2) - 0.4*(windowXsize/2);
let posY = (windowYsize/2) - 0.6*(windowYsize/2);

let popUpBox = document.getElementById("popUp");  
    popUpBox.style.top = posY + "px";
    popUpBox.style.left = posX + "px";
    popUpBox.style.width = width + "px";

    console.log(windowXsize,windowYsize,width,height);    

const RegisterIn = () =>
{        
    let popUpBox = document.getElementById("popUp");  
        popUpBox.style.zIndex = 1;          
        popUpBox.style.height = 160 +"px";        
        popUpBox.style.display = "block"; 
}

const ClosePopUp = () =>
{
    let popUpBox = document.getElementById("popUp");       
        popUpBox.style.display = "none"; 
        popUpBox.style.zIndex = -1;  
}