const products = [
    { id: 1, name: "Product 1", description: "Advertising Product Photography", price: 250, image: "https://th.bing.com/th/id/OIP.LLs4MQaIdVfxZNfmk0YkQQHaH3?rs=1&pid=ImgDetMain/150" },
    { id: 2, name: "Product 2", description: "Why Product Images", price: 400, image: "https://th.bing.com/th/id/OIP.lTmSRLPfVUJxz76w1rT8eQHaEX?rs=1&pid=ImgDetMain/150" },
    { id: 3, name: "Product 3", description: "Pentax Wallpapers", price: 5000, image: "https://th.bing.com/th/id/OIP.RhkMz1exB7FfRaraOyLnMwHaEV?w=6000&h=3511&rs=1&pid=ImgDetMain/150" },
    { id: 4, name: "Product 4", description: "Advertising Product Photography", price: 250, image: "https://th.bing.com/th/id/OIP.LLs4MQaIdVfxZNfmk0YkQQHaH3?rs=1&pid=ImgDetMain/150" },
    { id: 5, name: "Product 5", description: "Why Product Images", price: 400, image: "https://th.bing.com/th/id/OIP.lTmSRLPfVUJxz76w1rT8eQHaEX?rs=1&pid=ImgDetMain/150" },
    { id: 6, name: "Product 6", description: "Pentax Wallpapers", price: 5000, image: "https://th.bing.com/th/id/OIP.RhkMz1exB7FfRaraOyLnMwHaEV?w=6000&h=3511&rs=1&pid=ImgDetMain/150" },
];

let cart = [];
let discount = 0; // To store the applied discount

// Render product list
function renderProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>$${product.price}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        
        productList.appendChild(productCard);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Update cart display and cart count
function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const discountedTotal = document.getElementById('discountedTotal');
    const cartItems = document.getElementById('cartItems');

    cartCount.textContent = cart.length;

    let total = 0;
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <p>Price: $${item.price} x ${item.quantity} = $${item.price * item.quantity}</p>
            <button onclick="changeQuantity(${item.id}, -1)">-</button>
            <button onclick="changeQuantity(${item.id}, 1)">+</button>
        `;
        cartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);

    // Calculate the discounted total
    const finalTotal = total - (total * discount);
    discountedTotal.textContent = `Discounted Total: $${finalTotal.toFixed(2)}`;
}

// Change quantity of an item in the cart
function changeQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
        }
    }
    updateCart();
}

// Clear the cart
function clearCart() {
    cart = [];
    updateCart();
}

// Show the cart modal
function showCart() {
    document.getElementById('cartModal').style.display = 'flex';
}

// Close the cart modal
function closeCart() {
    document.getElementById('cartModal').style.display = 'none';
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to the cart before checking out.");
        return;
    }

    let checkoutSummary = "Your Order Summary:\n\n";
    let total = 0;

    cart.forEach(item => {
        checkoutSummary += `${item.name} - $${item.price} x ${item.quantity} = $${item.price * item.quantity}\n`;
        total += item.price * item.quantity;
    });

    const finalTotal = total - (total * discount);
    checkoutSummary += `\nTotal: $${total.toFixed(2)}\nDiscounted Total: $${finalTotal.toFixed(2)}`;

    alert(checkoutSummary);

    clearCart();
}

// Promo code functionality
document.getElementById('applyPromoCodeBtn').addEventListener('click', function() {
    const promoCodeInput = document.getElementById('promoCodeInput').value.trim();
    const promoCodeMessage = document.getElementById('promoCodeMessage');

    if (promoCodeInput === 'ostad10') {
        discount = 0.10; // Apply 10% discount
        promoCodeMessage.textContent = 'Promo code applied! You saved 10%.';
        promoCodeMessage.style.color = 'green';
    } else if (promoCodeInput === 'ostad5') {
        discount = 0.05; // Apply 5% discount
        promoCodeMessage.textContent = 'Promo code applied! You saved 5%.';
        promoCodeMessage.style.color = 'green';
    } else {
        discount = 0; // Invalid promo code
        promoCodeMessage.textContent = 'Invalid promo code.';
        promoCodeMessage.style.color = 'red';
    }

    updateCart(); // Update cart with new total
});

// Event listeners
document.getElementById('cartBtn').addEventListener('click', showCart);
document.getElementById('closeCartBtn').addEventListener('click', closeCart);
document.getElementById('clearCartBtn').addEventListener('click', clearCart);
document.getElementById('checkoutBtn').addEventListener('click', checkout);

// Initialize
renderProductList();
