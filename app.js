

    
// const url = `${base_url}from=${fromcurr.value}&to=${tocurr}` ;



const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".To select");
let mesg=document.querySelector(".msg")
let msg = document.querySelector(".msg p")
let amount = document.querySelector("form input")
let input = document.querySelector("form input")
amount.style.placeHolder=fromcurr.value;
amount.style.placeHolder.color="black";
for (let select of dropdowns){
    for( let Currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = Currcode  ;
        newOption.value = Currcode;
        select.append(newOption);
        if(select.name === "from" && Currcode === "INR") {
            newOption.selected= "selected" ;
        }
        else if(select.name === "to" && Currcode ==="USD"){
            newOption.selected= "selected" ;
        }
    }
    select.addEventListener("change",(event)=>{

        updateflag(event.target)
     })
}

 input.addEventListener("click",(evnt)=>{
    input.innerText=" ";
 })

 function updateflag(element){
    
let Currcode = element.value;

let Countrycode = countryList[Currcode];
let newSrc = `https://flagsapi.com/${Countrycode}/flat/64.png`;
let img = element.parentElement.querySelector("img");
img.src = newSrc;
 }

 btn.addEventListener("click",async (evt)=>{
evt.preventDefault();

let amt = amount.value;
if(amt=="" || amt<=0){
    
    alert("Enter valid Amount");
    window.location.reload();
}

   console.log(fromcurr.value,tocurr.value);
   const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromcurr.value}&to=${tocurr.value}&amount=${amt}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '06fec6a1e0mshcbf9820764ee987p1c5970jsn5a2037827756',
		'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const res = await response.json();
    console.log(res);
	const data = res.result;
    if(fromcurr.value == tocurr.value){
       
        msg.innerText = amt +" "+ tocurr.value  ; 
        alert("both From and To are Same");

    }
    else{
    msg.innerText=  data +" "+ tocurr.value  ; 
    msg.style.backgroundColor ="rgba(5, 2, 38, 0.2)";
    }

} catch (error) {
	console.error(error);
}


 })





