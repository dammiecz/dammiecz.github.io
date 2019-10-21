//*************************************************************PRZEWIJANIE

let menuBtn = document.getElementsByTagName('li');

const smoothScrollEffect = (int,h) =>
    {       
        
    
        if(int < h+30)
        {
            setTimeout(()=> 
            {
                window.scrollTo(0,int);
                smoothScrollEffect(int + 30,h);
            },10);
        }
    }; 

const scrollDown1 = () =>
{
    let height = document.getElementById('galeria').offsetTop;
    if(window.innerWidth > 992)
    {
        height = height - 45;
    }    
    
    smoothScrollEffect(window.scrollY,height);
};

const scrollDown2 = () =>
{
    let height = document.getElementById('trenerzy').offsetTop;
    if(window.innerWidth > 992)
    {
        height = height - 45;
    }
    
    smoothScrollEffect(window.scrollY,height);
};

const scrollDown3 = () =>
{
    let height = document.getElementById('grafik').offsetTop;  
    if(window.innerWidth > 992)
    {
        height = height - 45;
    }
    
    smoothScrollEffect(window.scrollY,height);
};

const scrollDown4 = () =>
{
    let height = document.getElementById('cennik').offsetTop;  
    if(window.innerWidth > 992)
    {
        height = height - 55;
    }
    
    smoothScrollEffect(window.scrollY,height);
};

const scrollDown5 = () =>
{
    let height = document.getElementById('kontakt').offsetTop; 
    if(window.innerWidth > 992)
    {
        height = height - 45;
    }

    smoothScrollEffect(window.scrollY,height);
};

menuBtn[0].addEventListener('click',scrollDown1);
menuBtn[1].addEventListener('click',scrollDown2);
menuBtn[2].addEventListener('click',scrollDown3);
menuBtn[3].addEventListener('click',scrollDown4);
menuBtn[4].addEventListener('click',scrollDown5);

//*************************************************************GALAERIA

let galleryBtn = document.getElementById('galeria-info');
let nextPhotoBtn = document.getElementById('next-photo');
let prevPhotoBtn = document.getElementById('prev-photo');
let exitGalleryBtn = document.getElementById('exit-gallery');

let currentPhoto = document.getElementsByClassName('galeria-style');
let photoAmount = currentPhoto.length;
let initValue = 0;

const otworzGalerie = () =>
{    
    let aside = document.getElementsByTagName('aside');
    aside[0].style.display = 'flex';
    
    currentPhoto[initValue].style.display = 'flex';
};

const nastZdjecie = () =>
{
    initValue = initValue + 1;
    
    if(initValue > photoAmount - 1)
    {
        initValue = 0;
    }
    
    if(initValue === 0)
    {
        currentPhoto[photoAmount - 1].style.display = 'none';
        currentPhoto[initValue].style.display = 'flex';
    }
    else
    {
        currentPhoto[initValue-1].style.display = 'none';
        currentPhoto[initValue].style.display = 'flex';
    }
};

const poprzZdjecie = () =>
{
    initValue = initValue - 1;
    
    if(initValue < 0)
    {
        initValue = photoAmount - 1;
    }
    
    if(initValue === photoAmount - 1)
    {
        currentPhoto[photoAmount-photoAmount].style.display = 'none';
        currentPhoto[initValue].style.display = 'flex'; 
    }
    else
    {
        currentPhoto[initValue+1].style.display = 'none';
        currentPhoto[initValue].style.display = 'flex'; 
    }
};

const zamknijGalerie = () =>
{
    let aside = document.getElementsByTagName('aside');
    aside[0].style.display = 'none';
};

galleryBtn.addEventListener('click',otworzGalerie);
nextPhotoBtn.addEventListener('click',nastZdjecie);
prevPhotoBtn.addEventListener('click',poprzZdjecie);
exitGalleryBtn.addEventListener('click',zamknijGalerie);

//*************************************************************TRENERZY

let trainerBtn = document.getElementById('trener-info');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let exitBtn = document.getElementById('exit');

let currentCard = document.getElementsByClassName('trener-style');
let cardAmount = currentCard.length;
let initialValue = 0;

const otworzKarte = () =>
{    
    let aside = document.getElementsByTagName('aside');
    aside[1].style.display = 'flex';
    
    currentCard[initialValue].style.display = 'flex';
};

const nastKarta = () =>
{
    initialValue = initialValue + 1;
    
    if(initialValue > cardAmount - 1)
    {
        initialValue = 0;
    }
    
    if(initialValue === 0)
    {
        currentCard[cardAmount - 1].style.display = 'none';
        currentCard[initialValue].style.display = 'flex';
    }
    else
    {
        currentCard[initialValue-1].style.display = 'none';
        currentCard[initialValue].style.display = 'flex';
    }
};

const poprzKarta = () =>
{
    initialValue = initialValue - 1;
    
    if(initialValue < 0)
    {
        initialValue = cardAmount - 1;
    }
    
    if(initialValue === cardAmount - 1)
    {
        currentCard[cardAmount-cardAmount].style.display = 'none';
        currentCard[initialValue].style.display = 'flex'; 
    }
    else
    {
        currentCard[initialValue+1].style.display = 'none';
        currentCard[initialValue].style.display = 'flex'; 
    }
};

const zamknijKarte = () =>
{
    let aside = document.getElementsByTagName('aside');
    aside[1].style.display = 'none';
};

trainerBtn.addEventListener('click',otworzKarte);
nextBtn.addEventListener('click',nastKarta);
prevBtn.addEventListener('click',poprzKarta);
exitBtn.addEventListener('click',zamknijKarte);

//*************************************************************GRAFIK

let grafikBtn = document.getElementById('grafik-info');
let scrollInit = true;

const rozwinGrafik = () =>
{    
    let table = document.getElementsByTagName('table');
    
    if(scrollInit === true)
    {
        scrollInit = false;
        grafikBtn.innerHTML = 'zwiń';
        table[0].style.height = 'auto';
    }
    else
    {
        scrollInit = true;
        grafikBtn.innerHTML = 'rozwiń';
        table[0].style.height = '0';
    }
};

grafikBtn.addEventListener('click',rozwinGrafik);