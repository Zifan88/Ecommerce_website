
const products = [
    {
        id: 1,
        name: "Classic Oversized Hoodie",
        category: "Men",
        price: 6100,
        rating: 4.8,
        badge: "Best Seller",
        image: "assets/product-hoodie.png",
        description:
            "A relaxed oversized hoodie designed for everyday comfort. Made with soft premium cotton and a clean modern silhouette."
    },

    {
        id: 2,
        name: "Minimal Linen Shirt",
        category: "Men",
        price: 5500,
        rating: 4.6,
        badge: "New",
        image: "assets/product-linen-shirt.png",
        description:
            "A lightweight linen shirt with a relaxed fit. Perfect for casual days, summer evenings and effortless styling."
    },

    {
        id: 3,
        name: "Essential Cotton Tee",
        category: "Men",
        price: 3000,
        rating: 4.7,
        badge: "",
        image: "assets/product-cotton-tee.png",
        description:
            "A timeless cotton t-shirt designed with a comfortable fit and premium everyday fabric."
    },

    {
        id: 4,
        name: "Structured Leather Jacket",
        category: "Women",
        price: 11000,
        rating: 4.9,
        badge: "Premium",
        image: "assets/product-blazer.png",
        description:
            "A refined leather jacket with a timeless silhouette, designed to add a polished edge to everyday outfits."
    },

    {
        id: 5,
        name: "Satin Evening Dress",
        category: "Women",
        price: 9800,
        rating: 4.8,
        badge: "New",
        image: "assets/product-evening-dress.png",
        description:
            "A sophisticated satin dress designed for elegant evenings and special occasions."
    },

    {
        id: 6,
        name: "Relaxed Knit Poncho",
        category: "Women",
        price: 7300,
        rating: 4.5,
        badge: "",
        image: "assets/product-knit-sweater.png",
        description:
            "A soft, relaxed knit poncho made for comfortable layering throughout the season."
    },

    {
        id: 7,
        name: "Urban Runner Sneakers",
        category: "Shoes",
        price: 8500,
        rating: 4.9,
        badge: "Best Seller",
        image: "assets/product-runner-sneakers.png",
        description:
            "Lightweight everyday sneakers with a modern silhouette and cushioned comfort."
    },

    {
        id: 8,
        name: "Classic Leather Sneakers",
        category: "Shoes",
        price: 10400,
        rating: 4.7,
        badge: "",
        image: "assets/product-leather-sneakers.png",
        description:
            "Minimal leather sneakers designed to work with both casual and smart-casual outfits."
    },

    {
        id: 9,
        name: "Everyday Leather Bag",
        category: "Accessories",
        price: 7900,
        rating: 4.8,
        badge: "Popular",
        image: "assets/product-leather-bag.png",
        description:
            "A practical everyday leather bag with enough room for your daily essentials."
    },

    {
        id: 11,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 4300,
        rating: 4.6,
        badge: "",
        image: "assets/product-sunglasses.png",
        description:
            "Classic sunglasses with a timeless frame designed for everyday wear."
    },

    {
        id: 12,
        name: "Premium Crossbody Bag",
        category: "Accessories",
        price: 9100,
        rating: 4.7,
        badge: "New",
        image: "assets/product-crossbody-bag.png",
        description:
            "A versatile crossbody bag combining practical storage with a refined minimalist look."
    }
];




let cart = JSON.parse(localStorage.getItem("lumoraCart")) || [];

let wishlist = JSON.parse(localStorage.getItem("lumoraWishlist")) || [];

let currentCategory = "All";

let currentSearch = "";




const productGrid = document.getElementById("productGrid");

const noProducts = document.getElementById("noProducts");

const cartSidebar = document.getElementById("cartSidebar");

const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");

const emptyCart = document.getElementById("emptyCart");

const cartTotal = document.getElementById("cartTotal");

const cartCount = document.getElementById("cartCount");

const wishlistCount = document.getElementById("wishlistCount");

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const productModal = document.getElementById("productModal");

const productModalContent =
    document.getElementById("productModalContent");

const paymentMethodOverlay =
    document.getElementById("paymentMethodOverlay");

const paymentMethodForm =
    document.getElementById("paymentMethodForm");

const orderSummaryOverlay =
    document.getElementById("orderSummaryOverlay");

const orderSummaryItems =
    document.getElementById("orderSummaryItems");

const orderSummaryTotal =
    document.getElementById("orderSummaryTotal");

const orderSummaryPayment =
    document.getElementById("orderSummaryPayment");




function formatPrice(price) {

    return `৳${price.toLocaleString("en-BD")}`;

}




