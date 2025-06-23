document.addEventListener("DOMContentLoaded", () => {
    const cpfInput = document.getElementById("cpfInput");
    const proceedButton = document.getElementById("proceedButton");

    // Cria o elemento da mensagem de erro
    const erroMsg = document.createElement("p");
    erroMsg.id = "cpfError";
    erroMsg.style.color = "red";
    erroMsg.style.marginTop = "10px";
    cpfInput.parentNode.appendChild(erroMsg);

    cpfInput.addEventListener("input", () => {
        let cpf = cpfInput.value.replace(/\D/g, "");

        // Limita a 11 dígitos
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }

        // Aplica máscara: 000.000.000-00
        let cpfFormatado = cpf;
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d)/, "$1.$2");
        cpfFormatado = cpfFormatado.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpfInput.value = cpfFormatado;

        // Verifica se o CPF é válido
        if (cpf.length === 11) {
            if (validarCPF(cpf)) {
                proceedButton.style.display = "block";
                erroMsg.textContent = "";
            } else {
                proceedButton.style.display = "none";
                erroMsg.textContent = "CPF inválido ou inexistente.";
            }
        } else {
            proceedButton.style.display = "none";
            erroMsg.textContent = "";
        }
    });

    // Função para validar CPF com base no cálculo oficial
    function validarCPF(cpf) {
        if (/^(\d)\1+$/.test(cpf)) return false; // Verifica se todos os dígitos são iguais

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;

        return resto === parseInt(cpf.charAt(10));
    }
});
