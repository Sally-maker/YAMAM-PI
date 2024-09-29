let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, productPrice) {
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function updateQuantity(productName, quantity) {
    const product = cart.find(item => item.name === productName);

    if (product) {
        product.quantity = quantity;

        if (product.quantity === 0) {
            removeFromCart(productName);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Carrinho vazio</p>';
        document.getElementById('subtotal').innerText = '0';
        return;
    }

    cart.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${item.name}</span>
            <span>Preço: $${item.price} x ${item.quantity}</span>
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
    const frete = parseFloat(document.getElementById('frete').value) || 0;
    subtotal += frete;
    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
}

// Atualiza a exibição do carrinho ao carregar a página
updateCartDisplay();