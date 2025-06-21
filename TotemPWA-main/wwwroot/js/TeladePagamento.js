document.addEventListener('DOMContentLoaded', () => {
    const cartaoDiv = document.querySelector('.cartao');
    const pixDiv = document.querySelector('.pix');
    const dinheiroDiv = document.querySelector('.dinheiro');

    const opcoes = [cartaoDiv, pixDiv, dinheiroDiv];

    function selecionarOpcao(opcaoSelecionada) {
        opcoes.forEach(opcao => {
            if (opcao === opcaoSelecionada) {
                opcao.classList.add('selected');
            } else {
                opcao.classList.remove('selected');
            }
        });
    }

    cartaoDiv.addEventListener('click', () => {
        selecionarOpcao(cartaoDiv);
        window.location.href = 'cartao.cshtml'; // substitua pelo caminho correto
    });

    pixDiv.addEventListener('click', () => {
        selecionarOpcao(pixDiv);
        window.location.href = 'pix.cshtml'; // substitua pelo caminho correto
    });

    dinheiroDiv.addEventListener('click', () => {
        selecionarOpcao(dinheiroDiv);
        window.location.href = 'dinheiro.cshtml'; // substitua pelo caminho correto
    });
});
