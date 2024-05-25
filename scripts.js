document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartCount = document.getElementById("cart-count");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalNavbar = document.getElementById("cart-total-navbar");
    const cartDropdown = document.getElementById("cart-dropdown");
    const iconCart = document.getElementById("cart-button");

    let cart = [];
    let totalPrice = 0;

    // Function to update the cart count
    function updateCartCount() {
        cartCount.textContent = cart.length;
    }

    // Function to display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = "";
        totalPrice = 0;
        cart.forEach(item => {
            const itemDiv = document.createElement("div");
            itemDiv.classList.add("cart-item");
            
            const itemImg = document.createElement("img");
            itemImg.src = item.image;
            itemImg.alt = item.name;
            itemImg.classList.add("cart-item-img");

            const itemInfo = document.createElement("div");
            itemInfo.classList.add("cart-item-info");

            const itemName = document.createElement("div");
            itemName.textContent = item.name;
            itemName.classList.add("cart-item-name");

            const itemPrice = document.createElement("div");
            itemPrice.textContent = `$${item.price.toFixed(2)}`;
            itemPrice.classList.add("cart-item-price");

            itemInfo.appendChild(itemName);
            itemInfo.appendChild(itemPrice);
            itemDiv.appendChild(itemImg);
            itemDiv.appendChild(itemInfo);
            cartItemsContainer.appendChild(itemDiv);

            totalPrice += item.price;
        });
        cartTotalNavbar.textContent = `Total: $${totalPrice.toFixed(2)}`;
        document.getElementById("cart-total").textContent = totalPrice.toFixed(2);
    }

    // Function to handle adding items to cart
    function addToCart(name, price, image) {
        cart.push({ name, price, image });
        updateCartCount();
        displayCartItems();
    }

    // Event listener for Add to Cart buttons
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function() {
            const parentCard = this.closest(".card");
            const itemName = parentCard.dataset.name;
            const itemPrice = parseFloat(parentCard.dataset.price);
            const itemImage = parentCard.querySelector("img").src;
            addToCart(itemName, itemPrice, itemImage);
        });
    });

    // Event listener for hovering over the cart icon
    iconCart.addEventListener("mouseenter", function() {
        cartDropdown.classList.add("show");
    });

    // Event listener for leaving the cart icon
    iconCart.addEventListener("mouseleave", function() {
        cartDropdown.classList.remove("show");
    });
});
