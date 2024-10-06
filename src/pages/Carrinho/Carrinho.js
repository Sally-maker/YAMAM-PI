let cart = JSON.parse(localStorage.getItem("cart")) || [];

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const NomeProduto = window.document.querySelector("#nomeProduto");
const preco = window.document.querySelector("#preco")

fetch(`http://localhost:8080/products/${id}`, {
    method: "GET",
})
    .then((res) => res.json())
    .then((data) => {
        NomeProduto.textContent = data.name;
        preco.innerHTML = `<p> Preço R$ ${data.price.toFixed(2)} </p>`;
        
        console.log("Nome do Produto:", data.name); // Debug
        console.log("Preço do Produto:", data.price); // Debug
        
        document.querySelector('.botaoComprar').onclick = () => {
            addToCart(data.name, data.price); // Adiciona ao carrinho
            window.location.replace('../Carrinho/Carrinho.html'); // Redireciona para o carrinho
        };
    });


    function addToCart(productName, productPrice) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find((item) => item.name === productName);
    
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name: productName, price: productPrice, quantity: 1 });
        }
    
        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Carrinho Atualizado:", localStorage.getItem("cart")); // Debug
        updateCartDisplay();
    }
    
function removeFromCart(productName) {
    cart = cart.filter((item) => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productName, quantity) {
    const product = cart.find((item) => item.name === productName);

    if (product) {
        product.quantity = quantity;

        if (product.quantity <= 0) {
            removeFromCart(productName);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cartItems");
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Carrinho vazio</p>";
        document.getElementById("subtotal").innerText = "0.00";
        return;
    }

    cart.forEach((item) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <span>${item.name}</span>
            <span>Preço: R$${item.price.toFixed(2)} x ${item.quantity}</span>
            <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
            <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
            <button onclick="removeFromCart('${item.name}')">Remover</button>
        `;
        cartItemsContainer.appendChild(productDiv);
    });

    updateSubtotal();
}

function updateSubtotal() {
    let subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const frete = parseFloat(document.getElementById("frete").value) || 0;
    subtotal += frete;
    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
}

// Atualiza a exibição do carrinho ao carregar a página
updateCartDisplay();
