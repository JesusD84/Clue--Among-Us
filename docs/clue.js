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

let personajesDesordenados;
let habitacionesDesordenados;
let armasDesordenados;

let historiaCulpable;
let arregloHistorias = [];

let contenido = document.getElementById('content');
let titulo = document.getElementById('title');
let cajaMensaje = document.getElementById('mensaje');
let mensajeElem = document.querySelector('#mensaje div');
let next = document.getElementById('next');
let nextButton = document.querySelector('#next button');
let img = document.createElement('img');
let personajes = document.querySelectorAll('.personajes');
let habitaciones = document.querySelectorAll('.habitaciones');

let personajeFinal, habitacionFinal, armaFinal;

let oportunidades;

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
    personajesDesordenados = arregloPersonajes.sort(() => Math.random() - 0.5);
    habitacionesDesordenados = arregloHabitaciones.sort(() => Math.random() - 0.5);
    armasDesordenados= arregloArmas.sort(() => Math.random() - 0.5);
    
    historiaCulpable = {
        personaje: personajesDesordenados[Math.floor(Math.random() * 5)],
        habitacion: habitacionesDesordenados[Math.floor(Math.random() * 5)],
        arma: armasDesordenados[Math.floor(Math.random() * 5)],
    }
    arregloHistorias = [];
    
    for(let i = 0; i<5; i++) {
        let historia = {
            personaje: personajesDesordenados[i],
            habitacion: habitacionesDesordenados[i],
            arma: armasDesordenados[i]
        }
        arregloHistorias.push(historia);
    }
    
    oportunidades = 5;
    let video = document.createElement('video');
    let source = document.createElement('source');

    source.setAttribute('src','media/muerte.mp4');
    source.setAttribute('type',"video/mp4");

    video.setAttribute('autoplay', "");
    video.setAttribute('id','myVideo');
    video.append(source);

    contenido.append(video);
    video.play();

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
        var elem = document.documentElement;
        function openFullscreen() {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }
        openFullscreen();
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
    agregarMensaje('Podras consultar los videos de la nave 5 veces');
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
    } else {
        agregarMensaje('Se te acabaron las oportunidades para consultar en las grabaciones');
        agregarMensaje('Tendras que decidir como fue el asesinato');
        next.style.display = 'block';

        nextButton.onclick = function() {
            mensajeElem.innerHTML = '';
            cajaMensaje.style.display = 'none';
            next.style.display = 'none';
            elegirPersonaje();
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
            if(oportunidades >= 0) {
                mostrarEvidencias(personajeElegido);
            } else {
                personajeFinal = personajeElegido;
                elegirHabitacion();
            }
        });
    }
}

let elegirHabitacion = function() {
    for (const personaje of personajes) {
        personaje.style.display = 'none';
    }
    contenido.innerHTML = '';
    img.setAttribute('src','media/mapa.png');
    contenido.append(img);

    for (const habitacion of habitaciones) {
        habitacion.style.display = 'block';
        habitacion.addEventListener('click', function (event) { 
            let habitacionElegida = habitacion.getAttribute('id');
            if(oportunidades >= 0) {
                mostrarEvidencias(habitacionElegida);
            }else {
                habitacionFinal = habitacionElegida;
                elegirArma();
            }
        });
    }
}

let elegirArma = function() {
    for (const habitacion of habitaciones) {
        habitacion.style.display = 'none';
    }

    mensajeElem.innerHTML = '';
    cajaMensaje.style.display = 'block';

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
            mensajeElem.innerHTML = '';
            cajaMensaje.style.display = 'none';
            if(oportunidades >= 0) {
                mostrarEvidencias(armaElegida.toLowerCase());
            }else {
                armaFinal = armaElegida.toLowerCase();
                desicionFinal(personajeFinal,habitacionFinal,armaFinal);
            }
        });
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

