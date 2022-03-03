let inputDataObject = {};
let incomeArr = [];
let outcomeArr = [];
let incomeTotal = 0;
let outcomeTotal = 0;

const uuidv4 = () => 
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
};

const getInputElement = (inputId) =>
{
    let elVal = document.getElementById(inputId).value;
    return elVal;
};

const createObject = (inputTagName,inputTagSum) =>
{
    let id = uuidv4();
    let name = getInputElement(inputTagName);
    let sum = Number(getInputElement(inputTagSum));    
    let newLineObject = {
        id: id,
        name: name,
        sum: sum
    }
    return newLineObject;
};

const updateIncomeOutcomeArr = (object,incomeOutcomeArr) =>
{    
    incomeOutcomeArr.push(object);
    return incomeOutcomeArr; 
};

const updateIncomeOutcomeTotal = (object,incomeOutcomeTotal) =>
{   
    incomeOutcomeTotal = incomeOutcomeTotal + object.sum;    
    return incomeOutcomeTotal;
};

const createNewLine = (object,ulTagId,) =>
{   
    let ul = document.getElementById(ulTagId);    
    let newLi = document.createElement("li");
    newLi.id = object.id;
    let liName = document.createTextNode(object.name);    
    let liSum = document.createTextNode(object.sum);  

    let newBtnEdit = document.createElement("button");
    newBtnEdit.innerHTML = "Edytuj";
    newBtnEdit.classList.add(object.id);
       
    let newBtnDelete = document.createElement("button");
    newBtnDelete.innerHTML = "Usuń";
    newBtnDelete.classList.add(object.id);  
  
    newLi.appendChild(liName);
    newLi.appendChild(liSum);
    newLi.appendChild(newBtnEdit);
    newLi.appendChild(newBtnDelete);

    ul.appendChild(newLi);    
};

const updateIncomeOutcomeDiv = (divId,incomeOutcomeTotal) =>
{
    document.getElementById(divId).innerHTML = incomeOutcomeTotal + "zł"
};

const updateCashLeftDiv = (divId,incomeSum, outcomeSum) =>
{
    let sum = incomeSum - outcomeSum;
    let divEl = document.getElementById(divId);
    
    if(sum >= 0)
        divEl.innerHTML = sum + " zł";
    else
    divEl.innerHTML = "Jesteś na minusie " + sum + " zł";
}

const deleteArrPos = (event,ulElement,incomeOutcomeArr,incomeOutcomeTotal) =>
{   
    console.log(incomeOutcomeTotal);
    let k = event.target.classList.value;    
    let i;
    let ul = document.getElementById(ulElement);  
    for(i=0; i<incomeOutcomeArr.length; i++)
    {        
        if(k == incomeOutcomeArr[i].id)
        {            
            let liToRemove = document.getElementById(incomeOutcomeArr[i].id);                  
            ul.removeChild(liToRemove);
            incomeOutcomeTotal = incomeOutcomeTotal - incomeOutcomeArr[i].sum;  
            incomeOutcomeArr.splice(i,1);   
            console.log(incomeOutcomeArr) ;
        };
    };   
    return incomeOutcomeTotal; 
};

const editLine = (event) =>
{
    let id = event.target.classList.value;  
    let liEl = document.getElementById(id);  
    liEl.removeChild(liEl.firstChild);
    liEl.removeChild(liEl.firstChild);
    liEl.removeChild(liEl.firstChild);
    
    let tempInputName = document.createElement("input");
    tempInputName.classList.add(id);
    tempInputName.classList.add("inputClass"); 
    tempInputName.setAttribute("type","text"); 
    tempInputName.id = "newInputName";
    
    let tempInputSum = document.createElement("input");
    tempInputSum.classList.add(id);
    tempInputSum.classList.add("inputClass");
    tempInputSum.setAttribute("type","number");
    tempInputSum.id = "newInputSum";

    let tempBtnSaveChange = document.createElement("button");
    tempBtnSaveChange.classList.add(id);
    tempBtnSaveChange.classList.add("submitBtnClass");
    tempBtnSaveChange.id = "saveChangeBtn";
    tempBtnSaveChange.innerHTML = "OK"

    liEl.appendChild(tempInputName);
    liEl.appendChild(tempInputSum);
    liEl.appendChild(tempBtnSaveChange);
};

const replaceLineInIncomeOutcomeArr = (j,object,incomeOutcomeArr) =>
{  
    incomeOutcomeArr.splice(j,1,object);
    return incomeOutcomeArr;
};

