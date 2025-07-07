
    function addToCart(slug, name, price) {
        // Aqui você pode salvar no localStorage ou enviar para o servidor
        console.log(`Adicionando ao carrinho: ${name} (${slug}) por R$ ${price}`);

        // Exemplo: adiciona no localStorage
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // verifica se já existe o item no carrinho
        const existing = cart.find(item => item.slug === slug);
        if (existing) {
            existing.qty++;
        } else {
            cart.push({ slug, name, price, qty: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Atualiza ícone do carrinho ou dá feedback ao usuário
        alert(`${name} adicionado ao carrinho!`);
    }

    function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = total;
}

// sempre que a página carrega
updateCartCount();

const cart = JSON.parse(localStorage.getItem('cart') || '[]');
console.log(cart);

