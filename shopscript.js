let cart = [];

function addToCart(title, price) {
    cart.push({
        productTitle: title,
        productPrice: price,
        productQuantity: 1
    });

    renderCart();
}

function renderCart() {
    let listHTML = '';

    cart.map((prod) => {
        return (listHTML += `<li>
            <span class="title">${prod.productTitle}</span>
            <span class="price">${prod.productPrice},-</span>
            <span class="quantity">${prod.productQuantity}x</span>
            <button class="delete">X</button>
        </li>`);
    });

    document.querySelector("#cart-view > ul").innerHTML = listHTML;
    document.querySelector("#cart .label").innerHTML = cart.length;
}

function toggleCart() {
    document.getElementById("cart-view").classList.toggle("hidden");
}
