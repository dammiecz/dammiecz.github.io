const obliczWynagrodzeniePracownika = () =>
{    
    let liczbaPracownikow = document.getElementsByClassName('pracownik').length;
    let osoba = document.getElementsByClassName('pracownik');
    let calkowityCzasPracy = document.getElementsByClassName('czas');
    let stawkaZaGodzine = document.getElementsByClassName('stawka'); 
    let wyplata = document.getElementsByClassName('wyplata');
    
    let najlepsi = document.getElementById('najlepsi-pracownicy');   
    najlepsi.innerHTML = '';
    
    let czasPracyString;
    let czasPracy;
    let podstawowyCzasPracy;
    let nadliczbowyCzasPracy;  
    let stawkaString;      
    let stawka; 
    
    let t;
    for(let i=0; i<liczbaPracownikow; i++)
    {
        if(osoba[i].style.backgroundColor === 'red')
        {
            osoba[i].style.backgroundColor = "white";
        }
    }
    
    let najdluzszyCzasPracy = [];          
    for(let j=0; j<liczbaPracownikow; j++)
    {
        najdluzszyCzasPracy.push(
                {   osoba: osoba[j].textContent, 
                    czasPracy: Number(calkowityCzasPracy[j].value)
                }
        );
    }
    
    for( i=0; i < najdluzszyCzasPracy.length; i++)
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
    
    najlepsi.appendChild(pracownik1);
    najlepsi.appendChild(pracownik2);
    najlepsi.appendChild(pracownik3);
    
    for(i=0; i<liczbaPracownikow; i++)
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
