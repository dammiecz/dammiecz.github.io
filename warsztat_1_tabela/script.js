const sredniaUcznia = () =>
{
    let i,j;
    let l = 0;
    let k;
    let srednia;
    let oceny = document.getElementsByTagName('input');    
    
    console.log(oceny);
    
    for(i=1; i<=15; i++)
    {    
        srednia = 0;
        
        for(j=1; j<=8; j++)
        {
            srednia = srednia + Number(oceny[l].value);
            l++;
        }  
        
        srednia = srednia / 8;
        
        k = 3+i;
        
        document.querySelector('table tr:nth-of-type('+k+') td:nth-of-type(11)').innerHTML = srednia.toFixed(2);
    }    
};




