let cart = JSON.parse(localStorage.getItem('hydroCart')) || [];

const products = [
    { id: 1, name: "HDPE Pipe DN110 PN10", price: 4250, icon: "fas fa-water", desc: "High-density polyethylene pipe." },
    { id: 2, name: "Submersible pump 5.5kW", price: 38500, icon: "fas fa-pump-water", desc: "Stainless steel, max flow 35m³/h." },
    { id: 3, name: "Brass Gate Valve 2\"", price: 1850, icon: "fas fa-tools", desc: "PN16, industrial grade." },
    { id: 4, name: "Drip irrigation kit (1ha)", price: 18900, icon: "fas fa-seedling", desc: "Complete with drippers, connectors." },
    { id: 5, name: "Pressure reducing valve", price: 3200, icon: "fas fa-chart-line", desc: "Adjustable, 1½\"." },
    { id: 6, name: "Smart water meter", price: 12400, icon: "fas fa-microchip", desc: "IoT ready, remote reading." }
];

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;
    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-img"><i class="${p.icon}" style="font-size:3rem;"></i></div>
            <h4>${p.name}</h4>
            <p style="font-size:0.8rem;">${p.desc.substring(0,65)}</p>
            <div style="display:flex; justify-content:space-between; margin-top:12px;">
                <strong>${p.price.toLocaleString()} DZD</strong>
                <button class="btn-primary add-to-cart" data-id="${p.id}" style="padding:6px 16px;">Add</button>
            </div>
        `;
        grid.appendChild(card);
    });
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(i => i.id === id);
    if(existing) existing.quantity++;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

function updateQuantity(index, delta) {
    if(cart[index]) {
        cart[index].quantity += delta;
        if(cart[index].quantity <= 0) cart.splice(index,1);
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('hydroCart', JSON.stringify(cart));
}

function updateCartUI() {
    const container = document.getElementById('cartItemsList');
    const totalSpan = document.getElementById('cartTotal');
    if(!container) return;
    if(cart.length === 0) {
        container.innerHTML = '<p style="color:gray;">Cart is empty</p>';
        totalSpan.innerText = `Total: 0 DZD`;
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach((item, idx) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
            <div class="cart-item">
                <div><strong>${item.name}</strong><br>${item.price.toLocaleString()} DZD x ${item.quantity}</div>
                <div>
                    <button class="qty-up" data-idx="${idx}" style="background:#eef2f5; border:none; border-radius:30px; width:28px;">+</button>
                    <button class="qty-down" data-idx="${idx}" style="background:#eef2f5; border:none; border-radius:30px; width:28px;">-</button>
                    <button class="remove-item" data-idx="${idx}" style="background:none; border:none; color:#c00;"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    totalSpan.innerText = `Total: ${total.toLocaleString()} DZD`;
    document.querySelectorAll('.qty-up').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.idx), 1));
    });
    document.querySelectorAll('.qty-down').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(parseInt(btn.dataset.idx), -1));
    });
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.idx)));
    });
}

if(window.location.pathname.includes('shop.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        renderProducts();
        updateCartUI();
    });
}
