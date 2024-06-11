let inputSlider = document.querySelector("[data-lengthSlider]");
let lengthDisplay = document.querySelector("[data-lengthNumber]");
let passwordDisplay = document.querySelector("[data-passwordDisplay]");
let copyBtn = document.querySelector("[data-copy]");
let copyMsg = document.querySelector("[data-copyMsg]");
let uppercaseCheck = document.querySelector("#uppercase")
let lowercaseCheck = document.querySelector("#lowercase");
let numbersCheck = document.querySelector("#numbers");
let symbolsCheck = document.querySelector("#symbols");
let indicator = document.querySelector("[data-indicator]");
let generateBtn = document.querySelector(".generateButton");
let allCheckBox = document.querySelectorAll("input[type=checkbox]");
let symbols = "!#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";


let password = "";
let passwordLength = 10;
let checkCount = 0;
// set circle colour to grey

handleSlider();


function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerHTML = passwordLength;
}

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // shadow
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
    return getRandomInteger(0, 9);
}

function generateRandomLowerCase() {
    return String.fromCharCode(getRandomInteger(97, 123));
}

function getRandomUpperCase() {
    return String.fromCharCode(getRandomInteger(65, 91));
}

function getRandomSymbol() {
    return symbols.charAt(getRandomInteger(0, symbols.length));
}

function calculateStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;
    if (uppercaseCheck.checked) {
        hasUpper = true;
    }
    if (lowercaseCheck.checked) {
        hasLower = true;
    }
    if (numbersCheck.checked) {
        hasNumber = true;
    }
    if (symbolsCheck.checked) {
        hasSymbol = true;
    }

    // if(hasUpper && hasLower && (hasNumber|| hasSymbol) && passwordLength>=8){
    //     indicator.style.backgroundColor="#0f0";
    // }else if((hasLower||hasUpper)&&(hasNumber||hasSymbol)&&passwordLength>=6){
    //     indicator.style.backgroundColor="#ff0";
    // }else{
    //     indicator.style.backgroundColor="#f00"
    // }
    if (checkCount == 0 || checkCount == 1) {
        indicator.style.backgroundColor = "#f00"
    } else if (checkCount == 2 && passwordLength < 10) {
        indicator.style.backgroundColor = "#ff0";
    } else {
        indicator.style.backgroundColor = "#0f0";
    }
}

function handleCheckBox() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    })
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}


allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBox);
})

async function copyContent() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        // alert("Copied");
        copyMsg.innerHTML = "Copied";

        setTimeout(() => {
            copyMsg.innerHTML = "";
        }, 1000)
    } catch (e) {
        copyMsg.innerHTML = "Failed";
    }

}

// inputSlider.addEventListener('input',(e)=>{
//     passwordLength=e.target.value;
//     lengthDisplay.innerHTML=passwordLength;
// })

function shufflePassword(arr) {
    //Fisher Yates Method
    for (let i = arr.length - 1; i > 0; i--) {
        let j = getRandomInteger(0, arr.length);
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    let str = "";
    arr.forEach(i => {
        str += i;
    });
    return str;

}


inputSlider.addEventListener('input', changeValue);

function changeValue(e) {
    passwordLength = e.target.value;
    handleSlider();
}

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copyContent();
    }
})


generateBtn.addEventListener('click', () => {
    if (checkCount == 0) {
        return;
    }

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    // console.log("starting new Journey");



    // finding new password now
    password = ""; //clear old password


    // now adding values as per check boxes

    // if(uppercaseCheck.checked){
    //     password+=getRandomUpperCase();

    // }
    // if(lowercaseCheck.checked){
    //     password+=generateRandomLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(SymbolCheck.checked){
    //     password+=getRandomSymbol();
    // }

    let funcArr = [];
    if (uppercaseCheck.checked) {
        funcArr.push(getRandomUpperCase);
    }
    if (lowercaseCheck.checked) {
        funcArr.push(generateRandomLowerCase);
    }
    if (symbolsCheck.checked) {
        funcArr.push(getRandomSymbol);
    }
    if (numbersCheck.checked) {
        funcArr.push(generateRandomNumber);
    }

    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }
    // console.log("compulsory addition done");

    for (let i = 0; i < passwordLength - funcArr.length; i++) {
        let ranIndex = getRandomInteger(0, funcArr.length);
        password += funcArr[ranIndex]();
    }
    // console.log("random addition done");

    //shuffling the password
    password = shufflePassword(Array.from(password));
    // console.log("shuffling done")

    passwordDisplay.value = password;
    passwordDisplay.style.color = "yellow"
        // console.log("UI addition done");
    calculateStrength();

})