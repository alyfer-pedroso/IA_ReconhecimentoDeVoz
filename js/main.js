const recordBtn = document.getElementById("recordBtn");
const speechText = document.getElementById("speechText");

let mimic = false;
let voiceList = [];

speechSynthesis.addEventListener("voiceschanged", () => {
    voiceList = speechSynthesis.getVoices();
});

function IAVoice(textToSpeech) {
    let utterance = new SpeechSynthesisUtterance(textToSpeech);
    utterance.voice = voiceList[1];
    speechSynthesis.speak(utterance);
}

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
    const Speech = new webkitSpeechRecognition();
    Speech.lang = "pt-BR";

    recordBtn.addEventListener("click", () => {
        try {
            Speech.start();
            speechText.innerHTML = "Reconhecendo...";
        } catch (error) {
            alert("ERROR: " + error);
            location.reload();
        }
    });

    Speech.addEventListener("result", (e) => {
        let txt = e.results[0][0].transcript.toLowerCase();
        let textToVoice = "";

        if (!mimic) {
            if (txt.includes("marina")) {
                txt = txt.replace(/marina/g, "");

                //Abrir sites
                if (txt.includes("abrir")) {
                    openSite(txt);
                    return;
                }

                //Operações matemáticas
                if (txt.includes("quanto é")) {
                    doOperations(txt);
                    return;
                }

                //Nome
                if (txt.includes("eu sou") || txt.includes("meu nome é")) {
                    userName(txt);
                    return;
                }

                //Pesquisar
                if (txt.includes("pesquisar")) {
                    searchThings(txt);
                    return;
                }

                //Imitar
                if ((txt.includes("me") && txt.includes("imite")) || (txt.includes("me") && txt.includes("imitar"))) {
                    mimicUser(txt);
                    return;
                } else if (txt.includes("imite") || txt.includes("imitar")) {
                    speechText.innerHTML = "Desculpa, imitar quem?";
                    IAVoice(speechText.textContent);
                    return;
                }

                //Ajuda
                if (txt.includes("me ajuda") || txt.includes("o que você pode fazer") || txt.includes("o que você faz")) {
                    speechText.innerHTML = "Eu consigo te ajudar! Por enquanto eu posso abrir sites (Marina, abrir), fazer contas matemáticas (Marina, quanto é), saber o seu nome e pesquisar coisas para você (Marina, pesquisar). Ah e também posso te imitar";
                    IAVoice(speechText.textContent);
                    return;
                }

                speechText.innerHTML = "Desculpa, não consegui entender";
                IAVoice(speechText.textContent);
            } else {
                //Frases preparadas
                switch (txt) {
                    case "quem é você": {
                        speechText.innerHTML = "Eu sou uma Inteligência Artificial de reconhecimento de voz feito pelo Alyfer. Você pode conversar comigo e eu posso te ajudar";
                        IAVoice(speechText.textContent);
                        break;
                    }

                    case "olá": {
                        speechText.innerHTML = "Olá, como posso te ajudar?";
                        IAVoice(speechText.textContent);
                        break;
                    }

                    case "oi": {
                        speechText.innerHTML = "Oi, como posso te ajudar?";
                        IAVoice(speechText.textContent);
                        break;
                    }

                    case "qual é o seu nome": {
                        speechText.innerHTML = "Olá! Meu nome é Marina e sou uma inteligência artificial de reconhecimento de voz. Você pode conversar comigo e eu posso te ajudar";
                        IAVoice(speechText.textContent);
                        break;
                    }

                    default:
                        speechText.innerHTML = "Desculpa, não consegui entender";
                        IAVoice(speechText.textContent);
                        break;
                }
            }
        } else {
            mimicUser(txt);
        }
    });
} else {
    speechText.innerHTML = "Seu navegador não suporta reconhecimento de voz";
}
