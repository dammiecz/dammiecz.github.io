var x = 0; // zmienna dla wymiary planszy, np. dla planszy 4x4 -> x=2
var xx;  //zmienna pól na planszy
var e, f;
var isetted = new Array; //tablica polosowanych i rozmieszczonych na planszy obrazków
var n;  //zmienna dla numeru obrazka
var nr; //zmienna dla numeru diva
var l; //licznik odsłoniętych kart          
var pair = new Array;  //pomocnicza tablica do zapisania 1. odkrytej karty
var score; //licznik punktów            
var turn;  //liczik tur 
var lock;  //flaga blokująca odsłanianie następnych kart
var div;            

function get() //ustawia zmienne początkowe gry i tworzy plaszę symnetrycznie na środku ekranu
{
    lock = false;  //zablokuj klikanie na karty
    x = document.getElementById('option').value;  //pobież wymiar planszy                  
    xx = x*x;
    document.getElementById('board').innerHTML = '';  

    var t = 0; //zmienna pomocnicza do rozmieszczenia divów na ekranie

    for(i=0; i<x; i++) // pętla tworząca divy (karty)
    {
        for(j=0; j<x; j++)
        {     
            $('#board').append('<div class="card" id=\"c' + t + '" > </div>');                         
            t++;                        
        }                    
        $('#board').append('<div style="clear:both"> </div>');  
    }                                   

    var w = $('#c1').outerWidth(true); //zmierz całkowitą szerokość diva karty
    var width = x*w; //ilość divów(kart) w jednym wierzu
    $('#board').css('width',width);  //ustaw całkowitą szerokość planszy

    for(j=0; j<xx; j++)  //pętla animacji pojawiania się kart na ekranie
    $('#c'+j).delay(j*100).fadeIn(100/(j+1));  

    score = 0; //ustaw punkty na 0
    turn = 0;  //ustaw tury na 0
    l = 0;  //usatw kliknięte karty na 0

    ///ustawienie liczników Punkty i Tura na 0 0///
    setTimeout(function(){
            $('#score').append('Punkty: 0');
            $('#turn').append('Tura: 0');
        },xx*100+100/(xx/2)+100);                    

    setTimeout(function(){lock=true;},xx*100+100/(xx/2)+300); //odblokowanie klikania na karty po czasie

    setImage(); 

    ///wywołanie kliknięcia///
    div = document.querySelector('#board');  
    div.addEventListener("click",revealCard); 
}  

function setImage() //losuje obrazki z puli obrazków w zależności od wielkości planszy
                     //losuje pozycje na plaszy dla pary
{
    var v, k, p;  //zmienna pomocnicza                                         
    var iset = new Array; //tablica dostępnych obrazków
    var iamount = new Array; //tablica wszystkich obrazków na planszy (2*iset)                

    e = xx/2; //zmienna pomocnicza ilości par
    f = 8; //ilość dostępnych różnych obrazków z których powstaną pary

    for(i=0; i<f; i++) //stwórz tablicę dostępnych obrazków
        iset[i] = i;                

    for(i=0; i<xx; i++) //stwórz tablicę wszystkich obrazków
        iamount[i] = i;

    i=0;  

    do
    {
        ///losowanie obrazka/////
        k = Math.floor((Math.random()*f)+1)-1; //losuje numer obrazka 
        v = iset[k]; //zmienna pomocnicza trzymająca w pamięci numer obrazka                   
        iset.splice(k,1);  //usuwa wylosowany obrazek z puli obrazków do losowania   
        f--; //dekrementacja puli obrazków


        ///losowanie pozycji na planszy gdzie ten obrazek umieścić///
        for(j=0; j<2; j++)
        {    
            p = Math.floor((Math.random()*xx)+1)-1; //losuje pozycję na planszy
            iamount.splice(p,1); //usuwa index wykorzystanej pozycji na planszy    
            xx--;
            isetted.splice(p,0,v); //dodaj wylosowaną pozycję i nr obrazka
        }                    
    }
    while(xx !== 0 );    
} 


