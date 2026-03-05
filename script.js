// ===============================
// ESTRUTURA INTELIGENTE DE ATENDIMENTO - MOTOR V4
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    inicializarSistema();

    const form = document.getElementById("formAtendimento");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            enviarAtendimento();
        });
    }

    const problema = document.getElementById("problema");

    if (problema) {
        problema.addEventListener("change", gerarDiagnostico);
    }

    atualizarBarra(1);

});

// ===============================
// INICIALIZAÇÃO
// ===============================

function inicializarSistema() {

    const numeroSalvo = localStorage.getItem("numeroWhatsApp");

    if (!numeroSalvo) {
        document.getElementById("configNumero").style.display = "block";
        document.getElementById("formContainer").style.display = "none";
    } else {
        document.getElementById("configNumero").style.display = "none";
        document.getElementById("formContainer").style.display = "block";
    }

}

// ===============================
// CONFIGURAÇÃO DO NÚMERO
// ===============================

function salvarNumero() {

    let numero = document.getElementById("numeroWhatsapp").value;

    numero = numero.replace(/\D/g, '');

    if (numero.length < 10 || numero.length > 11) {
        alert("Digite um número válido com DDD. Ex: 11999998888");
        return;
    }

    localStorage.setItem("numeroWhatsApp", numero);

    alert("Número configurado com sucesso!");
    location.reload();

}

// ===============================
// ENVIO DO FORMULÁRIO
// ===============================

