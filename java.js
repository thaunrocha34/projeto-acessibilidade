
let vozes = [];

function carregarVozes() {

    vozes = window.speechSynthesis.getVoices();

    const seletor = document.getElementById("voz");

    seletor.innerHTML = "";

    const portugues = vozes.filter(voz =>
        voz.lang.toLowerCase().startsWith("pt")
    );

    const lista = portugues.length ? portugues : vozes;

    lista.forEach((voz) => {

        const opcao = document.createElement("option");

        opcao.value = vozes.indexOf(voz);

        opcao.textContent = voz.name + " (" + voz.lang + ")";

        seletor.appendChild(opcao);

    });
}

carregarVozes();

window.speechSynthesis.onvoiceschanged = carregarVozes;


// FUNÇÃO PARA LER O TEXTO

function falar() {

    const texto = document.getElementById("texto").value;

    if (texto.trim() === "") {

        alert("Por favor, digite um texto primeiro!");

        return;
    }

    speechSynthesis.cancel();

    const partes = texto.match(/[\s\S]{1,2000}/g) || [];

    let indice = 0;

    function falarParte() {

        if (indice >= partes.length) {

            document.getElementById("status").textContent =
                "Leitura concluída!";

            return;
        }

        const leitura = new SpeechSynthesisUtterance(
            partes[indice]
        );

        const velocidade =
            document.getElementById("velocidade").value;

        leitura.rate = Number(velocidade);
        leitura.lang = "pt-BR";

        const vozSelecionada =
            document.getElementById("voz").value;

        if (vozSelecionada !== "") {

            leitura.voice = vozes[Number(vozSelecionada)];

            leitura.lang = leitura.voice.lang;
        }

        leitura.onend = function() {

            indice++;

            falarParte();

        };

        leitura.onerror = function() {

            document.getElementById("status").textContent =
                "Não foi possível reproduzir o áudio.";

        };

        speechSynthesis.speak(leitura);
    }

    document.getElementById("status").textContent =
        "O texto está sendo lido...";

    falarParte();
}


// PAUSAR LEITURA

function pausar() {

    if (speechSynthesis.speaking) {

        speechSynthesis.pause();

        document.getElementById("status").textContent =
            "Leitura pausada.";
    }
}


// CONTINUAR LEITURA

function continuar() {

    if (speechSynthesis.paused) {

        speechSynthesis.resume();

        document.getElementById("status").textContent =
            "Continuando a leitura...";
    }
}


// PARAR LEITURA

function parar() {

    speechSynthesis.cancel();

    document.getElementById("status").textContent =
        "Leitura interrompida.";
}


// AUMENTAR LETRAS

function mudarTamanho() {

    const tamanho =
        document.getElementById("tamanho").value;

    document.getElementById("texto").style.fontSize =
        tamanho + "px";
}


// ATIVAR ALTO CONTRASTE

function contraste() {

    document.body.classList.toggle("alto-contraste");

}
