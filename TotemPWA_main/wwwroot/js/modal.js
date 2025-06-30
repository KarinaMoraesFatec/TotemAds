let carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];

function salvarCarrinho() {
  localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
}

function abrirModalCarrinho() {
  const modal = document.getElementById('modalCarrinho');
  if (modal) {
    modal.classList.add('active');
    atualizarCarrinho();
    document.body.style.overflow = 'hidden';
  }
}

function fecharModalCarrinho() {
  const modal = document.getElementById('modalCarrinho');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function atualizarBotaoFinalizar() {
  const botao = document.getElementById('prosseguir');
  if (!botao) return;

  if (carrinhoItens.length > 0) {
    botao.classList.remove('disabled');
  } else {
    botao.classList.add('disabled');
  }
}

function atualizarCarrinho() {
  const container = document.querySelector('#modalCarrinho .modal-grid');
  const precoSpan = document.querySelector('.barra-inferior .preco span');
  if (!container || !precoSpan) return;

  if (carrinhoItens.length === 0) {
    container.innerHTML = `<div class="carrinho-vazio"><p class="carrinho-vazio-texto">Seu carrinho está vazio</p></div>`;
    precoSpan.textContent = 'R$ 0,00';
    salvarCarrinho();
    atualizarBotaoFinalizar();
    return;
  }

  let total = 0;
  container.innerHTML = carrinhoItens.map(item => {
    total += item.preco * item.quantidade;
    return `
      <div class="item-carrinho" data-id="${item.id}">
        <img class="img-carrinho" src="${item.imagem}" alt="${item.nome}">
        <div class="detalhes-item-carrinho">
          <h3 class="carrinho-titulo-lanche">${item.nome}</h3>
          <p class="preco-item">R$ ${item.preco.toFixed(2)}</p>
        </div>
        <div class="controles-item">
          <button class="botao-remove" onclick="removerItemCarrinho(${item.id})">-</button>
          <span class="quantidade-item">${item.quantidade}x</span>
          <button class="botao-adiciona" onclick="adicionarItemCarrinho(${item.id})">+</button>
          <button class="btn-remover-carrinho" onclick="removerTodoItem(${item.id})">x</button>
        </div>
      </div>`;
  }).join('');
  precoSpan.textContent = `R$ ${total.toFixed(2)}`;
  salvarCarrinho();
  atualizarBotaoFinalizar();
}

function adicionarAoCarrinho(id, nome, preco, imagem) {
  const item = carrinhoItens.find(i => i.id === id);
  if (item) item.quantidade++;
  else carrinhoItens.push({id, nome, preco, imagem, quantidade: 1});
  salvarCarrinho();
  atualizarCarrinho();
}

function adicionarItemCarrinho(id) { carrinhoItens.find(i => i.id === id).quantidade++, salvarCarrinho(), atualizarCarrinho(); }
function removerItemCarrinho(id) {
  const item = carrinhoItens.find(i => i.id === id);
  if (item) {
    if (item.quantidade > 1) item.quantidade--;
    else carrinhoItens = carrinhoItens.filter(i => i.id !== id);
    salvarCarrinho();
    atualizarCarrinho();
  }
}
function removerTodoItem(id) {
  carrinhoItens = carrinhoItens.filter(i => i.id !== id);
  salvarCarrinho();
  atualizarCarrinho();
}
function limparCarrinho() {
  carrinhoItens = [];
  salvarCarrinho();
  atualizarCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
  carrinhoItens = JSON.parse(localStorage.getItem('carrinhoItens')) || [];
  document.getElementById('botaoCarrinho').addEventListener('click', e => {
    e.preventDefault();
    abrirModalCarrinho();
  });
  document.querySelector('#modalCarrinho .fechar-modal').addEventListener('click', fecharModalCarrinho);
  document.getElementById('modalCarrinho').addEventListener('click', e => {
    if (e.target.id === 'modalCarrinho') fecharModalCarrinho();
  });

  document.querySelectorAll('.pedido-item').forEach((item, idx) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const nome = this.querySelector('.pedido-titulo').innerText;
      const precoText = this.querySelector('.pedido-preco').innerText.replace('R$', '').replace(',', '.');
      const imagem = this.querySelector('.pedido-imagem').getAttribute('src');
      adicionarAoCarrinho(idx + 1, nome, parseFloat(precoText), imagem);
      abrirModalCarrinho();
    });
  });

  atualizarCarrinho();
  atualizarBotaoFinalizar();
});
