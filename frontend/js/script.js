const apiUrl = 'http://localhost:5000/api';;
let selectedProductId = null;
let selectedProviderId = null;

// Funciones para manejar Productos
async function getProducts() {
    const res = await fetch(`${apiUrl}/products`);
    const products = await res.json();
    renderProducts(products);
}

function renderProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${product.name} - $${product.price} - Stock: ${product.stock}
            <button class="edit-btn" onclick="editProduct('${product._id}')">Editar</button>
            <button class="delete-btn" onclick="deleteProduct('${product._id}')">Eliminar</button>
        `;
        productList.appendChild(li);
    });
}

async function createProduct(product) {
    await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    getProducts();
}

async function updateProduct(productId, product) {
    await fetch(`${apiUrl}/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    getProducts();
}

async function deleteProduct(productId) {
    await fetch(`${apiUrl}/products/${productId}`, { method: 'DELETE' });
    getProducts();
}

// Funciones para manejar Proveedores
async function getProviders() {
    const res = await fetch(`${apiUrl}/providers`);
    const providers = await res.json();
    renderProviders(providers);
}

function renderProviders(providers) {
    const providerList = document.getElementById('providerList');
    providerList.innerHTML = '';
    providers.forEach(provider => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${provider.name} - ${provider.contact}
            <button class="edit-btn" onclick="editProvider('${provider._id}')">Editar</button>
            <button class="delete-btn" onclick="deleteProvider('${provider._id}')">Eliminar</button>
        `;
        providerList.appendChild(li);
    });
}

async function createProvider(provider) {
    await fetch(`${apiUrl}/providers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(provider)
    });
    getProviders();
}

async function updateProvider(providerId, provider) {
    await fetch(`${apiUrl}/providers/${providerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(provider)
    });
    getProviders();
}

async function deleteProvider(providerId) {
    await fetch(`${apiUrl}/providers/${providerId}`, { method: 'DELETE' });
    getProviders();
}

// Formularios y Eventos
document.getElementById('productForm').onsubmit = (e) => {
    e.preventDefault();
    const product = {
        name: document.getElementById('productName').value,
        price: document.getElementById('productPrice').value,
        stock: document.getElementById('productStock').value
    };
    if (selectedProductId) {
        updateProduct(selectedProductId, product);
        selectedProductId = null;
    } else {
        createProduct(product);
    }
    document.getElementById('productForm').reset();
};

document.getElementById('providerForm').onsubmit = (e) => {
    e.preventDefault();
    const provider = {
        name: document.getElementById('providerName').value,
        contact: document.getElementById('providerContact').value
    };
    if (selectedProviderId) {
        updateProvider(selectedProviderId, provider);
        selectedProviderId = null;
    } else {
        createProvider(provider);
    }
    document.getElementById('providerForm').reset();
};

function editProduct(productId) {
    selectedProductId = productId;
    const product = document.querySelector(`#productList li button[onclick="editProduct('${productId}')"]`).parentNode;
    document.getElementById('productName').value = product.childNodes[0].nodeValue.trim();
}

function editProvider(providerId) {
    selectedProviderId = providerId;
    const provider = document.querySelector(`#providerList li button[onclick="editProvider('${providerId}')"]`).parentNode;
    document.getElementById('providerName').value = provider.childNodes[0].nodeValue.trim();
}

// Inicializar
getProducts();
getProviders();
