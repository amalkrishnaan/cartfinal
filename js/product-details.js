document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    if (productId) {
        fetchProductDetails(productId);
    }
});

async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

function displayProductDetails(product) {
    const productDetails = document.getElementById('product-details');
    const breadcrumbTitle = document.getElementById('product-title-breadcrumb');
    breadcrumbTitle.textContent = product.title;

    const offerPrice = calculateOfferPrice(product.price, product.discountPercentage);

    productDetails.innerHTML = `
        <div class="product-detail-card">
            <div class="card">
                <div class="card-body">
                    <div class="product-thumbnails">
                        ${product.images.map((image, index) => `
                            <img src="${image}" alt="${product.title} Thumbnail ${index + 1}" 
                            class="thumbnail-image" onclick="changeMainImage('${image}')">
                        `).join('')}
                    </div>
                    <div class="product-image">
                        <img id="mainImage" src="${product.thumbnail}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        <h2 class="card-title">${product.title}</h2>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
                        <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                        <p class="card-text"><strong>Stock:</strong> ${product.stock}</p>
                        <p class="card-text"><strong>Rating:</strong> ${product.rating} / 5</p>
                        <p class="card-text price">
                            <span class="offer-price">$${offerPrice}</span>
                            <span class="original-price">$${product.price}</span>
                        </p>
                        <button class="btn btn-primary add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);
}

function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageSrc;
}

function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Product added to cart');
    } else {
        alert('Product already in cart');
    }
}

function calculateOfferPrice(price, discountPercentage) {
    return (price - (price * discountPercentage / 100)).toFixed(2);
}
