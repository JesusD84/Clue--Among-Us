/* 

**Lugares**
Escudos
Armeria
Hospital
Navegacion
Electricidad

**Personajes**
Negro
Amarillo
Azul
Rojo
Morado

**Armas**
Pistola
LLave inglesa
Cuchillo
Tuberia
Candelabro

**Preguntar por: 
Personaje
Lugares
Armas

Desicion final:
**Pierdes si es erroneo
**Ganas si es correcto
*/
let arregloPersonajes = ['rojo','azul','negro','amarillo','morado'];
let arregloHabitaciones = ['hospital','armeria','navegacion','escudos','electricidad'];
let arregloArmas = ['pistola','llave inglesa','cuchillo','tuberia','candelabro'];

let contenido = document.getElementById('content');
let titulo = document.getElementById('title');
let cajaMensaje = document.getElementById('mensaje');
let mensajeElem = document.querySelector('#mensaje div');
let next = document.getElementById('next');
let nextButton = document.querySelector('#next button');
let video = document.createElement('video');
let source = document.createElement('source');
let img = document.createElement('img');
let personajes = document.querySelectorAll('.personajes');
let habitaciones = document.querySelectorAll('.habitaciones');

let oportunidades = 3;

let agregarMensaje = function (mensaje) { 
    let msg = document.createElement('p');
    msg.innerHTML = mensaje;
    mensajeElem.append(msg);
}

let agregarOpcion = function (mensaje) {
    let opc = document.createElement('button');
    let br = document.createElement('br');
    opc.innerHTML = mensaje;
    mensajeElem.append(br);
    mensajeElem.append(opc);
}

//INICIO
let iniciarJuego = function () {  
    source.setAttribute('src','media/muerte.mp4');
    source.setAttribute('type',"video/mp4");

    video.setAttribute('autoplay', "");
    video.setAttribute('id','myVideo');
    video.append(source);

    contenido.append(video);

    //Esperar que acabe video
    video.onended = function() {
        agregarMensaje('Ohhhhh noo!!!');
        agregarMensaje('Alguien mato a blanco!! :\'(');
        agregarMensaje('Hay un impostor entre nosotros');
        agregarMensaje('Es nuestro deber averiguar quien es');
        agregarMensaje('Es recomendable jugar en pantalla completa (F11)');
        cajaMensaje.style.display = 'block';
        next.style.display = 'block';
    }

    nextButton.onclick = function() {
        titulo.style.display = 'none';
        mensajeElem.innerHTML = '';
        explicacionJuego();
    }
}

let explicacionJuego = function () { 
    agregarMensaje('Dentro de la nave hay 5 sospechosos: ');
    agregarMensaje('Azul');
    agregarMensaje('Amarillo');
    agregarMensaje('Negro');
    agregarMensaje('Morado');
    agregarMensaje('Rojo');

    nextButton.onclick = function() {
        mensajeElem.innerHTML = '';
        explicacionJuego2();
    }
}

let explicacionJuego2 = function () { 
    agregarMensaje('Tambien existen 5 lugares posibles donde fue el asesinato: ');
    agregarMensaje('Armeria');
    agregarMensaje('Navegacion');
    agregarMensaje('Escudos');
    agregarMensaje('Electricidad');
    agregarMensaje('Hospital');

    nextButton.onclick = function() {
        mensajeElem.innerHTML = '';
        explicacionJuego3();
    }
 }

 let explicacionJuego3 = function () { 
    agregarMensaje('Y por ultimo se sabe de 5 armas diferentes con el que se pudo haber ocasionado el asesinato: ');
    agregarMensaje('Pistola');
    agregarMensaje('Llave Inglesa');
    agregarMensaje('Cuchillo');
    agregarMensaje('Tuberia');
    agregarMensaje('Candelabro');

    nextButton.onclick = function() {
        mensajeElem.innerHTML = '';
        explicacionJuego4();
    }
 }

 let explicacionJuego4 = function () {
    agregarMensaje('Podras consultar los videos de la nave 3 veces');
    agregarMensaje('Con la informacion dada, tendras que decidir quien es el impostor y hecharlo por la borda');
    agregarMensaje('Si logras dar con el impostor, lugar y arma usada, ganaras');
    agregarMensaje('De lo contrario, perderas');
    agregarMensaje('Suerte!!');

    nextButton.onclick = function() {
        mensajeElem.innerHTML = '';
        next.style.display = 'none';
        elegirPregunta();
    }
 }

 let elegirPregunta = function () {
    oportunidades--;

    if (oportunidades >= 0) {
        agregarMensaje('¿Que quieres preguntar?');  
        agregarOpcion('Personaje');
        agregarOpcion('Habitacion');
        agregarOpcion('Arma');

        let opciones = document.querySelectorAll('#mensaje div button');

        for (const opcion of opciones) {
            opcion.addEventListener('click', function(event) {
              let opcionElegida = opcion.innerHTML;
              mensajeElem.innerHTML = '';
              if(opcionElegida === 'Personaje') {
                cajaMensaje.style.display = 'none';
                elegirPersonaje();
              } else if (opcionElegida === 'Habitacion') {
                cajaMensaje.style.display = 'none';
                elegirHabitacion();
              } else {
                elegirArma();
              }
            });
        }      
    }
}

let elegirPersonaje = function() {
    contenido.innerHTML = '';
    img.setAttribute('src','media/personajes.png');
    contenido.append(img);

    for (const personaje of personajes) {
        personaje.style.display = 'block';
        personaje.addEventListener('click', function (event) { 
            let personajeElegido = personaje.getAttribute('id');
            
        });
    }
}

let elegirHabitacion = function() {
    contenido.innerHTML = '';
    img.setAttribute('src','media/mapa.png');
    contenido.append(img);

    for (const habitacion of habitaciones) {
        habitacion.style.display = 'block';
        habitacion.addEventListener('click', function (event) { 
            let habitacionElegida = habitacion.getAttribute('id');
            
        });
    }
}

let elegirArma = function() {
    agregarMensaje('¿Que arma quieres buscar evidencias?');  
    agregarOpcion('Pistola');
    agregarOpcion('Llave Inglesa');
    agregarOpcion('Cuchillo');
    agregarOpcion('Tuberia');
    agregarOpcion('Candelabro');

    let armas = document.querySelectorAll('#mensaje div button');

    for (const arma of armas) {
        arma.addEventListener('click', function(event) {
            let armaElegida = arma.innerHTML;
            alert(armaElegida);
            
        });
    }
}


iniciarJuego();




