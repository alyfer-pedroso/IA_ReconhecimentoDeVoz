const openSite = (txt) => {
    let getSiteName = txt.replace(/abrir/g, "").split(" ").join("");
    let URL = `https://${getSiteName}.com/`;
    speechText.innerHTML = `Abrindo ${getSiteName}...`;
    IAVoice(speechText.textContent);

    if (getSiteName.includes("whatsapp") || getSiteName.includes("telegram")) {
        URL = `https://web.${getSiteName}.com/`;
    } else if (getSiteName.includes("chatgpt")) {
        URL = `https://${getSiteName.replace(/gpt/g, "").split(" ").join("")}.openai.com/`;
    }

    setTimeout(() => {
        window.open(URL);
        speechText.innerHTML = "";
    }, 2500);
};

const doOperations = (txt) => {
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
};

const searchThings = (txt) => {
    let getSearch = txt.replace(/pesquisar/g, "");

    if (getSearch.includes("sobre")) {
        getSearch = getSearch.replace(/sobre/g, "");
    }

    let URL = `https://google.com/search?q=${getSearch}`;
    speechText.innerHTML = `Pesquisando sobre ${getSearch}...`;
    IAVoice(speechText.textContent);

    setTimeout(() => {
        window.open(URL);
        speechText.innerHTML = "";
    }, 2500);
};

const userName = (txt) => {
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
    } else if (txt.includes("meu nome é")) {
        getName = txt
            .replace(/meu nome é/g, "")
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
};

const mimicUser = (txt) => {
    if (mimic) {
        if ((txt.includes("pare") && txt.includes("imitar")) || (txt.includes("para") && txt.includes("imitar"))) {
            mimic = false;
            speechText.innerHTML = "Ok, eu parei";
            IAVoice(speechText.textContent);
            return;
        }
        speechText.innerHTML = txt;
        IAVoice(speechText.textContent);
    } else {
        mimic = true;
        speechText.innerHTML = "Ok, vou te imitar";
        IAVoice(speechText.textContent);
        return;
    }
};
