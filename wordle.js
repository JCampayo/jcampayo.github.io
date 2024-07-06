
// Palabra seleccionada (puedes cambiar esto para que sea aleatorio o como lo necesites)

var palabraCorrecta;
var animacionesCompletadas = 0;

obtenerPalabra();

function refreshGame() {
    
    let celdas = document.querySelectorAll('.grid .row .cell');

    // Recorre cada celda y compara con la palabra correcta
    celdas.forEach((celda, index) => {
        // Limpia la celda antes de insertar la nueva letra
        celda.textContent = '';
        celda.classList.remove('correct', 'present', 'absent');
        celda.style.animationName = '';
    });

    // Reinicia la fila activa para ser la primera
    document.querySelectorAll('.grid .row').forEach(fila => {
        fila.classList.remove('completado');
    });
    document.querySelector('#fila-1').classList.remove('completado');

    obtenerPalabra();
}



// Función para ingresar la palabra y comparar
// Función para ingresar la palabra y comparar
function ingresarPalabra() {
    
    palabraCorrecta;  
    // Obtén el valor del campo de texto y conviértelo a mayúsculas
    let palabraIngresada = document.getElementById("word-input").value.toUpperCase();
    // Encuentra la fila activa
    let filaActiva = document.querySelector('.row:not(.completado)');
    // Contador de aciertos
    let contadorAciertos = 0;

    // Verifica si la palabra ingresada tiene la longitud correcta (5 letras)
    if (palabraIngresada.length === 5) {
    
        // Obtiene todas las celdas de la fila activa
        let celdas = filaActiva.querySelectorAll('.cell');
        let animacionesCompletadas = 0;

        // Recorre cada celda y compara con la palabra correcta
        celdas.forEach((celda, index) => {
            setTimeout(() => {
                // Limpia la celda antes de insertar la nueva letra
                celda.textContent = '';
                celda.textContent = palabraIngresada[index];

                // Elimina las clases previas
                celda.classList.remove('correct', 'present', 'absent');

                // Comprueba si la letra está en la posición correcta
                if (palabraIngresada[index] === palabraCorrecta[index]) {
                    celda.classList.add('correct');
                    contadorAciertos++;
                } else if (palabraCorrecta.includes(palabraIngresada[index])) {
                    celda.classList.add('present');
                } else {
                    celda.classList.add('absent');
                }

                // Aplica la animación
                celda.style.animationName = 'insertAnimation';

                // Incrementa el contador de animaciones completadas
                animacionesCompletadas++;

                // Verifica si todas las animaciones han sido completadas
                if (animacionesCompletadas === 5) {
                    // Marca la fila como completada para que no se pueda ingresar más
                    filaActiva.classList.add('completado');

                    // Verifica el número de aciertos solo cuando todas las animaciones han terminado
                    if (contadorAciertos === 5) {
                        // Espera 1 segundo antes de mostrar el mensaje de acierto
                        setTimeout(() => {
                            alert('ENHORABUENA HAS ACERTADO');
                            refreshGame();
                        }, 200);
                    } else {
                        // Verifica si la fila activa es la sexta (fila-6)
                        if (filaActiva.id === 'fila-6') {
                            setTimeout(() => {
                                alert("La palabra correcta era: " + palabraCorrecta);
                                refreshGame();    
                            }, 200);
                            
                        }
                    }
                }

            }, index * 600); // Retraso de 600ms entre cada letra
        });

        // Marca la fila como completada para que no se pueda ingresar más
        filaActiva.classList.add('completado');
    }


    // Limpia el campo de texto después de ingresar la palabra
    document.getElementById("word-input").value = '';
}

// Función para obtener una palabra aleatoria de 5 letras
async function obtenerPalabra() {
    let palabra;
    try {
        let response = await fetch('listado-general.txt');
        let text = await response.text();
        let palabras = text.trim().split('\n');
        let palabras5Letras = palabras.filter(palabra => palabra.length === 5);
        palabra = palabras5Letras[Math.floor(Math.random() * palabras5Letras.length)].toUpperCase();
        palabra = palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        console.log("Palabra correcta seleccionada:", palabra); 
        palabraCorrecta = palabra;
    } catch (error) {
        console.error('Error al obtener la palabra aleatoria:', error);
    }
        
}

