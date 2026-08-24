/* ============================
   MENU MOBILE
============================ */

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", () => {
    menu.classList.toggle("ativo");

    if (menu.classList.contains("ativo")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


/* Fecha o menu ao clicar */

document.querySelectorAll("#menu a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("ativo");

        menuBtn.textContent = "☰";

    });

});


/* ============================
   BOTÃO VOLTAR AO TOPO
============================ */

const topo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topo.classList.add("aparecer");
    } else {
        topo.classList.remove("aparecer");
    }

});


topo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ============================
   QUIZ
============================ */

const perguntas = [

    {
        pergunta:
            "Em qual data é celebrado o Dia da Consciência Negra?",

        respostas: [
            "7 de setembro",
            "20 de novembro",
            "15 de novembro",
            "13 de maio"
        ],

        correta: 1
    },


    {
        pergunta:
            "Quem foi Zumbi dos Palmares?",

        respostas: [
            "Um escritor português",
            "Um cientista",
            "Um líder do Quilombo dos Palmares",
            "Um presidente"
        ],

        correta: 2
    },


    {
        pergunta:
            "Qual destas manifestações possui forte influência africana?",

        respostas: [
            "Capoeira",
            "Tênis",
            "Hóquei",
            "Esgrima"
        ],

        correta: 0
    },


    {
        pergunta:
            "Em que ano a escravidão foi oficialmente abolida no Brasil?",

        respostas: [
            "1822",
            "1888",
            "1900",
            "1964"
        ],

        correta: 1
    },


    {
        pergunta:
            "Qual é um dos objetivos da Consciência Negra?",

        respostas: [
            "Promover desigualdade",
            "Apagar culturas",
            "Valorizar a história e combater o racismo",
            "Separar as pessoas"
        ],

        correta: 2
    }

];


let perguntaAtual = 0;
let pontos = 0;


const pergunta = document.getElementById("pergunta");
const respostas = document.getElementById("respostas");

const numeroPergunta =
    document.getElementById("numeroPergunta");

const progresso =
    document.getElementById("progresso");

const resultado =
    document.getElementById("resultado");

const pontuacao =
    document.getElementById("pontuacao");

const reiniciar =
    document.getElementById("reiniciar");


/* ============================
   MOSTRAR PERGUNTA
============================ */

function mostrarPergunta() {

    const atual = perguntas[perguntaAtual];

    numeroPergunta.textContent =
        `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    pergunta.textContent = atual.pergunta;

    progresso.style.width =
        `${((perguntaAtual + 1) / perguntas.length) * 100}%`;

    respostas.innerHTML = "";


    atual.respostas.forEach((resposta, indice) => {

        const botao = document.createElement("button");

        botao.classList.add("resposta");

        botao.textContent = resposta;

        botao.addEventListener("click", () => {

            verificarResposta(indice);

        });

        respostas.appendChild(botao);

    });

}


/* ============================
   VERIFICAR RESPOSTA
============================ */

function verificarResposta(indiceEscolhido) {

    const atual = perguntas[perguntaAtual];

    const botoes =
        document.querySelectorAll(".resposta");


    botoes.forEach(botao => {
        botao.disabled = true;
    });


    if (indiceEscolhido === atual.correta) {

        botoes[indiceEscolhido]
            .classList.add("certa");

        pontos++;

    } else {

        botoes[indiceEscolhido]
            .classList.add("errada");

        botoes[atual.correta]
            .classList.add("certa");

    }


    setTimeout(() => {

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {

            mostrarPergunta();

        } else {

            mostrarResultado();

        }

    }, 900);

}


/* ============================
   RESULTADO
============================ */

function mostrarResultado() {

    document.getElementById("pergunta").style.display = "none";

    respostas.style.display = "none";

    numeroPergunta.style.display = "none";

    resultado.classList.remove("oculto");

    pontuacao.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas.`;

}


/* ============================
   REINICIAR QUIZ
============================ */

reiniciar.addEventListener("click", () => {

    perguntaAtual = 0;
    pontos = 0;

    document.getElementById("pergunta").style.display = "block";

    respostas.style.display = "grid";

    numeroPergunta.style.display = "inline";

    resultado.classList.add("oculto");

    mostrarPergunta();

});


/* Iniciar */

mostrarPergunta();