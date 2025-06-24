document.addEventListener("DOMContentLoaded", () => {
    const cupomInput = document.getElementById("cupomInput");
    const proceedButton = document.getElementById("proceedButton");

    const erroMsg = document.createElement("p");
    erroMsg.id = "cupomError";
    erroMsg.style.color = "red";
    erroMsg.style.marginTop = "10px";
    cupomInput.parentNode.appendChild(erroMsg);

    // Força letras maiúsculas na digitação
    cupomInput.addEventListener("input", () => {
        cupomInput.value = cupomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
        validarCupom();
    });

    function validarCupom() {
        const valor = cupomInput.value;
        const letras = valor.replace(/[^A-Z]/g, "").length;
        const numeros = valor.replace(/[^0-9]/g, "").length;

        if (valor.length === 8 && letras === 4 && numeros === 4) {
            proceedButton.style.display = "block";
            erroMsg.textContent = "";
        } else {
            proceedButton.style.display = "none";
            erroMsg.textContent = "O cupom deve conter 4 letras e 4 números.";
        }
    }

    // Teclado Virtual
    document.querySelectorAll('.tecla').forEach(botao => {
        botao.addEventListener('click', () => {
            const valor = botao.textContent.toUpperCase();
            let texto = cupomInput.value.toUpperCase().replace(/[^A-Z0-9]/g, "");

            if (botao.classList.contains("apagar")) {
                texto = texto.slice(0, -1);
            } else if (botao.classList.contains("limpar")) {
                texto = "";
            } else if (texto.length < 8) {
                texto += valor;
            }

            cupomInput.value = texto;
            cupomInput.dispatchEvent(new Event("input"));
        });
    });
});
