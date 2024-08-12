document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productDetailsContainer = document.getElementById('product-details');
    const productTitleBreadcrumb = document.getElementById('product-title-breadcrumb');

    // Fetch the product details from the API
    fetch(`https://dummyjson.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            productTitleBreadcrumb.textContent = product.title;

            // Main image
            let mainImage = product.images[0];

            // Thumbnails
            const thumbnails = product.images.map((image, index) => `
                <img src="${image}" alt="${product.title}" class="thumbnail-image ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${image}', this)">
            `).join('');

            productDetailsContainer.innerHTML = `
                <div class="product-detail-card">
                    <div class="product-image-container">
                        <div class="thumbnails">
                            ${thumbnails}
                        </div>
                        <div class="main-image">
                            <img id="main-product-image" src="${mainImage}" alt="${product.title}">
                        </div>
                    </div>
                    <div class="product-info">
                        <h2>${product.title}</h2>
                        <p>${product.description}</p>
                        <p class="price">$${product.price}</p>
                        <button  class="add-to-cart-btn" onclick="addToCart(${product.id})"><a href="./cart.html">Add to cart</a></button>
                    </div>
                </div>
            `;
        });
});

function changeMainImage(imageSrc, thumbnailElement) {
    document.getElementById('main-product-image').src = imageSrc;

    document.querySelectorAll('.thumbnail-image').forEach(thumbnail => {
        thumbnail.classList.remove('active');
    });

    thumbnailElement.classList.add('active');
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}
