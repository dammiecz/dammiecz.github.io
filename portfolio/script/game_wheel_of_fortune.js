var sent = new Array;
sent[0] = "nosil wilk razy kilka ponieśli i wilka ";
sent[1] = "bez pracy nie ma kołaczy ";
sent[2] = "telefon komórkowy ";
sent[3] = "automatyczna pralka bębnowa ";
sent[4] = "dziwny jest ten świat ";
sent[5] = "cesarstwo rzymskie ";
sent[6] = "infiltracja ";
sent[7] = "cztery pory roku ";
sent[8] = "patrzeć jak wół na malowane wrota ";
sent[9] = "baba śląska w barkach szeroka w biodrach wąska ";            

    litera = new Array;
    litera[0] = "A";    litera[16] = "M";
    litera[1] = "Ą";    litera[17] = "N";
    litera[2] = "B";    litera[18] = "Ń";
    litera[3] = "C";    litera[19] = "O";
    litera[4] = "Ć";    litera[20] = "P";
    litera[5] = "D";    litera[21] = "R";
    litera[6] = "E";    litera[22] = "S";
    litera[7] = "Ę";    litera[23] = "Ś";
    litera[8] = "F";    litera[24] = "T";
    litera[9] = "G";    litera[25] = "U";
    litera[10] = "H";   litera[26] = "Ó";
    litera[11] = "I";   litera[27] = "W";
    litera[12] = "J";   litera[28] = "X";
    litera[13] = "K";   litera[29] = "Y";
    litera[14] = "L";   litera[30] = "Z";
    litera[15] = "Ł";   litera[31] = "Ż";  
    litera[32] = "Ź";   litera[33] = "Q";

    vowel = new Array;
    vowel[0] = "A";    
    vowel[1] = "Ą";  
    vowel[2] = "O"; 
    vowel[3] = "E";    
    vowel[4] = "Ę";
    vowel[5] = "U";
    vowel[6] = "Ó";
    vowel[7] = "I"; 
    vowel[8] = "Y";

    consonant = new Array;
    consonant[0] = "M";    consonant[13] = "N";                    
    consonant[1] = "B";    consonant[14] = "Ń";
    consonant[2] = "C";    consonant[15] = "Ć";    
    consonant[3] = "D";    consonant[16] = "R";
    consonant[4] = "S";    consonant[17] = "P";
    consonant[5] = "Ś";    consonant[18] = "Ź"; 
    consonant[6] = "F";    consonant[19] = "T";
    consonant[7] = "G";    consonant[20] = "X";
    consonant[8] = "H";    consonant[21] = "Z";
    consonant[9] = "W";    consonant[22] = "Ż"; 
    consonant[10] = "J";   consonant[23] = "Q";
    consonant[11] = "K";   consonant[24] = "Ł";  
    consonant[12] = "L";  

var used_letter =  new Array;                 

var ltot;       //całkowita długość hasła
var nr;
var gift_nr;    //nr pozycji na kole
var mis;        //licznik prób podania poprawnego hasła
var mis_letter; //licznik podania błednej liter 
var t = 0;      //wygrana   
var f = 0;      //licznik użytej litery             
var il = false; //blokada na podanie litery
var r = false;  //blokada na zakręcenie kołem
var start_wheel = false;    //blokada na koło przed wylosowaniem hasła
var start_letter = false;   //blokada na literę przed wylosowaniem hasła
var cs = true;              //blokada na podanie hasła

var gift = [100, 400, 1000, 0, "X", 1500, 10, 450, 100, 800, 300, "X2", 
            150, 2000, "X", 850, "X5", 250, -1000, 600, 1500, 350, 50, "X", 3000, 500, 100, "D2", 300, 600];                    
var k="";  
var letter;  
var counter = 0;    //licznik obrotów koła   
var l_counter;      //licznik odgadniętych liter
var l_count;        //licznik liter w haśle (bez odstępów)

