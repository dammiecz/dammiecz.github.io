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

const RegisterIn = () =>
{
    let height = 0.6*windowYsize;
    let regForm = document.getElementById("regForm");  
    let popUpBox = document.getElementById("popUpBox");  
        popUpBox.style.zIndex = 1;          
        popUpBox.style.height = height +"px";        
        popUpBox.style.transition = "height 1s ease"; 
        regForm.style.visibility = "visible";     
        regForm.style.visibility = "visible 1s 1s";      
}

const ClosePopUp = () =>
{
    let popUpBox = document.getElementById("popUp");       
        popUpBox.style.visibility = "hidden";
        popUpBox.style.zIndex = -1;  
}