const salida = document.getElementById('salida');
const imgFeliz = document.getElementById('img-feliz');
const imgTriste = document.getElementById('img-triste');

let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES';
recognition.continuous = true;
recognition.interimResults = false;

const startListening = () => {
    recognition.start();
}

const stopListening = () => {
    recognition.abort();
}

recognition.onresult = (event) => {
    const results = event.results;
    const texto = results[results.length-1][0].transcript;

    console.log(texto);
    salida.innerHTML = texto;

    evaluar(texto)
};

const evaluar = texto => {
    fetch('/evaluar/'+texto)
    .then(response => response.json())
    .then(data => {
        if (data.output == 0) { // feliz
            imgFeliz.classList.remove('disabled');
            imgTriste.classList.add('disabled');
        } else if (data.output == 1) { // triste
            imgFeliz.classList.add('disabled');
            imgTriste.classList.remove('disabled');
        } else {
            imgFeliz.classList.add('disabled');
            imgTriste.classList.add('disabled');
        }
    });
}