function setLettersField() //ustaw hasło i wystartuj grę
{
    start_letter = true;
    start_wheel = true;

    nr = Math.floor((Math.random()*9)+1);   //losuj hasło
    ltot = sent[nr].length;                 //zmierz długość hasła
    sent[nr] = sent[nr].toUpperCase();      //zamień na duże litery                               

    setUsedLetterArray();
    mis_letter = 6;
    mis = 3;
    f = 0;    
    l_counter = 0;

    s = 0;  //licznik znalezionych odstępów 
    for(i=0; i<ltot; i++)
    {
        if(sent[nr].charAt(i) === " ")
        s++;
    }
    //alert(sent[nr]);
    l_count = ltot-s;

    $('#sentense').html('');  //wyczyść html id=sentense żeby póżniej dokleić ukryte litery

    d = 0;  //licznik divów               
    h = 23; //ilość dostępnych znaków w wierszu
    j = -1;

    if(s>0) //jeśli hasło conajmniej dwuwyrazowe
    {
        do
        { 
            i = -1;

            do
            { 
                j++;    //licznik znaków w całym haśle
                h--;    //licznik pozostałych miejsc w wierszu
                i++;    //licznik liter w mierzonym wyrazie                             
            } 
            while(sent[nr].charAt(j) !== " ")  
            h--;

            if(i<=h)
            {
                for(l=0; l<i; l++)   
                {
                    $('#sentense').append('<div class="letterHidden" id="lh'+d+'"> </div>');  //tworzy diva na literę
                    d++;
                }

                $('#sentense').append('<div class="spacing" id="lh'+d+'"> </div>');   //tworzy diva na odstęp
                d++;
                s--;
            }
            else
            {
                $('#sentense').append('<div style="clear:both;"></div>');  //tworzy diva na przejście do nowego wiersza 

                for(l=0; l<i; l++)   
                {
                    $('#sentense').append('<div class="letterHidden" id="lh'+d+'"> </div>');  //tworzy diva na literę
                    d++;
                }

                $('#sentense').append('<div class="spacing" id="lh'+d+'"> </div>');   //tworzy diva na odstęp                                                     

                d++;
                s--;
                h = 23;
            }
        }
        while(s!==0) 
    }
    else // jeśli hasło jednowyrazowe
    {
        for(i=0; i<ltot; i++)                    
          $('#sentense').append('<div class="letterHidden" id="lh'+i+'"> </div>');   //tworzy diva na literę gdy hasło jednowyrazowe 

       $('#sentense').append('<div style="clear:both;"></div>');  //tworzy diva na przejście do nowego wiersza
    }

    var correct = '<div style="clear:both;"></div><div id="correct"> <input id="corsens" type="text" /></br><input id="access" type="submit" value="PODAJ HASŁO" onclick="correctSentense()" /></div>';

    setTimeout(function() { $('#sentense').append(correct); },500); //opóźnienie pojawienia się pola do wpisania poprawnego hasłą

    il = true;  //odblokowanie możliwości podania litery              
}

function correctSentense() //sprawdź czy podano poprawne hasło
{
    if(cs === true)
    {
        var temporary = document.getElementById("corsens").value; //pobierz hasło z pola tekstowewgo
        temporary = temporary + " ";  //dodaj wolne miejsce na końcu linijki
        temporary = temporary.toString();
        temporary = temporary.toUpperCase();
        if(sent[nr] === temporary) 
        {                                          
            for(i=0; i<ltot; i++)
            {
                k = sent[nr].charAt(i);
                if(k !== " ")
                {
                    $('#lh'+i).removeClass('letterHidden');
                    $('#lh'+i).addClass('letterVisible');
                    $('#lh'+i).html(k); 
                }
            }

            $('#correct').html('POPRAWNE HASŁO! WYGRAŁEŚ! </br><div id="reload"><button type="button" onclick="setLettersField()">NASTĘPNA RUNDA</button></br><button type="button" onclick="sum()">ZAKOŃCZ</button></div> ');                         
            start_letter = false;
            start_wheel = false;
        }
        else
        { 
            mis--;
            popUp(1); 

            if(t>2000)
                { t = t-2000; setTimeout(function() { $('#cash').html(t); }, 2500 );}
            else
                { t = 0; setTimeout(function() { $('#cash').html(t); }, 2500 );}  

            if(mis === 0)
            {
                $('#correct').html('NIESTETY TO NIE TO HASŁO! POPRAWNE HASŁO BRZMI: '+sent[nr]+'</br><div id="reload"><button type="button" onclick="setLettersField()">NASTĘPNA RUNDA</button></br><button type="button" onclick="sum()">ZAKOŃCZ</button></div> ');  
                start_letter = false;
                start_wheel = false;
            }
        } 
    }
    else
    { popUp(8); }
}           

