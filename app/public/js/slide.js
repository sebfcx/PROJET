document.addEventListener('DOMContentLoaded', function() {
    const slides = ["vsl01.webp", "vsl02.webp", "amb01.webp", "amb02.webp"];
    
    let index = 0;

    function Slide() {
        index = (index + 1) % slides.length;
        document.getElementById("vehicules-slide").src = "/images/" + slides[index];
    }

    document.getElementById("vehicules-slide").addEventListener('click', Slide);
});
