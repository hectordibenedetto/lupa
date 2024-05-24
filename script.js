let cx = 1;
let cy = 1;

window.onload = function() {
    var img, lens;
    img = document.getElementById("image");
    lens = document.getElementById("zoom-lens");

    /* Ejecutar una función cuando alguien mueva el cursor sobre la imagen o el lente: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);

    /* Y también para dispositivos táctiles: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);

    function moveLens(e) {
        var pos, x, y;
        /* Prevenir cualquier otra acción que pueda ocurrir: */
        e.preventDefault();
        /* Obtener las posiciones del cursor x e y: */
        pos = getCursorPos(e);
        /* Calcular la posición del lente: */
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);
        /* Evitar que el lente se salga de la imagen: */
        if (x > img.width - lens.offsetWidth / 2) { x = img.width - lens.offsetWidth / 2; }
        if (x < -lens.offsetWidth / 2) { x = -lens.offsetWidth / 2; }
        if (y > img.height - lens.offsetHeight) { y = img.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }
        /* Establecer la posición del lente: */
        lens.style.left = x + "px";
        lens.style.top = y + "px";
        /* Mostrar lo que el lente "ve": */
        lens.style.backgroundImage = "url('" + img.src + "')";
        lens.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
        lens.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Obtener las posiciones x e y de la imagen: */
        a = img.getBoundingClientRect();
        /* Calcular las coordenadas del cursor, relativas a la imagen: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Considerar cualquier desplazamiento de la página: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
};

/* Función para establecer el nivel de zoom */
function setZoom(zoom) {
    cx = zoom;
    cy = zoom;
}
