//Selecting HTML DOM Elements:
const genBtnEl = document.querySelector("#generateBtn");
const colorPaletteEl = document.querySelector(".color-palette");
const colorElsArr = [document.querySelector("#color1"), document.querySelector("#color2"), document.querySelector("#color3"), document.querySelector("#color4")];

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
const rgbToHexCode = (rgbColor) => {
    return "#" + decimalToHexadecimal(rgbColor[0]) + decimalToHexadecimal(rgbColor[1]) + decimalToHexadecimal(rgbColor[2]);
}

// Function to Generate a Random Color in "RGB" format:
const generateRandomColor = () => {
    //below variables👇, represents RED, GREEN & BLUE colors ranging(0-255), in RGB Color Format:
    let red = Math.floor(Math.random() * 256); 
    let green = Math.floor(Math.random() * 256); 
    let blue = Math.floor(Math.random() * 256);
    
    // let rgbColor = [red, green, blue];  //stores randomly generated color in RGB format 
    return `rgb(${red}, ${green}, ${blue})`; 
}

// Function to Update the "Color Palette Element" by Displaying Random Colors, at every 350ms interval:
const updateColorPalette = () => {
    let i = 0; //index to iterate elements in 'colorElsArr[]'

    intervalId = setInterval( () => {
        if(i > 3) { //condition, to reset the 'i' index
            i = 0; 
        }
        colorElsArr[i].style.backgroundColor = generateRandomColor(); //update the Color-Element's bg-color
        i++; //increment the 'i' index
    }, 350);
}

let intervalId; //stores the ID of the "setInterval()" used in the "udpateColorPalette()"  
genBtnEl.addEventListener("click", updateColorPalette);
colorPaletteEl.addEventListener("mouseenter", () => {
    // Stop Generating & Displaying Random Colors in the Color-Palette:
    clearInterval(intervalId);
});

// Loop to apply "mouseover" event to all the "Color-Elements" in the Color-Palette:
colorElsArr.forEach( (el) => {
    el.addEventListener("mouseenter", () => {
        console.log(el);
    });
});