//JavaScript code powered by Damian Miecznikowski
//Slider-dynamic without possibility to change the slide

function setSlide(nr,i)
{                
    setTimeout(function() {
        document.getElementById('slide').setAttribute('src','img/' + nr + '.png');
    },3000*i);   
    nr++;
    if(nr>5)
        nr=0;
    i++;

    setTimeout(setSlide(nr,i),3000*i); 

}
