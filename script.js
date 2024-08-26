// Classe Item
class Item {
    constructor(nome, preco, imagem) {
        this.nome = nome;
        this.preco = preco;
        this.imagem = imagem; // Adicionando imagem
    }
}

// Exemplo de cliente
const cliente = {
    id: 1,
    nome: "Caroline Nunes Carr",
    telefone: "1234-5678",
    endereco: "Rua A, S/N, Serrinha, Redenção - PA"
};

// Atualiza as informações do cliente na página
function atualizarInformacoesCliente() {
    if (document.getElementById("cliente-nome")) {
        document.getElementById("cliente-nome").innerText = cliente.nome;
        document.getElementById("cliente-telefone").innerText = cliente.telefone;
        document.getElementById("cliente-endereco").innerText = cliente.endereco;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    atualizarInformacoesCliente();
    if (document.getElementById("cart-items")) {
        atualizarCarrinho();
    }
});

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function adicionarAoCarrinho(nome, preco, imagem) {
    const item = new Item(nome, preco, imagem);
    carrinho.push(item);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarContadorCarrinho();
}

function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    atualizarCarrinho();
    atualizarContadorCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const cartItemsDiv = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart-message");
    const cartCount = document.getElementById("cart-count");

    if (!cartItemsDiv || !cartCount) return;

    cartItemsDiv.innerHTML = "";

    if (carrinho.length === 0) {
        emptyCartMessage.style.display = "block";
        cartCount.innerText = "0";
        return;
    } else {
        emptyCartMessage.style.display = "none";
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
            <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
            <div class="cart-item-info">
                <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
                <a href="#" class="btn" onclick="removerDoCarrinho(${index})">Remover</a>
            </div>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.preco;
    });

    document.getElementById("cart-total").innerText = total.toFixed(2);
    cartCount.innerText = carrinho.length;
}

// Atualiza o contador do carrinho
function atualizarContadorCarrinho() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = carrinho.length;
        cartCount.style.display = carrinho.length > 0 ? 'block' : 'none';
    }
}

// Verifica se o carrinho está vazio e redireciona se necessário
function verificarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Adicione itens ao carrinho antes de finalizar a compra.");
        window.location.href = "carrinho.html"; // Redireciona para a página do carrinho
    }
}

// Chama a função ao carregar a página de finalizar compra
if (window.location.pathname.includes("finalizar-compra.html")) {
    verificarCarrinho();
}
