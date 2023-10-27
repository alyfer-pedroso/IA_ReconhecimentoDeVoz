const recordBtn = document.getElementById("recordBtn");
const speechText = document.getElementById("speechText");

let mimic = false;

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

        if (!mimic) {
            if (txt.includes("abrir")) {
                let a = txt.replace(/abrir/g, "").split(" ").join("");
                let b = `https://${a}.com/`;
                speechText.innerHTML = `Abrindo ${a}...`;

                if (a.includes("whatsapp") || a.includes("telegram")) {
                    b = `https://web.${a}.com/`;
                }

                setTimeout(() => {
                    window.open(b);
                    speechText.innerHTML = "";
                }, 2500);

                return;
            } else if (txt.includes("quanto é")) {
                let a = txt.replace(/quanto é/g, "");
                let b = null;

                if (a.includes("x")) {
                    a = a.replace(/x/g, "*");
                }

                if (a.includes("elevado a")) {
                    a = a.replace(/elevado a/g, "**");
                }

                if (a.includes("raiz quadrada")) {
                    a = a
                        .replace(/a raiz quadrada de/g, "")
                        .split(" ")
                        .join("");
                    b = Math.sqrt(a);
                    speechText.innerHTML = `a raiz quadrada de ${a} é igual a ${b}`;
                    return;
                }

                b = eval(a);
                speechText.innerHTML = `${a} é igual a ${b}`;

                return;
            }

            switch (txt) {
                case "quem é você": {
                    speechText.innerHTML = "Eu sou uma IA de reconhecimento de voz feito pelo Alyfer";
                    break;
                }

                case "comece a me imitar": {
                    mimic = true;
                    speechText.innerHTML = "Ok, vou te imitar";
                    break;
                }

                default:
                    speechText.innerHTML = "Desculpá, não consegui entender :/";
                    break;
            }
        } else {
            if (txt.includes("pare") || txt.includes("imitar")) {
                mimic = false;
                speechText.innerHTML = "Ok, eu parei";
                return;
            }
            speechText.innerHTML = txt;
        }
    });
} else {
    speechText.innerHTML = "Seu navegador não suporta reconhecimento de voz";
}
