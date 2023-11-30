const inputSlider =  document.querySelector("[data-lengthslider]");
const lengthDisplay =  document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const  copyBtn  = document.querySelector("[data-copy]");
const  copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateBtn");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let passwordLength = 10;
let checkCount = 0; 
handleSlider();

// set strength circle color to grey 


 
// set password length  
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // indicator.style.boxShadow = "10px 10px 10px color";

     //add shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
  return Math.floor(Math.random() * (max-min) + min);
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum = generateRandomNumber(0,symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;
    
    if(hasLower && hasLower && (hasNum || hasSym) && passwordLength >= 8){
        setIndicator("#00f0")
    }else if(
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLength >= 6
    ){
        setIndicator("#ff0");

    }else{
        setIndicator("#f00");
    }
}

async function copyContent(){
    try{
        navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Copied";
    }
    catch(e){
        copyMsg.innerText = "Failed"
    }
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

function shufflePassword(array) {
    for(let i  = array.length - 1 ; i > 0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        
    }
    let  str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) =>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    // special condition 
    if(passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
  });

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})
 
copyBtn.addEventListener('click',() =>{
    if(passwordDisplay.value){
        copyContent();
    }
})



generateBtn.addEventListener('click', () => {
    if(checkCount == 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // remove  old password 
    password = "";

    // put the stuff mentioned in the checkboxes 
    // if(uppercaseCheck.checked){
    //    password += generateUpperCase();     
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();     
    //  }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();     
    //  }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();     
    // }
     
    let funArr = [];

    if(uppercaseCheck.checked)
        funArr.push(generateUpperCase());
    
    if(lowercaseCheck.checked)
        funArr.push(generateLowerCase());
    
    if(numbersCheck.checked)
        funArr.push(generateRandomNumber());
    
    if(symbolsCheck.checked)
        funArr.push(generateSymbol());

    // compulsory addition  

    for(let i = 0 ; i <funArr.length;  i++){
        password += funArr[i];
    }

    // remaining addition 
    for(let i = 0 ; i < passwordLength - funArr.length ; i++){
        let randIndex = getRndInteger(0,funArr.length);
        password += funArr[randIndex];
    }

    // shuffle the password 
    password = shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value  = password;

    // calculate strength 
    calcStrength();


})