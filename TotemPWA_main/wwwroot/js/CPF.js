document.addEventListener("DOMContentLoaded", () => {
    const cpfInput = document.getElementById("cpfInput");
    const proceedButton = document.getElementById("proceedButton");

    cpfInput.addEventListener("input", () => {
        let cpf = cpfInput.value.replace(/\D/g, "");

        // Limita a 11 dígitos numéricos
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }

        // Aplica máscara: 000.000.000-00
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpfInput.value = cpf;

        // Mostra o botão apenas quando CPF completo
        if (cpf.length === 14) {
            proceedButton.style.display = "block";
        } else {
            proceedButton.style.display = "none";
        }
    });
});
