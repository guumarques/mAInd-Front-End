let opacidadeLogo = 1;
const bottomSend = document.querySelector('.Enviar');
let conversaIniciada = false;
let userId = null; // Para armazenar o ID do usuário
let conversas = [];

function pegarTextoInput() {
    let conteudoMensagem = document.querySelector('.input-mensagem');
    texto = conteudoMensagem.value;
    return texto;
}

function apagarInput() {
    document.getElementById('Input-Mensagem').value = '';
}

function EnviarMsg() {
    if (!conversaIniciada) {
        conversaIniciada = true;
        iniciarConversa();
    }

    let msg = pegarTextoInput();
    criarMensagemUsuario(msg);
    diminuirOpacidade();
    document.querySelector('.input-mensagem').focus();
}

document.getElementById('Input-Mensagem').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        EnviarMsg();
    }
});

bottomSend.addEventListener('click', () => {
    EnviarMsg();
});

// Add tag HTML
function criarMensagemUsuario(descricao) {
    var novoElemento = document.createElement("div");
    novoElemento.classList.add('Mensagem-usuario');
    novoElemento.innerHTML = `
        <div class="Mensagem-base">
            <div class="conteudo-mensagem"> ${descricao} </div>
        </div>
    `;

    var elementoPai = document.getElementById("Conteudo");
    elementoPai.appendChild(novoElemento);
    adicionarMensagem("Usuário", descricao.toLowerCase());
    apagarInput();
}

// Função para adicionar um atraso
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Função modificada para incluir um atraso de 3 segundos
async function criarMensagemIa(descricao) {
    var novoElemento = document.createElement("div");
    novoElemento.classList.add('Mensagem');
    novoElemento.innerHTML = `
        <div class="Mensagem-base Mensagem-ia">
            <div class="conteudo-mensagem">
                ${descricao}
            </div>
        </div>
    `;

    await sleep(1200);
    var elementoPai = document.getElementById("Conteudo");
    elementoPai.appendChild(novoElemento);
    adicionarMensagem("mAInd", descricao);
}

function diminuirOpacidade() {
    let elemento = document.getElementById('logo');
    document.getElementById('Conteudo').style.justifyContent = 'start';
    let intervalo = setInterval(function () {
        if (opacidadeLogo <= 0) {
            clearInterval(intervalo);
            elemento.remove();
        } else {
            opacidadeLogo -= 0.05;
            elemento.style.opacity = opacidadeLogo;
        }
    }, 50);
}

function adicionarMensagem(remetente, mensagem) {
    let novaMensagem = {
        remetente: remetente,
        mensagem: mensagem,
        timestamp: new Date().toISOString()
    };

    conversas.push(novaMensagem);
    if (remetente.includes("Usuário")) {
        resposta(mensagem);
    }
    const chatContainer = document.getElementById('conversas-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function resposta(respostaUsuario) {
    enviarResposta(respostaUsuario);
}