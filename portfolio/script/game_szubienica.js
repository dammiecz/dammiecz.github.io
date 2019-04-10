var haslo="";           
var haslo_invisible = "";
var missed = 0;
var bingo = 0;

function losuj()
{
    pula = new Array;        
    pula[0] = "bez pracy nie ma kołaczy";                
    pula[1] = "patrzeć jak wół na malowane wrota";                
    pula[2] = "kto pod kim dołki kopie ten sam w nie wpada";                
    pula[3] = "ala ma kota";                
    pula[4] = "nosił wilk razy kilka ponieśli i wilka";                  
    pula[5] = "baba śląska w barach szeroka w biodrach wąska";

    var nr = Math.floor(Math.random()*6);                                 
    haslo = pula[nr]; 

    ukryj(); 

    document.getElementById("tryb").innerHTML = 'Tryb gry: POJEDYŃCZY';
}

function wpisz()
{    
    var podaj_haslo = '<input id="pole" type="text" style="margin:5px" /> <input id="zatwierdz" type="submit" value="Zatwierdź hasło" onclick="get()" style="margin-bottom:5px"/>';

    document.getElementById("wpisz_haslo").innerHTML = podaj_haslo;                

    document.getElementById("tryb").innerHTML = 'Tryb gry: Z innym graczem';   
}        

function get()
{
    haslo = document.getElementById("pole").value;  

    document.getElementById("wpisz_haslo").innerHTML = ''; 
    document.getElementById("buttons").innerHTML = ''; 

    gra();
}

function ukryj()
{                
    document.getElementById("wpisz_haslo").innerHTML = ''; 
    document.getElementById("buttons").innerHTML = '';               

    gra();
}            

function gra()
{
    haslo = haslo.toUpperCase();                

    for(i=0; i<haslo.length; i++)
    {
        if(haslo.charAt(i)===" ")
        { haslo_invisible = haslo_invisible + " "; }
        else 
        { haslo_invisible = haslo_invisible + "-"; }    
    } 

    document.getElementById("wpisz_haslo").innerHTML = haslo_invisible;

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

    var litery = "";

    for(i=0; i<34; i++)
    {
        litery = litery + '<div class="litera" id="l'+i+'" onclick="check('+i+')">'+litera[i]+'</div>';
        if((i+1)%6 === 0)
        { litery = litery + '<div style="clear:both"><div>'; }
    }

    document.getElementById("alfabet").innerHTML = litery;

    document.getElementById("plansza").innerHTML = '<img src="img/game_szubienica/0.png" alt=""/>';   
}  

String.prototype.zamien = function(pozycja, znak)
{
  return this.substr(0, pozycja) + znak + this.substr(pozycja +1);  
};

function check(nr)
{                   
    var id = "l"+nr;
    var pass = false;

    for(i=0; i<haslo.length; i++)
    {
        if(haslo.charAt(i)===litera[nr])
        {   
            haslo_invisible = haslo_invisible.zamien(i,litera[nr]); 
            document.getElementById("wpisz_haslo").innerHTML = haslo_invisible;     
            pass = true;
            bingo++;  
        }
    }

    if(pass === true)
    {
        document.getElementById(id).style.background = "green"; 
        document.getElementById(id).style.cursor = "default";
        document.getElementById(id).setAttribute("onclick",";");                    
    }
    else
    {
        document.getElementById(id).style.background = "red";
        document.getElementById(id).style.cursor = "default";
        document.getElementById(id).setAttribute("onclick",";");
        missed++;
        document.getElementById("plansza").innerHTML = '<img src="img/game_szubienica/'+ missed +'.png" alt=""/>';
    }

    if(missed>=8)
    {   document.getElementById("wynik").innerHTML = "KONIEC GRY";
        document.getElementById("alfabet").innerHTML = "<span class=\"end\">PRZEGRAŁEŚ </br> POPRAWNE HASŁO: </br>" + haslo + "</span></br></br><span class=\"reset\" onclick=\"location.reload()\">START</span>";
    }
    if(bingo === haslo.replace(/ /g,"").length)
    {   document.getElementById("wynik").innerHTML = "KONIEC GRY";
        document.getElementById("alfabet").innerHTML = '<span class="end">WYGRAŁEŚ </br> POPRAWNE HASŁO!! </span></br></br><span class="reset" onclick="location.reload()">START</span>';
    }
}

