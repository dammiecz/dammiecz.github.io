//JavaScript code powered by Damian Miecznikowski
//Slider-static with switchable slides

var slideIndex = 0;  //ustaw pierwszy slajd na nr1 po zaladowaniu strony
var i;
var slidesNumber = document.getElementsByClassName('current-slide'); //pobierz elementy klasy 
var dotsNumber = document.getElementsByClassName('dot'); 

setSlides(slideIndex); //uruchom slider            

function currentSlide(nr)  //zmiana slajdu po kliknieciu na kropke
{
    slideIndex = nr;
    setSlides(slideIndex);
}

function nextSlide(nr)  //zmiana slajdu po kliknieciu na strzalke
{
    slideIndex += nr;
    setSlides(slideIndex);
}

function setSlides(nr)
{  
    if(nr > slidesNumber.length-1 ) {slideIndex = 0;} //sprawdz czy nastepny slajd jest poza zakresem
    if(nr < 0) {slideIndex = slidesNumber.length-1;}  //sprawdz czy poprzedni slad jest poza zakresem

    for(i=0; i<slidesNumber.length; i++) //petla ustawiajaca wszystkie slajdy na niewidoczne i kropki na nieaktywne
    {
        slidesNumber[i].style.display = 'none';
        //dotsNumber[i].style.background = '#91c0dd;';
    }
    
    
    slidesNumber[slideIndex].style.display = 'block'; //ustaw wybrany slajd
    //dotsNumber[slideIndex].className +=  'active';
    //dotsNumber[slideIndex].style.background = '#4d94ff';
//    nr = slideIndex;
//    nr++;
//    if(nr>slidesNumber.length-1)
//    nr=0;
//    setTimeout(setSlides(nr),1000);
}