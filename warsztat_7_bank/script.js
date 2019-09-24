const p = document.getElementsByTagName('p');
const div = document.getElementById('dane');
let n; //ilość sloni
let m = []; //masa sloni
let ustP = []; //ustawienie początkowe
let ustK = []; //ustawienie końcowe
let ustS = []; //ustawienie sloni
let reader = new FileReader();

const dropHandler = (ev) =>
{
    let plik; //zmienna przechowująca strumień danych z pliku
    let daneZPliku; //zmienna typu string
    let dane = []; //tablica z wierszami wczytanymi z pliku (każdy wiersz to jeden string)
    
    ev.preventDefault(); // odblokowanie div-a z atrybutami zdarzen na przeniesienie pliku
    ev.stopPropagation();    
    
    plik = ev.dataTransfer.files;
//    console.log(plik);  sprawdzenie co zostalo pobrane po przeniesieniu pliku (tablica z plikami)
    
//    console.log(plik[0]); wyświetlenie 1. pozycji z tablicy
    
//    if(plik[0].type === 'text/plain') //sprawdzenie warunku czy przeniesiony pplik jest txt
//        console.log('prawda');      
    
     //utworzenie objektu FileReader, który pomoże w obsludze wczytanych danych
   
    reader.readAsText(plik[0]); //wywolanie metody zamiany wczytanych danych na text
    console.log(reader);
    reader.onload = function()  //wywolanie funkcji zapisującej dane do zmiennej
    {     
        daneZPliku = reader.result;
        div.style.opacity = '1';
        div.innerHTML = 'Dane wczytane'; 
        
        dane = daneZPliku.split('\n'); 
        n = Number(dane[0]);
        m = dane[1].split(' ').map(Number);
        ustP = dane[2].split(' ').map(Number);
        ustK = dane[3].split(' ').map(Number); 
        
        ustS[0] = ustP;
        ustS[1] = ustK;
        
        setTimeout(function()
        {
            render(ustS[0]);
            render(ustS[1]);
        },500);
        
        setTimeout(function()
        {
            let f = cykle(ustS,n);
            wynik(f,m,n);             
        },1000);
        
    }; 
    
    if(reader.readyState === 1)
    {
        div.innerHTML = 'Wczytuję dane...'; 
        ev.target.className = 'gotowy';
    };
};

const dragOverHandler = (ev) => //bez tej funcji przeglądarka nie będzie widziala div-a do którego możemy prznieść plik
{
    ev.preventDefault(); // odblokowanie div-a z atrybutami zdarzen na przeniesienie pliku
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = 'copy';
        
    ev.target.className = "gotowy";
    div.className = 'gotowy';
    div.innerHTML = 'Upuść plik...';
    
};

const dragLeave = (ev) =>
{
    div.innerHTML = 'Przeciągnij plik z danymi'; 
};

const cykle = (SE,N) =>
{    
    let a, b, k, l;
    let i = 0;
    let j = 0;
    let p = 0; 
    let r = 0;
        
    do
    {   
        l = SE[0][p];
        k = SE[1][i];

        if(l === k)
        { i++; p++; j++; }
        else
        {      
            j++;

            do
            {
                while(SE[0][j] !== k)
                {
                    j++;
                }

                a = SE[0][j];
                b = SE[1][j];

                SE[0][j] = SE[0][i+1];
                SE[1][j] = SE[1][i+1];

                SE[0][i+1] = a;
                SE[1][i+1] = b;                

                r = SE[1][i+1];

                i++;  
                j = i+1;
                k = SE[1][i];
            }
            while(r !== l);

            i++;
            p = i;

        }
    }        
    while(i !== N);
    console.log(SE);

    return SE;
};

