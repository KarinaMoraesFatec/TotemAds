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

        // Adiciona imagem, nome, quantidade e descrição
        div.innerHTML = `
            <img class="opcao-imagem" src="${item.imagem}" alt="${item.nome}">
            <h3 class="opcao-titulo">${item.nome} <span style="font-weight:normal;">x${item.quantidade}</span></h3>
            <p class="opcao-descricao" style="font-size:1.7vh; color:#555; text-align:center;">${item.descricao || ''}</p>
        `;

        // Opcional: clique para editar/remover (adicione lógica se desejar)
        // div.onclick = function() { /* abrir modal de edição/remover */ };

        grid.appendChild(div);
    });
}

// Executa ao carregar a página RevisarPedido
document.addEventListener('DOMContentLoaded', function () {
    renderizarLanchesRevisao();
});

// Se quiser atualizar dinamicamente ao voltar para a tela, pode expor a função:
window.renderizarLanchesRevisao = renderizarLanchesRevisao;
