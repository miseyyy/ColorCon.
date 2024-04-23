
const textColorInput = document.getElementById("textColor");
const bgColorInput = document.getElementById("bgColor");
const resultElement = document.querySelector(".result");
const contrastRatingElement = document.getElementById("rating");


function hexToRGB(colorValue) {
    const red = parseInt(colorValue.substring(1, 3), 16);
    const green = parseInt(colorValue.substring(3, 5), 16);
    const blue = parseInt(colorValue.substring(5, 7), 16);
    return [red, green, blue];
}


function getRelativeLuminance(color) {
    const sRGB = color.map((val) => {
        const s = val / 255;
        return s < 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
}


function calculateContrastRatio(color1, color2) {
    const lum1 = getRelativeLuminance(color1);
    const lum2 = getRelativeLuminance(color2);
    const light = Math.max(lum1, lum2);
    const dark = Math.min(lum1, lum2);
    const contrast = (light + 0.05) / (dark + 0.05);
    return contrast;
}


function getContrastRating(contrastVal) {
    if (contrastVal > 12) {
        return { label: "Super", color: "#69eb67" };
    } else if (contrastVal > 7) {
        return { label: "Very Good", color: "#b7ea84" };
    } else if (contrastVal > 5) {
        return { label: "Good", color: "#f7d658" };
    } else if (contrastVal > 3) {
        return { label: "Poor", color: "#f17a55" };
    } else {
        return { label: "Very Poor", color: "#f24646" };
    }
}


function updateContrastCheck() {
    const textColorValue = textColorInput.value;
    const bgColorValue = bgColorInput.value;

    
    const textColorRGBArray = hexToRGB(textColorValue);
    const bgColorRGBArray = hexToRGB(bgColorValue);

    
    const contrastRatio = calculateContrastRatio(textColorRGBArray, bgColorRGBArray);

    
    const contrastRating = getContrastRating(contrastRatio);

    
    contrastRatingElement.innerText = contrastRatio.toFixed(2);
    resultElement.innerText = contrastRating.label;
    resultElement.style.backgroundColor = contrastRating.color;
    resultElement.style.color = textColorValue;
}


textColorInput.addEventListener("input", updateContrastCheck);
bgColorInput.addEventListener("input", updateContrastCheck);


window.addEventListener("load", updateContrastCheck);