const updateLineView = (liOldId,object) =>
{
    let liEl = document.getElementById(liOldId);
    liEl.innerHTML = '';
    liEl.id = object.id;
    let liName = document.createTextNode(object.name);    
    let liSum = document.createTextNode(object.sum);  

    let newBtnEdit = document.createElement("button");
    newBtnEdit.innerHTML = "Edytuj";
    newBtnEdit.classList.add(object.id);
       
    let newBtnDelete = document.createElement("button");
    newBtnDelete.innerHTML = "Usuń";
    newBtnDelete.classList.add(object.id);  
  
    liEl.appendChild(liName);
    liEl.appendChild(liSum);
    liEl.appendChild(newBtnEdit);
    liEl.appendChild(newBtnDelete);        
};

let addBtns = document.getElementsByClassName("submitBtnClass");

//BUTTON PRZYCHODÓW
addBtns[0].addEventListener("click",() => {    
    inputDataObject = createObject("nameIncomeInp","sumIncomeInp"); //pobranie danych id,name,sum do objektu
    incomeArr = updateIncomeOutcomeArr(inputDataObject,incomeArr);  //dodanie obiektu do tablicy incomeArr
    incomeTotal = updateIncomeOutcomeTotal(inputDataObject,incomeTotal);  //aktualizacja incomeTotal
    createNewLine(inputDataObject,"incomeUl"); //update widoku 
    updateIncomeOutcomeDiv("incomeSum",incomeTotal);
    
    //BUTTON rozpoczęcia edycji
    document.getElementsByClassName(inputDataObject.id)[0].addEventListener("click",(e) => {
            editLine(e); 
            let id = e.target.classList.value;
            let j=0;
            while(incomeArr[j].id !== id)
            {
                j++;
            }
                             
        //BUTTON zatwierdzenia edycji
        document.getElementById("saveChangeBtn").addEventListener("click",() => {
            inputDataObject = createObject("newInputName","newInputSum"); //pobranie danych id,name,sum do objektu            
            incomeArr = replaceLineInIncomeOutcomeArr(j,inputDataObject,incomeArr);           
            incomeTotal = updateIncomeOutcomeTotal(inputDataObject,incomeTotal);  //aktualizacja incomeTotal
            updateLineView(id,inputDataObject); //update widoku 
            updateIncomeOutcomeDiv("incomeSum",incomeTotal);
            updateCashLeftDiv("cashLeft",incomeTotal,outcomeTotal);
        }); 
    });

    //BUTTON usuwania
    document.getElementsByClassName(inputDataObject.id)[1].addEventListener("click", (e) => {
        incomeTotal = deleteArrPos(e,"incomeUl",incomeArr,incomeTotal); 
        updateIncomeOutcomeDiv("incomeSum",incomeTotal);
        updateCashLeftDiv("cashLeft",incomeTotal,outcomeTotal);}); //usuwanie linii i update incomeTotal
        updateCashLeftDiv("cashLeft",incomeTotal,outcomeTotal);
});

//BUTTON WYDATKÓW
addBtns[1].addEventListener("click",() => {
    inputDataObject = createObject("nameOutcomeInp","sumOutcomeInp"); //pobranie danych id,name,sum do objektu
    outcomeArr = updateIncomeOutcomeArr(inputDataObject,outcomeArr);  //dodanie obiektu do tablicy incomeArr
    outcomeTotal = updateIncomeOutcomeTotal(inputDataObject,outcomeTotal);  //aktualizacja incomeTotal
    createNewLine(inputDataObject,"outcomeUl"); //update widoku 
    updateIncomeOutcomeDiv("outcomeSum",outcomeTotal);
    
    document.getElementsByClassName(inputDataObject.id)[0].addEventListener("click",(e) => {
        editLine(e); 
        let id = e.target.classList.value;
        let j=0;
        while(outcomeArr[j].id !== id)
        {
            j++;
        }
                         
    //BUTTON zatwierdzenia edycji
    document.getElementById("saveChangeBtn").addEventListener("click",() => {
        inputDataObject = createObject("newInputName","newInputSum"); //pobranie danych id,name,sum do objektu        
        outcomeArr = replaceLineInIncomeOutcomeArr(j,inputDataObject,outcomeArr);        
        outcomeTotal = updateIncomeOutcomeTotal(inputDataObject,outcomeTotal);  //aktualizacja incomeTotal
        updateLineView(id,inputDataObject); //update widoku 
        updateIncomeOutcomeDiv("outcomeSum",outcomeTotal);
        updateCashLeftDiv("cashLeft",incomeTotal,outcomeTotal);
    }); 
});
    //BUTTON usuwania
    document.getElementsByClassName(inputDataObject.id)[1].addEventListener("click", (e) => {
        outcomeTotal = deleteArrPos(e,"outcomeUl",outcomeArr,outcomeTotal); 
        updateIncomeOutcomeDiv("outcomeSum",outcomeTotal);
        updateCashLeftDiv("cashLeft",incomeTotal,outcomeTotal);}); 
        updateCashLeftDiv("cashLeft",incomeTotal,outcomeTotal);
});