function revealCard(event) //zawiera mechanizm gry (odsłąniania kart)
{
    var cur;   

    if(lock === true) //sprawdź czy można odsłonić kartę
                      //karty nie można odsłonić gdy są więcej niż dwie odkryte 
    {
        cur = event.currentTarget; 
        nr = event.target; 

        if(cur !== nr)  //sprawdź czy kliknięto w diva a nie gdzieś obok
        {                        
            lock = false;
            nr = event.target.id;  //numer diva, np. c2
            nr = nr.toString().slice(1); //zostaw tylko numer, np. 2   

            n = isetted[nr]; //przypisz numer obrazka z klikniętego diva

            var pic = "url(img/game_memory/pic"+n+".png)";                        

            $('#c'+nr).removeClass('card');    //odsłoń klikniętą kartę
            $('#c'+nr).addClass('cardA');
            $('#c'+nr).css('background-image', pic);  

            if(l<1)  //sprawdż czy można odsłonić kartę
            {                        
                pair[0] = n;  //numer obrazka
                pair[1] = nr; //numer diva
                l++;    
                setTimeout(function(){lock = true;},300);
            }
            else //jeśli odsłonięto dwie karty 
            {   
                if(pair[0] === n)  //jeśli para
                {                    
                    e--; //dekrementuj licznik pozostałych par do odsłonięcia
                    if(e !== 0) //jeśli to nie ostatnia para w grze
                    {
                        lock = false; //blokuj klikanie
                        score++;
                        turn++;
                        document.getElementById('turn').innerHTML = 'Tura ' + turn;  //dopisz turę
                        document.getElementById('score').innerHTML = 'Punkty ' + score;  //dopisz punkt                  

                        setTimeout(function(){
                            $('#c'+pair[1]).removeClass('cardA');   
                            $('#c'+pair[1]).addClass('cardD');
                            $('#c'+nr).removeClass('cardA');   
                            $('#c'+nr).addClass('cardD'); 
                        },1000);

                        setTimeout(function(){lock = true;},1600); //odblokuj klikanie
                    }
                    else //jeśli ostatnia para w grze
                    {
                        lock = false;
                        turn++;
                        score++;
                        setTimeout(function(){
                            $('#c'+pair[1]).removeClass('cardA');   
                            $('#c'+pair[1]).addClass('cardD');
                            $('#c'+nr).removeClass('cardA');   
                            $('#c'+nr).addClass('cardD'); 
                        },1000); 

                        setTimeout(function(){
                            document.getElementById('board').innerHTML ='';
                            document.getElementById('score').innerHTML ='';
                            document.getElementById('turn').innerHTML ='';                                            
                            if(x === 2)
                                document.getElementById('board').innerHTML = 'BRAWO!!!</br>' + x*x/2 + ' PARY</br>ODGADŁEŚ</br>W</br>' + turn + ' RUNDACH';
                            else
                                document.getElementById('board').innerHTML = 'BRAWO!!!</br>' + x*x/2 + ' PAR</br>ODGADŁEŚ</br>W</br>' + turn + ' RUNDACH';
                            $('#board').append('<br><button type=\'submit\' onclick=\'location.reload()\'<button>GRAJ JESZCZE RAZ</button>');
                        },1500);  
                    }
                }
                else //jeśli nie odsłonięto pary
                {                        
                    lock = false; //blokuj klikanie
                    pic = 'url(img/game_memory/reverse.png)';
                    setTimeout(function(){
                            $('#c'+pair[1]).css('background-image', pic);
                            $('#c'+pair[1]).removeClass('cardA');
                            $('#c'+pair[1]).addClass('card');
                            $('#c'+nr).css('background-image', pic);
                            $('#c'+nr).removeClass('cardA');
                            $('#c'+nr).addClass('card');
                    },1000); 

                    setTimeout(function(){
                            lock = true;
                            $('#c'+nr).css('pointer-events','auto');
                            $('#c'+pair[1]).css('pointer-events','auto');
                        },1600); //odblokuj klikanie

                    turn++;
                    document.getElementById('turn').innerHTML = 'Tura ' + turn;
                }
                l = 0; //ustaw licznik odkrytych kart na 0                           
            }
        }
    }                
}

