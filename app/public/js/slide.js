const slide = ["vsl01.webp", "vsl02.webp", "amb01.webp", "amb02.webp"]
let number = 0;

function Slide(sens) {
    number = number + sens;
    if(number > slide.length - 1)
        number = 0
    if(number < 0)
        number = slide.length - 1;

    document.getElementById("picture").src = "images/" + slide[number]
}