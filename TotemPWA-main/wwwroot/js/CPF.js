document.addEventListener("DOMContentLoaded", () => {
    const cpfInput = document.getElementById("cpfInput");
    const proceedButton = document.getElementById("proceedButton");

    cpfInput.addEventListener("input", () => {
        let cpf = cpfInput.value.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        cpfInput.value = cpf;

        if (cpf.length === 14) {
            proceedButton.style.display = "block";
        } else {
            proceedButton.style.display = "none";
        }
    });
});