const inputSlider =  document.querySelector("[data-lengthslider]");
const lengthDisplay =  document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const  copyBtn  = document.querySelector("[data-copy]");
const  copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("data-indicator");
const generatedBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelector("input[type=checkbox");

let password = "";
let passwordLength = 10;
let checkCount = 1; 
handleSlider();

// set strength circle color to grey 


 
// set password length  
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = "30px 30px 30px color";
}

function getRndInteger(min,max){
   Math.floor.Math.random() * (max-min);
}