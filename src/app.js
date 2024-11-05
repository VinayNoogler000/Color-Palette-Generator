document.addEventListener("DOMContentLoaded", () => {
    //Class to create objects of color elements in the "color-palette" el, by following D.R.Y approach.
    class ColorEl {
        constructor(el, hexCode) {
            this.el = el;
            this.hexCode = (hexCode === undefined ? el.querySelector(".hex-code").innerText : hexCode);
        }
    }

    //Class to Craete Toast Object:
    class Toast {
        constructor(text, bgColor) {
            this.text = text;
            this.duration = 2000;
            this.close = true;
            this.gravity =  "top",
            this.position = "center",
            this.stopOnFocus = true,
            this.style = {
                fontSize: "1.5rem",
                background: bgColor === "green" ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #e33217, #ff001e)",
                cursor: "default",
            }
        }
    }

    //Selecting HTML DOM Elements:
    const genBtnEl = document.querySelector("#generateBtn");
    const colorPaletteEl = document.querySelector(".color-palette");
    const colorBoxEls = [];

    // Function to Generate a Random Color and return it's "Hexadecimal" Code:
    const generateRandomColor = () => {
        const hexDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

        let hexCode = "#";
        for (let i = 0; i < 6; i++) {
            let idx = Math.floor(Math.random() * hexDigits.length); //store random index to access 'hexDigits[]' elements
            hexCode += hexDigits[idx]; //add a random hex digit to the "hexCode" String.
        }

        return hexCode;
    }

    // Function to Hide the Displayed HexCodes, as the Process of Generating Random Colors Start: 
    const hideHexCodes = () => {
        for (let colorObj of colorBoxEls) {
            const hexCodeEl = colorObj.el.querySelector(".hex-code");
            hexCodeEl.classList.add("hidden");
        }
    }

    //Function to disable the "generate button", until the random colors generation is stopped:
    const disableGenBtn = (value) => {
        if (value) {
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

        let i = 0; //index to iterate elements in 'colorBoxEls[]'
        intervalId = setInterval(() => {
            if (i > 3) { //condition, to reset the 'i' index, when 'i' is more than last idx of 'colorBoxEls[]'
                i = 0;
            }

            let randomColor = generateRandomColor();
            colorBoxEls[i].el.style.backgroundColor = colorBoxEls[i].hexCode = randomColor;
            i++; //increment the 'i' index
        }, 350);
    }

    // Function to Stop Generating Random Colors, as the Mouse Cursor Enters the  Border of "colorPaletteEl":
    const stopGeneratingColors = () => {
        clearInterval(intervalId);
        isGeneratingColors = false;
        disableGenBtn(false);
    }

    // Function to Update & Display the Hex Code of a Color-Box El's bg-color, on "mouseenter" event: 
    const updateHexCode = (colorEl, hexCode) => {
        const hexCodeEl = colorEl.querySelector(".hex-code");
        hexCodeEl.textContent = hexCode;
        hexCodeEl.classList.remove("hidden");
    }

    const copyToClipboard = async (el) => {
        const text = el.innerText; //stores the hexCode of bgColor of the Color-Box El.

        try {
            await navigator.clipboard.writeText(text);
            Toastify(new Toast("Copied to Cliboard", "green")).showToast();
        }
        catch (err) {
            Toastify(new Toast("Can't Copy to Clipboard. Please, Retry Again!", "red")).showToast();
            console.log(err);
        }
    }

    // Initialize Auxillary/Helper Variables:
    let intervalId; //stores the ID of the "setInterval()" used in the "udpateColorPalette()"
    let isGeneratingColors = false;

    // Loop to add Elements to the 'colorBoxEls[]':
    for (let colorBox of colorPaletteEl.children) {
        colorBoxEls.push(new ColorEl(colorBox));
    }

    // Apply Event Listeners to Elements:
    genBtnEl.addEventListener("click", updateColorPalette);
    colorPaletteEl.addEventListener("mouseenter", stopGeneratingColors);
    for (let colorBox of colorBoxEls) { // Loop to apply:
        //"mosueenter" event handler to all the "Color Box Els"
        colorBox.el.addEventListener("mouseenter", (event) => updateHexCode(event.target, colorBox.hexCode));

        //"click" event handler to all "hex-code" Els
        const hexCodeEl = colorBox.el.querySelector(".hex-code");
        hexCodeEl.addEventListener("click", (event) => copyToClipboard(event.target))
    }
});