const wynik = (C,M,n) =>
{
    let sum = n;
    let l = 0;
    let i, j ,s, max, e, k, min;
    let wiersz = 0;
    let kolumna = 1;
    let w = 0;

    let MIN = Math.min(...M);
//let MIN = 100;

    console.log("\nMinimalna masa w grupie: " + MIN);

    ///////////////////////////////////////////////////////////////////////
    /////////////OBLICZANIE WYMIARU TABLICY CYKLI PROSTYCH/////////////////
    ///////////////////////////////////////////////////////////////////////
    max = 0;
    k = -1;

    do
    {
        do
        {
            s = C[0][l];
            max = max + 1;
            sum = sum - 1;
            k++;
        }
        while(C[1][k] !== s);

        wiersz = wiersz + 1;
        l = k+1;

        if(max > kolumna)
            { kolumna = max; }

        max = 0;

    }
    while(sum !== 0); 
    console.log("\nWymiar tablicy cykli prostych");
    console.log(wiersz + " x " + kolumna );

    ///////////////////////////////////////////////////////////////////////
    /////////////UZUPENIANIE TABLICY CYKLI PROSTYCH///////////////////////
    ///////////////////////////////////////////////////////////////////////
    let Cp = new Array(wiersz);
    for(i=0; i<Cp.length; i++)
    {
        Cp[i] = new Array(kolumna+6);
    }    
    sum = n;

    loop:
    for(i=0; i<wiersz; i++)
    {
        for(j=0; j<1; j++)
        {
            if(C[1][i] === C[0][i])
            { Cp[i][j] = C[1][i]; sum = sum - 1; w++; }
            else
            { break loop; }
        }
    }

    if(sum !== 0)
    {
        j = i-1;
        l = i;
        k = i;

        do
        {
            e = 0;

            do
            {
                s = C[0][k];
                Cp[w][e] = C[0][l];
                e++;
                j++;
                l++;
            }
            while(C[1][j] !== s);

            k+=e;
            w++;
        }
        while(w !== wiersz);
    }   

    ///////////////////////////////////////////////////////////////////////
    //////////PRZYPISANIE MAS SONI W MIEJSCE NUMERU SONIA////////////////
    ///////////////////////////////////////////////////////////////////////
   for(i=0; i<wiersz; i++)
   {
       Cp[i][kolumna+2] = 0;

       for(j=0; j<kolumna; j++)
       {
           if(Cp[i][1] !== 0 && Cp[i][j] > 0)
           {
               Cp[i][j]=M[Cp[i][j]-1];
               Cp[i][kolumna+2] = Cp[i][kolumna+2]+1;
           }
           else
           { Cp[i][j]=0; break; }
       }
   }
  /////////////////////////////////////////////////////////////////////////
  //ZNAJDOWANIE MINIMALNEJ MASY, SUMY MAS ORAZ ILOCI SONI W CYKLU PROSTYM//
  /////////////////////////////////////////////////////////////////////////
    for(i=0; i<wiersz; i++)
    {
        Cp[i][kolumna] = 0;          // suma mas s?oini
        Cp[i][kolumna+1] = 6500;     // masa minimalna
        j=0;

        while(j !== Cp[i][kolumna+2])
        {
            if(Cp[i][1] === 0)
            {
                Cp[i][kolumna] = 0;
                Cp[i][kolumna+1] = 0;
                break;
            }
            else
            {
                Cp[i][kolumna] = Cp[i][kolumna] + Cp[i][j];

                if(Cp[i][j] < Cp[i][kolumna+1])
                {
                    Cp[i][kolumna+1] = Cp[i][j];
                }
            }
            j++;
        }
    }      

    ///////////////////////////////////////////////////////////////////////
    //////////////////////////OBLICZANIE WYNIKU////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    for(i=0; i<wiersz; i++)
    {
        if(Cp[i][1] !== 0)
        {
            Cp[i][kolumna+3] = Cp[i][kolumna]+(Cp[i][kolumna+2]-2)*Cp[i][kolumna+1];
            Cp[i][kolumna+4] = Cp[i][kolumna]+Cp[i][kolumna+1]+(Cp[i][kolumna+2]+1)*MIN;

            if(Cp[i][kolumna+3]<Cp[i][kolumna+4])
            { Cp[i][kolumna+5] = Cp[i][kolumna+3]; }
            else
            { Cp[i][kolumna+5] = Cp[i][kolumna+4]; }
        }
        else
        {
            Cp[i][kolumna+3] = 0;
            Cp[i][kolumna+4] = 0;
            Cp[i][kolumna+5] = 0;
        }
    }

    let wynik = 0;

    for(i=0; i<wiersz; i++)
    {
        wynik = wynik + Cp[i][kolumna+5];
    }
    
    console.log(Cp);
    console.log(wynik);
    
    showResult(wynik);
   
//    console.log("\nTablica wynikowa\n");
//    for(i=0; i<wiersz; i++)
//    {
//        for(j=0; j<kolumna+6; j++)
//        {
//            console.log(Cp[i][j]+" ");
//        }
//        console.log();
//    } 
};

