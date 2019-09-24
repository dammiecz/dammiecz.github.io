const nav = document.getElementsByClassName('gt-name');
console.log(nav);

for(i=0; i<nav.length; i++)
{
    nav[i].addEventListener('mouseover', function(){
        this.firstElementChild.style.display = 'block';         
    });    
    nav[i].addEventListener('mouseout', function(){
        this.firstElementChild.style.display = 'none';
    });
}

const sup = document.getElementsByClassName('sup-list');

for(i=0; i<sup.length; i++)
{
    sup[i].addEventListener('click', function(){ 
        const supList = this.children ;         
        for(j=0; j<supList.length; j++)
        {
            document.getElementById('add-new-deviation').style.height = '100%';  
        }
    });        
}

function exitForm()
{
    document.getElementById('add-new-deviation').style.height = '0%';    
}

function submitDeviation()
{
    let formData = [document.getElementById('rfq-no').value,
                    document.getElementById('po-no').value,
                    document.getElementById('impacted-code').value,
                    document.getElementById('description').value];    
    return formData;   
}

function createDeviationToList()
{
    let row = document.getElementById('deviation-list-sup1');    
    row.appendChild('p');
}
