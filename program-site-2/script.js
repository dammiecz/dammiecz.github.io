let aside = document.getElementById('top-belka');

const scrollMenu = (ev) =>
{
//    console.log(ev);
//    if(ev.target.scrollingElement.scrollTop >= ev.target.scrollingElement.clientHeight-60)
//    {   
//        document.getElementById('top-belka').classList.add('scroll-aside');
//    }
//    else 
//    {
//        document.getElementById('top-belka').classList.remove('scroll-aside');
//    }
    //=================================================================================
    if(ev.target.scrollingElement.scrollTop >= 30)
    {
        document.querySelectorAll('li')[0].classList.add('scroll-nav-ul-li');        
        document.querySelectorAll('li')[0].style.top = '60px';           
    }
    else
    {
        document.querySelectorAll('li')[0].classList.remove('scroll-nav-ul-li');  
        document.querySelectorAll('li')[0].style.top = '30px';  
    }
    //=================================================================================
    if(ev.target.scrollingElement.scrollTop >= 95)
    {
        document.querySelectorAll('li')[1].classList.add('scroll-nav-ul-li'); 
        document.querySelectorAll('li')[1].style.left = '25vw'; 
        document.querySelectorAll('li')[1].style.top = '60px';
       
    }
    else
    {
        document.querySelectorAll('li')[1].classList.remove('scroll-nav-ul-li');
        document.querySelectorAll('li')[1].style.top = '60px';
        document.querySelectorAll('li')[1].style.left = 'auto'; 
    }
    //==================================================================================
    if(ev.target.scrollingElement.scrollTop >= 160)
    {
        document.querySelectorAll('li')[2].classList.add('scroll-nav-ul-li');
        document.querySelectorAll('li')[2].style.left = '50vw'; 
        document.querySelectorAll('li')[2].style.top = '60px';
    }
    else
    {
        document.querySelectorAll('li')[2].classList.remove('scroll-nav-ul-li');  
        document.querySelectorAll('li')[2].style.top = '90px';
        document.querySelectorAll('li')[2].style.left = 'auto'; 
    }
    //==================================================================================
    if(ev.target.scrollingElement.scrollTop >= 225)
    {
        document.querySelectorAll('li')[3].classList.add('scroll-nav-ul-li');
        document.querySelectorAll('li')[3].style.left = '75vw'; 
        document.querySelectorAll('li')[3].style.top = '60px';
    }
    else
    {
        document.querySelectorAll('li')[3].classList.remove('scroll-nav-ul-li');  
        document.querySelectorAll('li')[3].style.top = '120px';
        document.querySelectorAll('li')[3].style.left = 'auto'; 
    }
};
window.addEventListener('scroll',scrollMenu);


let kontakt = document.getElementById('kontakt-link');
let exit = document.getElementById('exit');

const form = () =>
{
    let formularz = document.getElementById('kontakt');
    
    formularz.style.height = '100vh';
};


const closeForm = () =>
{
    let formularz = document.getElementById('kontakt');
    
    formularz.style.height = '0';
};

kontakt.addEventListener('click',form);
exit.addEventListener('click',closeForm);