function runTheWheel() //kręć kołem
{
    var d;

    if(start_wheel === false)
        popUp(3);
    else
    {
        if(r === true)
        {
            cs = true; //odblokuj możliwość podania hasła
            gift_nr = Math.floor((Math.random()*29)+1); 
            rot = 12*(30+gift_nr);                                      
            counter +=360;
            d = rot + counter;
            $('#wheel').css("transform", "rotate("+ d +"deg)");    

            if( gift[gift_nr] !== gift[4] && gift[gift_nr] !== gift[11] && gift[gift_nr] !== gift[14] && 
                gift[gift_nr] !== gift[16] && gift[gift_nr] !== gift[23] && gift[gift_nr] !== gift[27] && gift[gift_nr] !== gift[18]  )
                { t = t + gift[gift_nr]; }
            else
            {
                if( gift[gift_nr] === gift[4] || gift[gift_nr] === gift[14] || gift[gift_nr] === gift[23] ) 
                    { t = 0; }    
                else
                {
                   if( gift[gift_nr] === gift[11])
                        {t = t*2; }
                   else
                   {
                        if(gift[gift_nr] === gift[16])
                            {t = t*5; }
                        else
                        {
                            if ( gift[gift_nr] === gift[18] && t === 0 )
                            { t = 0; }
                            else
                            {t = t/2; }
                        }
                    }                    
                }
            }

            setTimeout(function() { $('#cash').html(t); }, 2500 ); //  wyświetl wygraną po zatrzymaniu się koła

            r = false;
            il = true;

            if(l_count === l_counter)
            {
                $('#correct').html('NIE MA JUŻ WIĘCEJ LITER W HAŚLE! WYGRAŁEŚ!</br><div id="reload"><button type="button" onclick="setLettersField()">NASTĘPNA RUNDA</button></br><button type="button" onclick="sum()">ZAKOŃCZ</button></div> ');                         
                start_letter = false;  
                start_wheel = false; 
            }
        }
        else
        { popUp(6); } 
    }
} 

