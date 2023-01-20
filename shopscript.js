let cart = [];

function addToCart(title, price) {
    cart.push({
        productTitle: title,
        productPrice: price,
        productQuantity: 1
    });

    renderCart();

    if(document.querySelector("#cart-view").classList.contains("hidden")) {
        console.log("test");
        document.querySelector("#cart-view").classList.remove("hidden");
    }
}

function deleteProduct(index) {
    document.querySelector("#cart-view ul li:nth-child(" + (index + 1) + ")").classList.add("hidden");
    setTimeout(() => {
        cart.splice(index, 1);
        renderCart();
    }, 500);
}

function renderCart() {
    let listHTML = '';
    let totalPrice = 0;

    cart.map((prod, index) => {
        totalPrice += prod.productPrice;
        return (listHTML += `<li>
            <span class="title">${prod.productTitle}</span>
            <span class="price">${prod.productPrice},-</span>
            <span class="quantity">${prod.productQuantity}x</span>
            <button class="delete" onclick="deleteProduct(${index})">X</button>
        </li>`);
    });

    document.querySelector("#cart-view > ul").innerHTML = listHTML;
    document.querySelector("#cart .label").innerHTML = cart.length;
    document.querySelector("#total").innerHTML = totalPrice;
}

function toggleCart() {
    document.getElementById("cart-view").classList.toggle("hidden");
}
