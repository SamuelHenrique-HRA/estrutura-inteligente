// ===============================
// ESTRUTURA INTELIGENTE DE ATENDIMENTO - MOTOR V3
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

    // Coleta de dados
    const nome = document.getElementById("nome").value.trim();
    const bairro = document.getElementById("bairro").value.trim();
    const equipamento = document.getElementById("equipamento").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const problema = document.getElementById("problema").value;
    const descricao = document.getElementById("descricao").value.trim();
    const urgencia = document.getElementById("urgencia").value;

    // Validação
    if (!nome || !bairro || !equipamento || !descricao) {
        alert("Preencha todos os campos obrigatórios.");
        return;
    }

    // Classificação automática
    let nivelPrioridade = "Atendimento Normal";

    if (urgencia === "Urgente") {
        nivelPrioridade = "Atendimento Prioritário";
    }

    if (urgencia === "Muito urgente") {
        nivelPrioridade = "Atendimento Imediato";
    }

    // Data e hora automática
    const agora = new Date();
    const dataHora = agora.toLocaleString("pt-BR");

    // Mensagem estruturada
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

function gerarDiagnostico(){

const equipamento = document.getElementById("equipamento").value;
const problema = document.getElementById("problema").value;

const box = document.getElementById("diagnosticoBox");
const texto = document.getElementById("diagnosticoTexto");

let diagnostico = "";

if(equipamento === "Celular"){

if(problema === "Tela quebrada"){
diagnostico = "Possível substituição do display. Esse tipo de reparo normalmente é resolvido com troca do conjunto frontal.";
}

if(problema === "Não carrega"){
diagnostico = "Possível falha no conector de carga, cabo ou bateria. Recomendado diagnóstico técnico presencial.";
}

if(problema === "Não liga"){
diagnostico = "Pode estar relacionado a bateria descarregada, falha na placa ou dano por queda.";
}

if(problema === "Molhou"){
diagnostico = "Equipamentos molhados precisam de limpeza técnica interna para evitar oxidação.";
}

if(problema === "Bateria descarregando rápido"){
diagnostico = "Provável desgaste da bateria. Pode ser necessário substituição.";
}

}

if(equipamento === "Notebook"){

if(problema === "Não liga"){
diagnostico = "Pode indicar falha na fonte, bateria ou placa mãe.";
}

if(problema === "Sem imagem"){
diagnostico = "Possível falha de memória, cabo de vídeo ou tela.";
}

if(problema === "Superaquecendo"){
diagnostico = "Normalmente causado por acúmulo de poeira ou pasta térmica desgastada.";
}

if(problema === "Muito lento"){
diagnostico = "Pode ser causado por excesso de programas, HD antigo ou necessidade de upgrade.";
}

if(problema === "Teclado não funciona"){
diagnostico = "Pode indicar falha no teclado interno ou cabo flat.";
}

}

if(diagnostico !== ""){

box.style.display = "block";
texto.innerText = diagnostico;

}

}

function atualizarProgresso(){

const equipamento = document.getElementById("equipamento").value;
const problema = document.getElementById("problema").value;

const barra = document.getElementById("progress");
const texto = document.getElementById("progressText");

let progresso = 10;

if(equipamento !== ""){
progresso = 40;
texto.innerText = "Etapa 2 de 3 — Análise do problema";
}

if(problema !== ""){
progresso = 75;
texto.innerText = "Etapa 3 de 3 — Envio da solicitação";
}

barra.style.width = progresso + "%";

}