let mostrarEvidencias = function (opcionElegida) {  
    for (const personaje of personajes) {
        personaje.style.display = 'none';
    }
    for (const habitacion of habitaciones) {
        habitacion.style.display = 'none';
    }
    contenido.innerHTML = '';
    let video = document.createElement('video');
    let source = document.createElement('source');
    let historiaElegida;

    for(historia of arregloHistorias) {
        for(i in historia) {
            if(opcionElegida === historia[i]) {
                historiaElegida = historia;
                if(historia.personaje === historiaCulpable.personaje || 
                   historia.habitacion === historiaCulpable.habitacion) {
                   source.setAttribute('src',`media/camaras.mp4`);
                }else {
                    source.setAttribute('src',`media/${historia.personaje}-${historia.habitacion}.mp4`);
                }
                source.setAttribute('type',"video/mp4");

                video.setAttribute('autoplay', "");
                video.setAttribute('id','myVideo');
                video.append(source);

                contenido.append(video);
                video.play();
                
                //Esperar que acabe video
                video.onended = function() {
                    mensajeElem.innerHTML = '';
                    agregarMensaje(`${capitalize(historiaElegida.personaje)} dice que estuvo en ${capitalize(historiaElegida.habitacion)} y que vio el objeto ${capitalize(historiaElegida.arma)}`);
                    if(historiaElegida.personaje === historiaCulpable.personaje) {
                        agregarMensaje(`Al parecer no se encontraron grabaciones de ${capitalize(historiaElegida.personaje)}`);
                    } else {
                        agregarMensaje(`Las grabaciones y/o sensores registraron a ${capitalize(historiaElegida.personaje)} haciendo tareas`);
                    }
                    
                    if(historiaElegida.habitacion === historiaCulpable.habitacion) {
                        agregarMensaje(`Por desgracia, las grabaciones y/o sensores estaban deshabilitadas en ${capitalize(historiaElegida.habitacion)}`);
                    } else {
                        agregarMensaje(`Las grabaciones y/o sensores si estaban operando en ${capitalize(historiaElegida.habitacion)}`);
                    }
                    
                    if(historiaElegida.arma === historiaCulpable.arma) {
                        agregarMensaje(`Los sensores y/o grabaciones NO encontraron el objeto ${capitalize(historiaElegida.arma)} por ningun lado`);
                        
                    }else {
                        agregarMensaje(`Los sensores y/o grabaciones han detectado el objeto ${capitalize(historiaElegida.arma)}`);
            
                    }
                    cajaMensaje.style.display = 'block';
                    next.style.display = 'block';
                }
            
                nextButton.onclick = function() {
                    mensajeElem.innerHTML = '';
                    next.style.display = 'none';
                    elegirPregunta();
                }
            }
        }
    }

}

let desicionFinal = function (personaje, habitacion, arma) {  
    contenido.innerHTML = '';
    let video = document.createElement('video');
    let source = document.createElement('source');

    if(personaje === historiaCulpable.personaje &&
       habitacion === historiaCulpable.habitacion &&
       arma === historiaCulpable.arma) {
            source.setAttribute('src',`media/${personaje}-ganar.mp4`);
       } else {
            source.setAttribute('src',`media/${personaje}-perder.mp4`);
       }
    source.setAttribute('type',"video/mp4");

    video.setAttribute('autoplay', "");
    video.setAttribute('id','myVideo');
    video.append(source);

    contenido.append(video);
    video.play();

    //Esperar que acabe video
    video.onended = function() {
        cajaMensaje.style.display = 'block';
        
        if(personaje === historiaCulpable.personaje &&
            habitacion === historiaCulpable.habitacion &&
            arma === historiaCulpable.arma) {
                agregarMensaje(`Felicidades!!! Has logrado dar con el impostor, habitacion y arma correctas`);
            } else {
                agregarMensaje(`Lo siento!! Has perdido!! :(`);
                
                if(personaje !== historiaCulpable.personaje) {
                    agregarMensaje(`El personaje ${capitalize(personaje)} era inocente, ya que las grabaciones y/o sensores si lograron detectarlo en la hora del asesinato`);
                }
                
                if(habitacion !== historiaCulpable.habitacion) {
                    agregarMensaje(`La habitacion ${capitalize(habitacion)} es erronea, ya que las grabaciones y/o sensores si estaban activas en la hora del asesinato`);
                }
                
                if(arma !== historiaCulpable.arma) {
                    agregarMensaje(`El arma ${capitalize(arma)} es erronea, ya que las grabaciones y/o sensores si lograron encontrarlo en la hora del asesinato`);
                }
        }
        
        agregarMensaje('Para volver a jugar, has clic en Continuar');
        next.style.display = 'block';
        nextButton.onclick = function() {
            titulo.style.display = 'block';
            mensajeElem.innerHTML = '';
            next.style.display = 'none';
            cajaMensaje.style.display = 'none';
            iniciarJuego();
        }
    }
}

window.onclick = function () { iniciarJuego(); this.onclick=null }






