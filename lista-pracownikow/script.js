const obliczWynagrodzeniePracownika = () =>
{    
    let liczbaPracownikow = document.getElementsByClassName('pracownik').length;
    let osoba = document.getElementsByClassName('pracownik');
    let calkowityCzasPracy = document.getElementsByClassName('czas');
    let stawkaZaGodzine = document.getElementsByClassName('stawka'); 
    let wyplata = document.getElementsByClassName('wyplata');
    
    let czasPracyString;
    let czasPracy;
    let podstawowyCzasPracy;
    let nadliczbowyCzasPracy;  
    let stawkaString;      
    let stawka; 
    
    let t;
    
    let najdluzszyCzasPracy = [];          
    for(let j=0; j<liczbaPracownikow; j++)
    {
        najdluzszyCzasPracy.push(
                {   osoba: osoba[j].textContent, 
                    czasPracy: Number(calkowityCzasPracy[j].value)
                }
        );
    }
    
    for(i=0; i < najdluzszyCzasPracy.length; i++)
    {
        for(j=0; j < najdluzszyCzasPracy.length; j++)
        {
            if(najdluzszyCzasPracy[j].czasPracy < najdluzszyCzasPracy[i].czasPracy)
            {
                t = najdluzszyCzasPracy[i];
                najdluzszyCzasPracy[i] = najdluzszyCzasPracy[j];
                najdluzszyCzasPracy[j] = t;
            }
        }
    }   
    
    let pracownik1 = document.createTextNode('Miejsce 1. ' + najdluzszyCzasPracy[0].osoba + ' | ');
    let pracownik2 = document.createTextNode('Miejsce 2. ' + najdluzszyCzasPracy[1].osoba + ' | ');
    let pracownik3 = document.createTextNode('Miejsce 3. ' + najdluzszyCzasPracy[2].osoba + ' | ');
    
    document.getElementById('najlepsi-pracownicy').appendChild(pracownik1);
    document.getElementById('najlepsi-pracownicy').appendChild(pracownik2);
    document.getElementById('najlepsi-pracownicy').appendChild(pracownik3);
    
    for(let i=0; i<liczbaPracownikow; i++)
    {
        czasPracyString = calkowityCzasPracy[i].value; 
        czasPracy = Number(czasPracyString);
        stawkaString = stawkaZaGodzine[i].value;
        stawka = Number(stawkaString);                 
        
        if (czasPracy > 160)
        {
            podstawowyCzasPracy = 160;
            nadliczbowyCzasPracy = czasPracy - podstawowyCzasPracy;
        }  
        else        
        {
            podstawowyCzasPracy = czasPracy;
            nadliczbowyCzasPracy = 0;
            if (czasPracy < 100)
                osoba[i].style.backgroundColor = 'red'; 
        }     
    
        let wynagrodzeniePracownika = podstawowyCzasPracy * stawka + nadliczbowyCzasPracy * 2 * stawka; 
    
        let wartoscWyplaty = document.createTextNode(wynagrodzeniePracownika);
        let wartoscTymczasowa = wyplata[i].childNodes[0];
                
        wyplata[i].replaceChild(wartoscWyplaty,wartoscTymczasowa);
    } 
        
    console.log(najdluzszyCzasPracy);
    
};

let button = document.getElementById('oblicz').addEventListener('click', obliczWynagrodzeniePracownika);


