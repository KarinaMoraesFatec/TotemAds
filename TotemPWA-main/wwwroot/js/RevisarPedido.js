// Função para renderizar os itens do carrinho na tela RevisarPedido
function renderizarLanchesRevisao() {
    const carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const grid = document.querySelector('.opcao-grid');
    if (!grid) return;

    // Limpa o grid antes de renderizar
    grid.innerHTML = '';

    carrinhoItens.forEach((item, idx) => {
        // Cria uma div para cada item, com classe C1, C2, ...
        const div = document.createElement('div');
        div.className = `C${idx + 1}`;
        div.style.cursor = 'pointer';

        // Layout flex para alinhar conteúdo e botão excluir na lateral
        div.innerHTML = `
            <div style="display: flex; align-items: center; width: 100%; height: 100%;">
                <div class="c1" >
                    <img class="opcao-imagem" src="${item.imagem}" alt="${item.nome}">
                    <h3 class="opcao-titulo">${item.nome} <span style="font-weight:normal;">x${item.quantidade}</span></h3>
                    <p class="opcao-descricao" style="font-size:1.7vh; color:#555; text-align:center;">${item.descricao || ''}</p>
                </div>
                <button class="btn-excluir-revisao">Excluir</button>
            </div>
        `;

        // Botão excluir funcional
        div.querySelector('.btn-excluir-revisao').onclick = function(e) {
            e.stopPropagation();
            removerItemRevisao(item.id);
        };

        grid.appendChild(div);
    });
}

// Função para remover item do carrinho e atualizar a tela
function removerItemRevisao(id) {
    let carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    carrinhoItens = carrinhoItens.filter(item => item.id !== id);
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
    renderizarLanchesRevisao();

    // Se o carrinho ficou vazio, redireciona para tela2
    if (carrinhoItens.length === 0) {
        window.location.href = '/Home/Tela2';
    }
}

// Executa ao carregar a página RevisarPedido
document.addEventListener('DOMContentLoaded', function () {
    renderizarLanchesRevisao();
});

// Se quiser atualizar dinamicamente ao voltar para a tela, pode expor a função:
window.renderizarLanchesRevisao = renderizarLanchesRevisao;
