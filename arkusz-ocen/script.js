const pobierzOceny = () =>
{
    let liczbaUczniow = document.getElementsByClassName('uczen').length-1;   
    let imieUcznia = document.querySelectorAll('div#arkusz-ocen div:nth-of-type(1n+3) span.uczen');
    let matematyka = document.querySelectorAll('input.matematyka');  
    let polski = document.querySelectorAll('input.polski');
    let biologia = document.querySelectorAll('input.biologia');
    let geografia = document.querySelectorAll('input.geografia');
    let fizyka = document.querySelectorAll('input.fizyka');
    let chemia = document.querySelectorAll('input.chemia');
    let informatyka = document.querySelectorAll('input.informatyka');   
    let zajeciaDodatkowe = document.querySelectorAll('input.zajecia-dodatkowe');   
    
    let ocenyUczniow = [];    
    let i;
    
    for(i=0; i<liczbaUczniow; i++)
    {
        ocenyUczniow.push(
                {
                    imie: imieUcznia[i].textContent,
                    matematyka: Number(matematyka[i].value),
                    polski: Number(polski[i].value),
                    biologia: Number(biologia[i].value),
                    geografia: Number(geografia[i].value),
                    fizyka: Number(fizyka[i].value),
                    chemia: Number(chemia[i].value),
                    informatyka: Number(informatyka[i].value),
                    zajeciaDodatkowe: zajeciaDodatkowe[i].value.toUpperCase()                    
                }
        );
    }  
    return ocenyUczniow;  
};

const obliczSrednia = (objektOcenyUczniow, indexUcznia) =>
{
    let iloscPrzedmiotow = Object.keys(objektOcenyUczniow).length - 2; 
    let i;
    let listaZajecDodatkowych = [];
    
    objektOcenyUczniow.zajeciaDodatkowe = objektOcenyUczniow.zajeciaDodatkowe.trim(); //usuwa wszystkie spacje z poczatku i z konca
    objektOcenyUczniow.zajeciaDodatkowe = objektOcenyUczniow.zajeciaDodatkowe.replace(/ /g, ""); //usuwa wszystkie spacje pomiedzy stringami
    
    if( objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'MAT' ||  //duze litery zastosowano po to zeby ochronic program gdy ktos wpisze z malej litery
        objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'POL' ||
        objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'GEO' ||
        objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'BIO' ||
        objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'FIZ' ||
        objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'CHE' ||
        objektOcenyUczniow.zajeciaDodatkowe.substring(0,3) === 'INF'    )
    {       
        listaZajecDodatkowych = objektOcenyUczniow.zajeciaDodatkowe.split(','); //dzieli wpisanego stringa w miejscu przecinka (,)
        
        for(i=0; i<listaZajecDodatkowych.length; i++)
        {
            if(listaZajecDodatkowych[i].substring(0,3) === 'MAT' && objektOcenyUczniow.matematyka<=5.5)
                objektOcenyUczniow.matematyka +=0.5;
            else if(listaZajecDodatkowych[i].substring(0,3) === 'POL' && objektOcenyUczniow.polski<=5.5)
                objektOcenyUczniow.polski +=0.5;            
            else if(listaZajecDodatkowych[i].substring(0,3) === 'BIO' && objektOcenyUczniow.biologia<=5.5)
                objektOcenyUczniow.biologia +=0.5;
            else if(listaZajecDodatkowych[i].substring(0,3) === 'GEO' && objektOcenyUczniow.geografia<=5.5)
                objektOcenyUczniow.geografia +=0.5;
            else if(listaZajecDodatkowych[i].substring(0,3) === 'FIZ' && objektOcenyUczniow.fizyka<=5.5)
                objektOcenyUczniow.fizyka +=0.5;
            else if(listaZajecDodatkowych[i].substring(0,3) === 'CHE' && objektOcenyUczniow.chemia<=5.5)
                objektOcenyUczniow.chemia +=0.5;
            else if(listaZajecDodatkowych[i].substring(0,3) === 'INF' && objektOcenyUczniow.informatyka<=5.5)
                objektOcenyUczniow.informatyka +=0.5;  
        }        
    }
    
    for(i=0; i<iloscPrzedmiotow; i++)
    {
        if( objektOcenyUczniow.matematyka   < 2 ||
            objektOcenyUczniow.polski       < 2 ||
            objektOcenyUczniow.biologia     < 2 ||
            objektOcenyUczniow.geografia    < 2 ||
            objektOcenyUczniow.fizyka       < 2 ||
            objektOcenyUczniow.chemia       < 2 ||
            objektOcenyUczniow.informatyka  < 2    )  
        {
            let uczenNiepromowany = document.querySelector('div#arkusz-ocen div:nth-of-type(1n+'+ indexUcznia + ') span.uczen');
            uczenNiepromowany.style.backgroundColor = 'red';
        }        
    }    
    
    let sumaOcen =  objektOcenyUczniow.matematyka +
                    objektOcenyUczniow.polski +
                    objektOcenyUczniow.biologia +
                    objektOcenyUczniow.geografia +
                    objektOcenyUczniow.fizyka +
                    objektOcenyUczniow.chemia +
                    objektOcenyUczniow.informatyka;  
  
    let sredniaOcen = sumaOcen / iloscPrzedmiotow;  
    sredniaOcen = Math.round(sredniaOcen*100)/100; //zaokraglenie do 2. miejsca po przecinku  
    
    if(sredniaOcen >= 4.75)
    {
        let uczenWzorowy = document.querySelector('div#arkusz-ocen div:nth-of-type(1n+'+ indexUcznia + ') span.uczen');
        uczenWzorowy.style.backgroundColor = 'green';
    }       
    
    return sredniaOcen;
};

const wypelnijArkuszOcen = () =>
{
    let oceny = pobierzOceny();;             
    let i;   
    let sredniaUcznia;
    let srednia;
    let poleArkuszaDlaSredniejUcznia = document.querySelectorAll('div#arkusz-ocen div:nth-of-type(1n+3) span.srednia');
    
    for(i=0; i<oceny.length; i++)
    {
        sredniaUcznia = obliczSrednia(oceny[i],(3+i));        
        oceny[i].srednia = sredniaUcznia;
        
        poleArkuszaDlaSredniejUcznia[i].textContent = '';
        srednia = document.createTextNode(oceny[i].srednia);
        poleArkuszaDlaSredniejUcznia[i].appendChild(srednia);
    }   
        
    console.log(oceny);     
};

let button = document.getElementById('oblicz').addEventListener('click', wypelnijArkuszOcen);

let scrollbarPolaFormularza = document.querySelectorAll('input [type="number"]');
for(let i=0; i<scrollbarPolaFormularza.length; i++)    
scrollbarPolaFormularza[i].addEventListener('mousewheel',(e)=>{this.blur();});
