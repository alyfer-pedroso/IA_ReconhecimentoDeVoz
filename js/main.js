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
        const txt = e.results[0][0].transcript.toLowerCase();
        let textToVoice = "";

        if (!mimic) {
            //Abrir sites
            if (txt.includes("abrir")) {
                let getSiteName = txt.replace(/abrir/g, "").split(" ").join("");
                let URL = `https://${getSiteName}.com/`;
                speechText.innerHTML = `Abrindo ${getSiteName}...`;
                IAVoice(speechText.textContent);

                if (getSiteName.includes("whatsapp") || getSiteName.includes("telegram")) {
                    URL = `https://web.${getSiteName}.com/`;
                }

                setTimeout(() => {
                    window.open(URL);
                    speechText.innerHTML = "";
                }, 2500);

                return;
            }

            //Operações matemáticas
            if (txt.includes("quanto é")) {
                let getOperation = txt.replace(/quanto é/g, "");
                let operation = null;

                if (getOperation.includes("x")) {
                    getOperation = getOperation.replace(/x/g, "*");
                }

                if (getOperation.includes("elevado a")) {
                    getOperation = getOperationreplace(/elevado a/g, "**");
                }

                if (getOperation.includes("raiz quadrada")) {
                    getOperation = getOperation
                        .replace(/a raiz quadrada de/g, "")
                        .split(" ")
                        .join("");
                    operation = Math.sqrt(getOperation);
                    speechText.innerHTML = `A raiz quadrada de ${getOperation} é igual a ${operation}`;
                    IAVoice(speechText.textContent);
                    return;
                }

                operation = eval(getOperation).toFixed(2);
                speechText.innerHTML = `${getOperation} é igual a ${operation}`;

                if (speechText.textContent.includes("**")) {
                    textToVoice = speechText.innerHTML.replace("**", "elevado a");
                    IAVoice(textToVoice);
                    return;
                }
                if (speechText.textContent.includes("*")) {
                    textToVoice = speechText.innerHTML.replace("*", "vezes");
                    IAVoice(textToVoice);
                    return;
                }
                if (speechText.textContent.includes("/")) {
                    textToVoice = speechText.innerHTML.replace("/", "dividido por");
                    IAVoice(textToVoice);
                    return;
                }
                if (speechText.textContent.includes("-")) {
                    textToVoice = speechText.innerHTML.replace("-", "menos");
                    IAVoice(textToVoice);
                    return;
                }

                IAVoice(speechText.textContent);

                return;
            }

            //Nome
            if (txt.includes("eu sou")) {
                let getName = "";
                if (txt.includes("eu sou a")) {
                    getName = txt
                        .replace(/eu sou a/g, "")
                        .split(" ")
                        .join("");
                } else if (txt.includes("eu sou o")) {
                    getName = txt
                        .replace(/eu sou o/g, "")
                        .split(" ")
                        .join("");
                } else {
                    getName = txt
                        .replace(/eu sou/g, "")
                        .split(" ")
                        .join("");
                }
                speechText.innerHTML = `Olá, ${getName}, tudo bem? Como eu posso te ajudar?`;
                IAVoice(speechText.textContent);
                return;
            }

            //Frases preparadas
            switch (txt) {
                case "quem é você": {
                    speechText.innerHTML = "Eu sou uma Inteligência Artificial de reconhecimento de voz feito pelo Alyfer. Você pode conversar comigo";
                    IAVoice(speechText.textContent);
                    break;
                }

                case "olá": {
                    speechText.innerHTML = "Olá, como posso te ajudar?";
                    IAVoice(speechText.textContent);
                    break;
                }

                case "comece a me imitar": {
                    mimic = true;
                    speechText.innerHTML = "Ok, vou te imitar";
                    IAVoice(speechText.textContent);
                    break;
                }

                case "qual é o seu nome": {
                    speechText.innerHTML = "Não sei qual é o meu nome. O Alyfer não pensou nisso ainda";
                    IAVoice(speechText.textContent);
                    break;
                }

                default:
                    speechText.innerHTML = "Desculpa, não consegui entender";
                    IAVoice(speechText.textContent);
                    break;
            }
        } else {
            if (txt.includes("pare") || txt.includes("imitar")) {
                mimic = false;
                speechText.innerHTML = "Ok, eu parei";
                IAVoice(speechText.textContent);
                return;
            }
            speechText.innerHTML = txt;
            IAVoice(speechText.textContent);
        }
    });
} else {
    speechText.innerHTML = "Seu navegador não suporta reconhecimento de voz";
}