function enviarAtendimento() {

    const numero = localStorage.getItem("numeroWhatsApp");

    if (!numero) {
        alert("Número de WhatsApp não configurado.");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const equipamento = document.getElementById("equipamento").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const problema = document.getElementById("problema").value;
    const descricao = document.getElementById("descricao").value.trim();
    const urgencia = document.getElementById("urgencia").value;

    if (!nome || !bairro || !equipamento || !descricao) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    let nivelPrioridade = "Atendimento Normal";

    if (urgencia === "Urgente") {
        nivelPrioridade = "Atendimento Prioritário";
    }

    if (urgencia === "Muito urgente") {
        nivelPrioridade = "Atendimento Imediato";
    }

    const agora = new Date();
    const dataHora = agora.toLocaleString("pt-BR");

const mensagem =
`
*NOVA SOLICITAÇÃO DE ATENDIMENTO*
━━━━━━━━━━━━━━━━━━━━━━━

*Data/Hora:* ${dataHora}

*Cliente:* ${nome}
*Localização:* ${bairro}

*Equipamento:* ${equipamento}
*Marca:* ${marca}
*Modelo:* ${modelo}

*Problema identificado:*
${problema}

*Descrição adicional:*
${descricao}

*Nível de Prioridade:* ${nivelPrioridade}

━━━━━━━━━━━━━━━━━━━━━━━
Solicitação organizada automaticamente pela
Estrutura Inteligente de Atendimento Digital.
`;

    const mensagemCodificada = encodeURIComponent(mensagem);

    const url = `https://wa.me/55${numero}?text=${mensagemCodificada}`;

    window.open(url, "_blank");

}

// ===============================
// ATUALIZA CAMPOS DINÂMICOS
// ===============================

function atualizarCampos() {

    const equipamento = document.getElementById("equipamento").value;

    const marcaSelect = document.getElementById("marca");
    const problemaSelect = document.getElementById("problema");

    marcaSelect.innerHTML = '<option value="">Marca</option>';
    problemaSelect.innerHTML = '<option value="">Problema principal</option>';

    let marcas = [];
    let problemas = [];

    if (equipamento === "Celular") {

        marcas = ["Apple", "Samsung", "Motorola", "Xiaomi"];

        problemas = [
            "Tela quebrada",
            "Não carrega",
            "Não liga",
            "Molhou",
            "Bateria descarregando rápido"
        ];

    }

    if (equipamento === "Notebook") {

        marcas = ["Dell", "HP", "Lenovo", "Asus"];

        problemas = [
            "Não liga",
            "Sem imagem",
            "Superaquecendo",
            "Muito lento",
            "Teclado não funciona"
        ];

    }

    if (equipamento === "Computador") {

        marcas = ["Dell", "HP", "Lenovo", "Asus"];

        problemas = [
            "Não liga",
            "Sem imagem",
            "Muito lento",
            "Reiniciando sozinho",
            "Erro no Windows"
        ];

    }

    if (equipamento === "TV") {

        marcas = ["LG", "Samsung", "Sony", "Philips"];

        problemas = [
            "Sem imagem",
            "Sem som",
            "Não liga",
            "Tela quebrada",
            "Manchas na tela"
        ];

    }

    if (equipamento === "Videogame") {

        marcas = ["Sony", "Microsoft", "Nintendo"];

        problemas = [
            "Não liga",
            "Superaquecendo",
            "Não lê disco",
            "Erro no sistema",
            "Controle não conecta"
        ];

    }

    marcas.forEach(marca => {

        const option = document.createElement("option");
        option.textContent = marca;
        marcaSelect.appendChild(option);

    });

    problemas.forEach(problema => {

        const option = document.createElement("option");
        option.textContent = problema;
        problemaSelect.appendChild(option);

    });

}

// ===============================
// DIAGNÓSTICO AUTOMÁTICO
// ===============================

function gerarDiagnostico(){

const equipamento = document.getElementById("equipamento").value;
const problema = document.getElementById("problema").value;

const box = document.getElementById("diagnosticoBox");
const texto = document.getElementById("diagnosticoTexto");

let diagnostico = "";

if(equipamento === "Celular"){

if(problema === "Tela quebrada"){
diagnostico = "Possível substituição do display.";
}

if(problema === "Não carrega"){
diagnostico = "Possível falha no conector de carga ou bateria.";
}

if(problema === "Não liga"){
diagnostico = "Pode estar relacionado à bateria ou placa.";
}

if(problema === "Molhou"){
diagnostico = "Equipamento pode precisar de limpeza técnica interna.";
}

if(problema === "Bateria descarregando rápido"){
diagnostico = "Provável desgaste da bateria.";
}

}

if(equipamento === "Notebook"){

if(problema === "Não liga"){
diagnostico = "Pode indicar falha na fonte ou placa mãe.";
}

if(problema === "Sem imagem"){
diagnostico = "Possível problema na memória ou tela.";
}

if(problema === "Superaquecendo"){
diagnostico = "Pode ser acúmulo de poeira ou pasta térmica.";
}

if(problema === "Muito lento"){
diagnostico = "Pode indicar HD antigo ou excesso de programas.";
}

if(problema === "Teclado não funciona"){
diagnostico = "Possível falha no teclado interno.";
}

}

if(diagnostico !== ""){

box.style.display = "block";
texto.innerText = diagnostico;

}

}

// ===============================
// BARRA DE PROGRESSO
// ===============================

function atualizarBarra(etapa){

const barra = document.getElementById("progress");
const texto = document.getElementById("progressText");

let progresso = 0;

if(etapa === 1){
progresso = 33;
texto.innerText = "Etapa 1 de 3 — Identificação";
}

if(etapa === 2){
progresso = 66;
texto.innerText = "Etapa 2 de 3 — Análise do problema";
}

if(etapa === 3){
progresso = 100;
texto.innerText = "Etapa 3 de 3 — Envio da solicitação";
}

barra.style.width = progresso + "%";

}

// ===============================
// CONTROLE DE ETAPAS
// ===============================

function proximaEtapa(atual){

document.getElementById("etapa"+atual).style.display = "none";
document.getElementById("etapa"+(atual+1)).style.display = "block";

atualizarBarra(atual+1);

}

function voltarEtapa(atual){

document.getElementById("etapa"+atual).style.display = "none";
document.getElementById("etapa"+(atual-1)).style.display = "block";

atualizarBarra(atual-1);

}