function createStars(rating) {

    const fullStars = Math.round(rating);

    let stars = "";

    for (let i = 1; i <= 5; i++) {

        if (i <= fullStars) {

            stars += '<i class="fa-solid fa-star"></i>';

        } else {

            stars += '<i class="fa-regular fa-star"></i>';

        }

    }

    return stars;

}




function renderProducts() {

    let filteredProducts = [...products];


    /* CATEGORY FILTER */

    if (currentCategory !== "All") {

        filteredProducts = filteredProducts.filter(
            product => product.category === currentCategory
        );

    }


   

    if (currentSearch.trim() !== "") {

        const searchTerm = currentSearch.toLowerCase();

        filteredProducts = filteredProducts.filter(product => {

            return (
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm)
            );

        });

    }



    const sortValue =
        document.getElementById("sortSelect").value;


    if (sortValue === "low") {

        filteredProducts.sort(
            (a, b) => a.price - b.price
        );

    }


    if (sortValue === "high") {

        filteredProducts.sort(
            (a, b) => b.price - a.price
        );

    }


    if (sortValue === "rating") {

        filteredProducts.sort(
            (a, b) => b.rating - a.rating
        );

    }


    /* EMPTY RESULT */

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = "";

        noProducts.style.display = "block";

        return;

    }


    noProducts.style.display = "none";




    productGrid.innerHTML = filteredProducts.map(product => {

        const isWishlisted =
            wishlist.includes(product.id);


        return `

            <article
                class="product-card"
                data-id="${product.id}"
            >

                <div class="product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >

                    ${
                        product.badge
                            ? `
                                <span class="product-badge">
                                    ${product.badge}
                                </span>
                              `
                            : ""
                    }


                    <button
                        class="wishlist-product ${
                            isWishlisted ? "active" : ""
                        }"
                        data-wishlist="${product.id}"
                        aria-label="Add to wishlist"
                    >

                        <i class="${
                            isWishlisted
                                ? "fa-solid"
                                : "fa-regular"
                        } fa-heart"></i>

                    </button>

                </div>


                <div class="product-info">

                    <p class="product-category">
                        ${product.category}
                    </p>

                    <h3 class="product-name">
                        ${product.name}
                    </h3>

                    <div class="product-rating">

                        ${createStars(product.rating)}

                    </div>


                    <div class="product-bottom">

                        <span class="product-price">
                            ${formatPrice(product.price)}
                        </span>

                        <button
                            class="add-cart-btn"
                            data-cart="${product.id}"
                        >
                            Add to Cart
                        </button>

                    </div>

                </div>

            </article>

        `;

    }).join("");

}




function addToCart(productId) {

    const existingProduct =
        cart.find(item => item.id === productId);


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }


    saveCart();

    updateCartUI();

    showToast("Product added to your bag");

}



function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    updateCartUI();

}




function changeQuantity(productId, change) {

    const item =
        cart.find(item => item.id === productId);


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }


    saveCart();

    updateCartUI();

}



function saveCart() {

    localStorage.setItem(
        "lumoraCart",
        JSON.stringify(cart)
    );

}



