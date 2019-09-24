
function showOff(i)
{
   var content = document.getElementsByClassName('content'); 
   var section = document.getElementsByClassName('section'); 
   
   if(content[i].className === 'content')
   {
        content[i].classList.toggle('content-active');
        section[i].classList.toggle('section-active');
   }       
   else
   {
       content[i].classList.remove('content-active');
       section[i].classList.remove('section-active');
   }
}


    var nav = document.getElementsByClassName('navigator');
    var list = document.getElementsByClassName('list');
    var x =  list.length;  
    
    var i;
   
    for(i=0; i<x; i++)
    { nav[i].addEventListener('click',showTree(this)); }
    
function showTree()
{
    if(this.clasName === 'navigator')
        this.classList.toggle('list-active'); 
    else
    {
        this.classList.toggle('list'); 
        this.classList.toggle('navigator');
    }
}
