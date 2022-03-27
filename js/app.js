//Esta es la forma de trabajar de JP siempre separa variables de eventlisteners y funciones al final 
//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
const textTweet = document.querySelector('#tweet');

let tweets = [];

//EventListeners
eventListeners();

function eventListeners() {
    //Cuando el usuairo agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);


    textTweet.addEventListener('keyup', (e) => {
        if (e.code === 'Enter') {
            // console.log('presiono enter');
            // console.log(textTweet.value);
            agregarTweet(e);
        }
    })

    document.addEventListener('DOMContentLoaded', () => {
        //Del localStorage buscar el elemento tweets y lo regresa como objeto 
        //Si esto regresa un null entonces asignamos tweets como un arreglo vacío con el operador || []
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        // console.log(tweets);
        crearHtml();
    });
}

//Funciones
function agregarTweet(e) {
    e.preventDefault();
    //Textarea donde se escribe el mensaje y obteniendo el valor.
    const tweet = document.querySelector('#tweet').value;

    if (tweet === '') {
        mostrarError("El tweet no puede ir vacío");
        return; 
    }
    //Recuerda que si la llave y el valor son iguales les puedes pasar solo uno
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //Crear el html para los tweets
    crearHtml();

    //Reiniciar formulario
    formulario.reset();
}

//Mostrar error 

const mostrarError = (mensaje) => {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');


    //insertar en contenido 
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Quitar la alerta de tweet vacío
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

//Muestra el listado de tweets
const crearHtml = () => {

    limpiarHtml();
    
    if ( tweets.length > 0 ) {
        tweets.forEach( tweet => {
            //Agregar un boton para eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = "X";

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
                
            }

            //Crear html
            const li = document.createElement('li');

            //Asignar el boton
            listaTweets.appendChild(btnEliminar);

            //Añadir texto
            li.innerText = tweet.tweet;
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

//Limpiar HMTL 

const limpiarHtml = () => {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

//Agrega los tweets actuales al localstorage

const sincronizarStorage = () => {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Borrar un tweet en específico

const borrarTweet = (id) => {
    tweets = tweets.filter( tweet => tweet.id !== id);
    localStorage.setItem('tweets', JSON.stringify(tweets));
    crearHtml();
}