function get()  //pobierz literę i sprawdź czy występuje w haśle
{
    var index;                

    if(start_letter === false)
        popUp(7);
    else
    {

        if(il === true)                    {

            letter = $('#input_text').val(); 
            letter = letter.toString();
            letter = letter.toUpperCase();

            index = $.inArray(letter, litera); //sprawdź czy w tablicy "litera" istnieje znak "letter" (znajdź index jeśli istnieje)

            if(index !== -1) //sprawdź czy podany znak to litera i czy istnieje w alfabecie
            {         
                used_index = $.inArray(letter, used_letter); //-1 jeśli litera jeszcze nie użyta

                if($.inArray(letter, vowel) !== -1) //sprawdź czy samogłoska
                {                            
                    if(used_index === -1) //sprawdź czy została już użyta
                    {                                
                        if(checkLetter(letter)) //sprawdź czy występuje w haśle
                        {
                            cs = false; //zablokuj możliwość podania hasła
                            il = false;
                            r = true;
                            //vowel.splice($.inArray(letter, vowel),1);
                            revealLetter(letter);
                            $('#lt').append(letter + " "); 
                        }
                        else
                        {
                            mis_letter--;
                            if(mis_letter > 0)
                            {
                                popUp(0);
                                il = true;
                                r = false;
                                $('#lt').append(letter + " "); 

                                if(t>500)
                                    { t = t-500; setTimeout(function() { $('#cash').html(t); }, 2500 ); }
                                else
                                    { t = 0; setTimeout(function() { $('#cash').html(t); }, 2500 ); }
                            }
                            else
                            {
                                $('#correct').html('NIESTETY WYCZERPANO LIMIT PODAWANIA LITER!</br>POPRAWNE HASŁO BRZMI: '+sent[nr]+'</br><div id="reload"><button type="button" onclick="setLettersField()">NASTĘPNA RUNDA</button></br><button type="button" onclick="sum()">ZAKOŃCZ</button></div> ');                                             
                            }
                        }                          
                    }
                    else                            
                    { 
                        il = true;
                        r = false;            
                        popUp(4);
                    }
                }                       
                else //podano spółgłoskę                       
                {                        
                    if(used_index === -1)   //sprawdź czy litera została już użyta
                    {
                        if(checkLetter(letter)) //sprawdź czy występuje w haśle
                        {
                            cs = false; //zablokuj możliwość podania hasła
                            il = false;
                            r = true;
                            //vowel.splice($.inArray(letter, consonant),1);
                            revealLetter(letter);
                            $('#lt').append(letter + " "); 
                        }
                        else
                        {
                            mis_letter--;
                            if(mis_letter > 0)
                            {
                                popUp(0);
                                il = true;
                                r = false;
                                $('#lt').append(letter + " "); 

                                if(t>500)
                                    { t = t-500; setTimeout(function() { $('#cash').html(t); }, 2500 ); }
                                else
                                    { t = 0; setTimeout(function() { $('#cash').html(t); }, 2500 ); }
                            }
                            else
                            {
                                $('#correct').html('NIESTETY WYCZERPANO LIMIT PODAWANIA LITER!</br>POPRAWNE HASŁO BRZMI: '+sent[nr]+'</br><div id="reload"><button type="button" onclick="setLettersField()">NASTĘPNA RUNDA</button></br><button type="button" onclick="sum()">ZAKOŃCZ</button></div> ');
                            }                                   
                        }   
                    }
                    else
                    { 
                        il = true;
                        r = false;            
                        popUp(4);
                    }
                }
                used_letter.splice(f,0,letter);
                f++;                        
            }
            else
            {
                popUp(5);
                il = true;
                r = false; 
            }                       
        }                                 
        else                    
            { popUp(2); }  
    }
}

function sum() //zakończenie gry
{
   $('#container').html('WYGRAŁEŚ '+t);                
}

function revealLetter(k) //odsłonięcie odgadniętej litery
{
    for(i=0; i<ltot; i++)  //odsłonięcie odgadniętej litery
    {
        if(sent[nr].charAt(i)===k)
        {
            $('#lh'+i).removeClass('letterHidden');
            $('#lh'+i).addClass('letterVisible');
            $('#lh'+i).html(k); 
            l_counter++;
        }
    }   
}

function checkLetter(k) //sprawdzenie czy podana litera istnieje w haśle
{                
    for(i=0; i<ltot; i++)  //sprawdź czy litera jest w haśle 
    {                    
        if(sent[nr].charAt(i) === k)                    
            return true; 
    }   
}

function setUsedLetterArray()
{
    used_letter = [];
    $('#lt').html('');
}

function popUp(i) //wyskakujące komunikaty
{

    if(i===0)
    $('#popup').html('<span class="myPopup" id="popPosition0">Podanej litery nie ma w haśle!</br>Pozostała ilość szans: '+ mis_letter +'</span>');

    if(i===1)
    $('#popup').html('<span class="myPopup" id="popPosition1">Hasło niepoprawne!</br>Pozostała ilość szans: '+ mis +'</span>');

    if(i===2)
    $('#popup').html('<span class="myPopup" id="popPosition2">Zakręć kołem!</span>'); 

    if(i===3)
    $('#popup').html('<span class="myPopup" id="popPosition3">Wylosuj hasło!</span>');

    if(i===4)
    $('#popup').html('<span class="myPopup" id="popPosition4">Użyłeś już tej litery!</span>');

    if(i===5)
    $('#popup').html('<span class="myPopup" id="popPosition5">Nie ma takiej litery!</br>w polskim alfabecie!</span>');

    if(i===6)
    $('#popup').html('<span class="myPopup" id="popPosition6">Podaj literę!</span>');

    if(i===7)
    $('#popup').html('<span class="myPopup" id="popPosition7">Wylosuj hasło!</span>');

    if(i===8)
    $('#popup').html('<span class="myPopup" id="popPosition8">Nie można podać hasła!</br>Zakręć kołem!</span>');

}

