class colorEl { //to create objects of color elements in the "color-palette" el, by following DRY approach. 
    constructor(el, hexCode) {
        this.el = el;
        this.hexCode = (hexCode == undefined ? el.querySelector(".hex-code").innerText : hexCode);
    }
}

//Selecting HTML DOM Elements:
const genBtnEl = document.querySelector("#generateBtn");
const colorPaletteEl = document.querySelector(".color-palette");
const colorElsArr = [new colorEl(colorPaletteEl.querySelector("#color1")), 
                     new colorEl(colorPaletteEl.querySelector("#color2")), 
                     new colorEl(colorPaletteEl.querySelector("#color3")),
                     new colorEl(colorPaletteEl.querySelector("#color4"))];

// Function to Convert a Decimal number to a Hexadecimal:
const decimalToHexadecimal = (decimalNum) => {
    //corner case
    const hexDigits = "0123456789ABCDEF";
    if(decimalNum >= 0 && decimalNum <= 15) {
        return '0' + hexDigits[decimalNum];
    }

    let hexNum = ""; //stores the final hexadecimal code/number
    while (decimalNum > 0) {
        let remainder = decimalNum % 16;
        hexNum += hexDigits[remainder];
        decimalNum = parseInt(decimalNum / 16);
    }

    return hexNum.split('').reverse().join(''); //to reverse the string
}

// Function to Convert RGB Color Code to Hex Color Code:
const rgbToHexCode = (rgbColorArr) => {
    return "#" + decimalToHexadecimal(rgbColorArr[0]) + decimalToHexadecimal(rgbColorArr[1]) + decimalToHexadecimal(rgbColorArr[2]);
}

// Function to Generate a Random Color in "Hexadecimal" format:
const generateRandomColor = () => {
    //below variables👇, represents RED, GREEN & BLUE colors ranging(0-255), in RGB Color Format:
    let red = Math.floor(Math.random() * 256); 
    let green = Math.floor(Math.random() * 256); 
    let blue = Math.floor(Math.random() * 256);
    
    let rgbColor = [red, green, blue];
    return rgbToHexCode(rgbColor); 
}

const hideHexCodes = () => {
    for (let colorObj of colorElsArr) {
        const hexCodeEl = colorObj.el.querySelector(".hex-code");
        hexCodeEl.classList.add("hidden");
    }
}

//Function to disable the "generate button", until the random colors generation is stopped:
const disableGenBtn = (value) => {
    if(value) {
        genBtnEl.disabled = value;
        genBtnEl.classList.remove("btn-hover-effect");
        genBtnEl.classList.replace("text-white", "text-slate-300");
        genBtnEl.classList.replace("bg-sky-800", "bg-sky-900"); 
    }   
    else {
        genBtnEl.disabled = value;
        genBtnEl.classList.add("btn-hover-effect"); 
        genBtnEl.classList.replace("text-slate-300", "text-white");
        genBtnEl.classList.replace("bg-sky-900", "bg-sky-800"); 
    }
}

// Function to Update the "Color Palette Element" by Displaying Random Colors, at every 350ms interval:
const updateColorPalette = () => {
    isGeneratingColors = true;
    disableGenBtn(true);
    hideHexCodes();

    let i = 0; //index to iterate elements in 'colorElsArr[]'
    
    intervalId = setInterval( () => {
        if(i > 3) { //condition, to reset the 'i' index, when 'i' is more than last idx of 'colorElsArr[]'
            i = 0; 
        }

        let randomColor = generateRandomColor(); 
        colorElsArr[i].el.style.backgroundColor = colorElsArr[i].hexCode = randomColor;
        i++; //increment the 'i' index
    }, 350);
}

const stopGeneratingColors = () => {
    clearInterval(intervalId);
    isGeneratingColors = false;
    disableGenBtn(false);
}

const displayHexCode = (colorEl, hexCode) => {
    const hexCodeEl = colorEl.querySelector(".hex-code");
    hexCodeEl.classList.remove("hidden");
    hexCodeEl.textContent = hexCode;
}

let intervalId; //stores the ID of the "setInterval()" used in the "udpateColorPalette()"
let isGeneratingColors = false;  
genBtnEl.addEventListener("click", updateColorPalette);
colorPaletteEl.addEventListener("mouseenter", stopGeneratingColors);

// Loop to apply "mouseover" event handler to all the "Color-Elements" in the Color-Palette:
for (let colorObj of colorElsArr) {
    colorObj.el.addEventListener("mouseenter", () => displayHexCode(colorObj.el, colorObj.hexCode));
}