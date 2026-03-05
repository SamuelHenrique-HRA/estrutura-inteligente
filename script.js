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




