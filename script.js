// Load cart from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Sample product data
const products = [
    { name: "Laptop", price: 50000, image: "images/laptop.jpg" },
    { name: "Smartphone", price: 20000, image: "images/smartphone.jpg" },
    { name: "Headphones", price: 3000, image: "images/headphones.jpg" },
    { name: "Smartwatch", price: 8000, image: "images/smartwatch.jpg" },
    { name: "Tablet", price: 25000, image: "images/tablet.jpg" },
    { name: "Camera", price: 40000, image: "images/camera.jpg" },
    { name: "Gaming Console", price: 45000, image: "images/console.jpg" },
    { name: "Wireless Mouse", price: 1500, image: "images/mouse.jpg" }
];

// Function to display products dynamically
function displayProducts() {
    const productsContainer = document.getElementById("products-container");

    if (!productsContainer) {
        console.error("❌ ERROR: #products-container not found in HTML!");
        return;
    }

    productsContainer.innerHTML = ""; // Clear before adding

    products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" width="150">
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">
                Add to Cart
            </button>
        `;

        productsContainer.appendChild(productDiv);
    });

    // Attach event listeners to all add-to-cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            const name = this.getAttribute("data-name");
            const price = parseInt(this.getAttribute("data-price"), 10);
            addToCart(name, price);
        });
    });
}

// Function to add item to cart
function addToCart(name, price) {
    console.log("✅ addToCart() called for:", name, "Price:", price);
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Function to update cart display
function updateCart() {
    let cartList = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let cartCount = document.getElementById("cart-count");

    if (!cartList || !cartTotal || !cartCount) {
        console.warn("Cart elements not found on this page.");
        return;
    }

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ₹${item.price}  
        <button onclick="removeFromCart(${index})">❌ Remove</button>`;
        cartList.appendChild(li);
        total += item.price;
    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// Ensure products are displayed and cart is updated when the page loads
document.addEventListener("DOMContentLoaded", function () {
    displayProducts();
    updateCart();
});