const render = (ust) =>
{      
    let divWidth = (100/n);
    let divHeight = 0.8*divWidth;
    let divPaddingTop = 0.4*divHeight;
    let divPaddingLeft = 0.1*divWidth;
    let fontSize = 0.2*divWidth;
    
    for(let i=1; i<=n; i++)
    {
        let input = document.createElement('div');   
        let cashValue = document.createElement('p');
        let text = document.createTextNode(m[ust[i-1]-1]);
        cashValue.appendChild(text);
        input.appendChild(cashValue);
        let attribute = document.createAttribute('class'); 
        attribute.value = 'input-pic-style';
        input.setAttributeNode(attribute);
        input.style.width = divWidth + 'vw';
        input.style.height = divHeight + 'vw';
        input.style.paddingTop = divPaddingTop + '%';
        input.style.paddingLeft = divPaddingLeft + '%';
        input.style.fontSize = fontSize + 'vw';
        document.body.appendChild(input);
    }
};

const showResult = (textValue) =>
{
    let resultDiv = document.createElement('p'); 
    let text = document.createTextNode(textValue);
    resultDiv.appendChild(text);    
    let attribute = document.createAttribute('class'); 
    attribute.value = 'result-style';
    resultDiv.setAttributeNode(attribute);    
    document.body.appendChild(resultDiv);
};

//let number; //deklaracja zmiennej 'number'
//let text; //deklaracja zmiennej 'text'
//let czyOtwarte, czyZamkniete; //deklaracja zmiennej 'czyOtwarte' i 'czyZamkniete'

let number = 10; //przypisanie wartości '10' do zmiennej 'number'
const PI = 3.14; //przypisanie wartości '3.14' do stałej 'PI'

let text = 'stop'; //przypisanie wartości 'stop' do zmiennej 'text'
const zakaz = 'Nie wchodzić!'; //przypisanie wartości 'Nie wchodzić!' do stałej 'zakaz'

let czyOtwarte = true; //przypisanie wartości 'true' do zmiennej 'czyOtwarte'
let czyZamkniete = false; //przypisanie wartości 'false' do zmiennej 'czyZamkniete'

let tablicaPusta = []; //przypisanie pustej tablicy '[]' do zmiennej 'tablicaPusta'
let tablica = [1,2,3,-4,0,10]; //przypisanie tablicy z zawartością do zmiennej 'tablica'

let objektPusty = {}; //przypisanie pustego obiektu do zmiennej '{}' 'objektPusty'
//let objektDrzwi = {  
//                    wysokosc : 100,
//                    szerokosc : 200,
//                    kolor : 'czarny',
//                    czyLewostronne : true,
//                    wyswietlDane : function() 
//                                    {console.log('Drzwi drewniane firmy DRZWI');}  
//                  };
                  
//let objektDrzwi = {  
//  wysokosc : 100,
//  szerokosc : 200,
//  kolor : 'czarny',
//  czyLewostronne : 'TAK',
//  wyswietlDane : function() 
//                  {   console.log('Drzwi drewniane firmy DRZWI');
//                      console.log('Wys: ' + this.wysokosc,
//                                  'Szer: ' + this.szerokosc,
//                                  'Kolor: ' + this.kolor,
//                                  'Lew. str.: ' + this.czyLewostronne);
//                  }    
//};
                  
const t = [1,2,3,4];
//console.log(t);
//console.log(typeof t);
//
//t[2] = 30;
//console.log(t);
//console.log(typeof t);

//t = 'string';
//consolelog(t);
//console.log(typeof t);

let przelacznik;

przelacznik = 2;

//switch (przelacznik)
//{
//    case 0:  { console.log('Przełącznik ustawiony jest na 0'); break; }
//    case 1:  { console.log('Przełącznik ustawiony jest na 1'); break; }
//    case 2:  { console.log('Przełącznik ustawiony jest na 2'); break; }
//    case 3:  { console.log('Przełącznik ustawiony jest na 3'); break; }
//    default: { console.log('error!'); }
//};