function updateCartUI() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent = totalItems;


    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display = "block";

        cartTotal.textContent = formatPrice(0);

        return;

    }


    emptyCart.style.display = "none";


    let total = 0;


    cartItems.innerHTML = cart.map(item => {

        const product =
            products.find(
                product => product.id === item.id
            );


        if (!product) return "";


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        return `

            <div class="cart-item">

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div>

                    <h4 class="cart-item-name">
                        ${product.name}
                    </h4>

                    <p class="cart-item-price">
                        ${formatPrice(product.price)}
                    </p>


                    <div class="quantity-controls">

                        <button
                            data-decrease="${product.id}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            data-increase="${product.id}"
                        >
                            +
                        </button>


                        <button
                            class="remove-item"
                            data-remove="${product.id}"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    }).join("");


    cartTotal.textContent =
        formatPrice(total);

}




function toggleWishlist(productId) {

    if (wishlist.includes(productId)) {

        wishlist =
            wishlist.filter(
                id => id !== productId
            );

        showToast("Removed from wishlist");

    } else {

        wishlist.push(productId);

        showToast("Added to wishlist");

    }


    localStorage.setItem(
        "lumoraWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    renderProducts();

}




function updateWishlistCount() {

    wishlistCount.textContent =
        wishlist.length;

}



function openCart() {

    cartSidebar.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("no-scroll");

}



function closeCart() {

    cartSidebar.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("no-scroll");

}

function openPaymentMethod() {

    paymentMethodForm.reset();
    paymentMethodOverlay.classList.add("active");
    paymentMethodOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

}

function closePaymentMethod(returnToCart = false) {

    paymentMethodOverlay.classList.remove("active");
    paymentMethodOverlay.setAttribute("aria-hidden", "true");

    if (returnToCart) {

        openCart();

        return;

    }

    document.body.classList.remove("no-scroll");

}

function showOrderSummary(order) {

    orderSummaryItems.innerHTML = order.items.map(item => `
        <div class="order-summary-item">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
        </div>
    `).join("");

    orderSummaryTotal.textContent = formatPrice(order.total);
    orderSummaryPayment.textContent = order.paymentMethod;
    orderSummaryOverlay.classList.add("active");
    orderSummaryOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

}

function closeOrderSummary() {

    orderSummaryOverlay.classList.remove("active");
    orderSummaryOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");

}




function openProductModal(productId) {

    const product =
        products.find(
            product => product.id === productId
        );


    if (!product) return;


    productModalContent.innerHTML = `

        <div class="modal-product-image">

            <img
                src="${product.image}"
                alt="${product.name}"
            >

        </div>


        <div class="modal-product-info">

            <p class="product-category">
                ${product.category}
            </p>

            <h2>
                ${product.name}
            </h2>

            <div class="product-rating">

                ${createStars(product.rating)}

            </div>

            <div class="modal-price">

                ${formatPrice(product.price)}

            </div>

            <p class="modal-description">

                ${product.description}

            </p>


            <p class="size-title">
                Select Size
            </p>


            <div class="size-options">

                <button class="size-option">
                    S
                </button>

                <button class="size-option active">
                    M
                </button>

                <button class="size-option">
                    L
                </button>

                <button class="size-option">
                    XL
                </button>

            </div>


            <button
                class="btn btn-dark modal-add-cart"
                data-modal-cart="${product.id}"
            >

                Add to Cart

                <i class="fa-solid fa-bag-shopping"></i>

            </button>

        </div>

    `;


    productModal.classList.add("active");

    document.body.classList.add("no-scroll");

}



function closeProductModal() {

    productModal.classList.remove("active");

    document.body.classList.remove("no-scroll");

}




let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}





productGrid.addEventListener("click", event => {



    const cartButton =
        event.target.closest("[data-cart]");


    if (cartButton) {

        const productId =
            Number(cartButton.dataset.cart);

        addToCart(productId);

        return;

    }


    /* WISHLIST */

    const wishlistButton =
        event.target.closest("[data-wishlist]");


    if (wishlistButton) {

        const productId =
            Number(wishlistButton.dataset.wishlist);

        toggleWishlist(productId);

        return;

    }


    /* PRODUCT DETAILS */

    const productCard =
        event.target.closest(".product-card");


    if (productCard) {

        const productId =
            Number(productCard.dataset.id);

        openProductModal(productId);

    }

});



cartItems.addEventListener("click", event => {


    const increaseButton =
        event.target.closest("[data-increase]");


    if (increaseButton) {

        changeQuantity(
            Number(increaseButton.dataset.increase),
            1
        );

        return;

    }


    const decreaseButton =
        event.target.closest("[data-decrease]");


    if (decreaseButton) {

        changeQuantity(
            Number(decreaseButton.dataset.decrease),
            -1
        );

        return;

    }


    const removeButton =
        event.target.closest("[data-remove]");


    if (removeButton) {

        removeFromCart(
            Number(removeButton.dataset.remove)
        );

    }

});




document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".filter-btn")
                .forEach(btn =>
                    btn.classList.remove("active")
                );


            button.classList.add("active");


            currentCategory =
                button.dataset.filter;


            renderProducts();

        });

    });


document
    .getElementById("sortSelect")
    .addEventListener("change", renderProducts);




const searchBtn =
    document.getElementById("searchBtn");

const searchOverlay =
    document.getElementById("searchOverlay");

const closeSearch =
    document.getElementById("closeSearch");

const searchInput =
    document.getElementById("searchInput");


searchBtn.addEventListener("click", () => {

    searchOverlay.classList.add("active");

    searchInput.focus();

});


closeSearch.addEventListener("click", () => {

    searchOverlay.classList.remove("active");

});


searchOverlay.addEventListener("click", event => {

    if (event.target === searchOverlay) {

        searchOverlay.classList.remove("active");

    }

});


searchInput.addEventListener("input", event => {

    currentSearch =
        event.target.value;

    renderProducts();

});



document
    .getElementById("cartBtn")
    .addEventListener("click", openCart);


document
    .getElementById("closeCart")
    .addEventListener("click", closeCart);

document
    .getElementById("orderSummaryClose")
    .addEventListener("click", closeOrderSummary);

document
    .getElementById("paymentMethodClose")
    .addEventListener("click", () => closePaymentMethod(true));

document
    .getElementById("paymentMethodCancel")
    .addEventListener("click", () => closePaymentMethod(true));

paymentMethodOverlay.addEventListener("click", event => {

    if (event.target === paymentMethodOverlay) {

        closePaymentMethod(true);

    }

});

orderSummaryOverlay.addEventListener("click", event => {

    if (event.target === orderSummaryOverlay) {

        closeOrderSummary();

    }

});


cartOverlay.addEventListener("click", closeCart);



document
    .getElementById("modalClose")
    .addEventListener(
        "click",
        closeProductModal
    );


productModal.addEventListener("click", event => {

    if (event.target === productModal) {

        closeProductModal();

    }


    const sizeButton =
        event.target.closest(".size-option");


    if (sizeButton) {

        document
            .querySelectorAll(".size-option")
            .forEach(button =>
                button.classList.remove("active")
            );


        sizeButton.classList.add("active");

    }


    const modalCartButton =
        event.target.closest("[data-modal-cart]");


    if (modalCartButton) {

        const productId =
            Number(
                modalCartButton.dataset.modalCart
            );


        addToCart(productId);

        closeProductModal();

        openCart();

    }

});



const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });



document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener("click", () => {

            const category =
                card.dataset.category;


            currentCategory = category;


            document
                .querySelectorAll(".filter-btn")
                .forEach(button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter === category
                    );

                });


            renderProducts();


            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    });


document
    .getElementById("newsletterForm")
    .addEventListener("submit", event => {

        event.preventDefault();


        const emailInput =
            document.getElementById("emailInput");

        const message =
            document.getElementById(
                "newsletterMessage"
            );


        if (!emailInput.value.trim()) {

            return;

        }


        message.textContent =
            "Thanks for subscribing to Lumora!";

        message.style.color =
            "#b88a44";


        emailInput.value = "";

    });



document
    .getElementById("checkoutBtn")
    .addEventListener("click", () => {

        if (cart.length === 0) {

            showToast("Your cart is empty");

            return;

        }


        closeCart();
        openPaymentMethod();

    });

paymentMethodForm.addEventListener("submit", event => {

    event.preventDefault();

    const formData = new FormData(paymentMethodForm);
    const paymentMethod = formData.get("paymentMethod");

    if (typeof paymentMethod !== "string" || cart.length === 0) {

        return;

    }

    const orderItems = cart.map(item => {
        const product = products.find(product => product.id === item.id);

        if (!product) return null;

        return {
            name: product.name,
            price: product.price,
            quantity: item.quantity
        };
    }).filter(Boolean);

    const order = {
        items: orderItems,
        total: orderItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        ),
        paymentMethod,
        placedAt: new Date().toISOString()
    };

    localStorage.setItem("lumoraRecentOrder", JSON.stringify(order));
    cart = [];
    saveCart();
    updateCartUI();
    closePaymentMethod();
    showOrderSummary(order);

});




document
    .getElementById("wishlistBtn")
    .addEventListener("click", () => {

        if (wishlist.length === 0) {

            showToast("Your wishlist is empty");

            return;

        }


        currentSearch = "";


        currentCategory = "All";


        document
            .querySelectorAll(".filter-btn")
            .forEach(button => {

                button.classList.toggle(
                    "active",
                    button.dataset.filter === "All"
                );

            });


        const wishlistProducts =
            products.filter(product =>
                wishlist.includes(product.id)
            );


        if (wishlistProducts.length > 0) {

            productGrid.innerHTML =
                wishlistProducts.map(product => {

                    return `

                        <article
                            class="product-card"
                            data-id="${product.id}"
                        >

                            <div class="product-image">

                                <img
                                    src="${product.image}"
                                    alt="${product.name}"
                                >

                                <button
                                    class="wishlist-product active"
                                    data-wishlist="${product.id}"
                                >

                                    <i class="fa-solid fa-heart"></i>

                                </button>

                            </div>


                            <div class="product-info">

                                <p class="product-category">
                                    ${product.category}
                                </p>

                                <h3 class="product-name">
                                    ${product.name}
                                </h3>

                                <div class="product-rating">

                                    ${createStars(product.rating)}

                                </div>


                                <div class="product-bottom">

                                    <span class="product-price">
                                        ${formatPrice(product.price)}
                                    </span>

                                    <button
                                        class="add-cart-btn"
                                        data-cart="${product.id}"
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>

                        </article>

                    `;

                }).join("");


            noProducts.style.display = "none";


            document
                .getElementById("shop")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }

    });




renderProducts();

updateCartUI();

updateWishlistCount();