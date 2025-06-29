// modal.js - Controle do modal do carrinho (versão corrigida)

// Variáveis globais
let carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
}

// Função para abrir o modal do carrinho
function abrirModalCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.classList.add('active');
        atualizarCarrinho();
        document.body.style.overflow = 'hidden';
    }
}

// Função para fechar o modal do carrinho
function fecharModalCarrinho() {
    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ✅ Atualiza o botão "Finalizar"
function atualizarBotaoFinalizar() {
    const botao = document.getElementById("prosseguir");
    if (!botao) return;

    if (carrinhoItens.length > 0) {
        botao.classList.remove("disabled");
        botao.setAttribute("href", "/Home/RevisarPedido");
    } else {
        botao.classList.add("disabled");
        botao.setAttribute("href", "#");
    }
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoContainer = document.querySelector('.modal-content .modal-grid');
    const totalElement = document.querySelector('.barra-inferior .preco span');
    const carrinhoVazio = document.querySelector('.carrinho-vazio');

    if (!carrinhoItens || carrinhoItens.length === 0) {
        if (carrinhoContainer) {
            carrinhoContainer.innerHTML = `
                <div class="carrinho-vazio">
                    <p class="carrinho-vazio-texto">Seu carrinho está vazio</p>
                </div>
            `;
        }
        if (totalElement) totalElement.textContent = 'R$ 0,00';
        atualizarBotaoFinalizar();
        return;
    }

    let total = 0;
    let htmlItens = '';

    carrinhoItens.forEach(item => {
        total += item.preco * item.quantidade;
        htmlItens += `
            <div class="item-carrinho" data-id="${item.id}">
                <div class="info-item">
                    <img class="img-carrinho" src="${item.imagem}" alt="${item.nome}">
                    <div class="detalhes-item-carrinho">
                        <h3 class="carrinho-titulo-lanche">${item.nome}</h3>
                        <p class="preco-item">R$ ${item.preco.toFixed(2)}</p>
                    </div>
                </div>
                <div class="controles-item">
                    <button class="botao-remove" onclick="removerItemCarrinho(${item.id})"><h2 class="dell">-</h2></button>
                    <span class="quantidade-item"><h2 class="TituloCarrinho">${item.quantidade}x</h2></span>
                    <button class="botao-adiciona" onclick="adicionarItemCarrinho(${item.id})"><h2 class="add">+</h2></button>
                    <button class="btn-remover-carrinho" onclick="removerTodoItem(${item.id})">
                        <h2 class="X">x</h2>
                    </button>
                </div>
            </div>
        `;
    });

    if (carrinhoContainer) carrinhoContainer.innerHTML = htmlItens;
    if (totalElement) totalElement.textContent = `R$ ${total.toFixed(2)}`;
    if (carrinhoVazio) carrinhoVazio.style.display = 'none';

    salvarCarrinho();
    atualizarBotaoFinalizar();
}

// Adicionar item ao carrinho
function adicionarAoCarrinho(id, nome, preco, imagem) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const itemExistente = carrinhoItens.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinhoItens.push({ id, nome, preco, imagem, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

// Adicionar quantidade
function adicionarItemCarrinho(id) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const item = carrinhoItens.find(item => item.id === id);
    if (item) {
        item.quantidade += 1;
        salvarCarrinho();
        atualizarCarrinho();
    }
}

// Remover quantidade
function removerItemCarrinho(id) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    const itemIndex = carrinhoItens.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        if (carrinhoItens[itemIndex].quantidade > 1) {
            carrinhoItens[itemIndex].quantidade -= 1;
        } else {
            carrinhoItens.splice(itemIndex, 1);
        }
        salvarCarrinho();
        atualizarCarrinho();
    }
}

// Remover item completo
function removerTodoItem(id) {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    carrinhoItens = carrinhoItens.filter(item => item.id !== id);
    salvarCarrinho();
    atualizarCarrinho();
}

// Limpar carrinho
function limparCarrinho() {
    carrinhoItens = [];
    atualizarCarrinho();
    localStorage.removeItem('carrinhoItens');
}

// DOM carregado
document.addEventListener('DOMContentLoaded', function () {
    localStorage.removeItem('carrinhoItens');
    carrinhoItens = [];

    const fecharBtn = document.querySelector('.fechar-modal');
    if (fecharBtn) {
        fecharBtn.addEventListener('click', fecharModalCarrinho);
    }

    const modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                fecharModalCarrinho();
            }
        });
    }

    document.querySelectorAll('.pedido-item').forEach(item => {
        item.addEventListener('click', function () {
            const id = parseInt(this.getAttribute('data-id'));
            abrirModalEditar(this);
        });
    });

    atualizarCarrinho();
    atualizarBotaoFinalizar();
});

// Atualizar carrinho externamente
window.addEventListener('atualizarCarrinho', function () {
    carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
    atualizarCarrinho();
});

// Expor para escopo global
window.abrirModalCarrinho = abrirModalCarrinho;
window.fecharModalCarrinho = fecharModalCarrinho;
window.adicionarAoCarrinho = adicionarAoCarrinho;
window.adicionarItemCarrinho = adicionarItemCarrinho;
window.removerItemCarrinho = removerItemCarrinho;
window.removerTodoItem = removerTodoItem;
window.limparCarrinho = limparCarrinho;
