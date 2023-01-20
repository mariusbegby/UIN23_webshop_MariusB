const products = [
    {
        prodid: 1,
        title: 'Dragon Zane',
        category: 'Ninjago',
        price: '89',
        storage: 5,
        imagefile: 'dragon_zane.webp'
    },
    {
        prodid: 2,
        title: "Lil'Ninja",
        category: 'Ninjago',
        price: '99',
        storage: 2,
        imagefile: 'lil_ninja.webp'
    },
    {
        prodid: 3,
        title: 'Master Wu',
        category: 'Ninjago',
        price: '109',
        storage: 3,
        imagefile: 'master_wu.webp'
    },
    {
        prodid: 4,
        title: 'Scuba Kai',
        category: 'Ninjago',
        price: '89',
        storage: 7,
        imagefile: 'scuba_kai.webp'
    },
    {
        prodid: 5,
        title: 'The Mechanic',
        category: 'Ninjago',
        price: '99',
        storage: 3,
        imagefile: 'the_mechanic.webp'
    },
    {
        prodid: 6,
        title: 'Vengestone Warrior',
        category: 'Ninjago',
        price: '89',
        storage: 4,
        imagefile: 'vengestone_warrior.webp'
    }
];

let cart = [];

function renderProducts() {
    let listHTML = '<h2>Ninjago</h2>';
    products.map((prod, index) => {
        if (prod.storage > 0) {
            return (listHTML += `<article class="product-card">
            <img src="images/PROD_${prod.imagefile}" alt="Produktbilde av ${prod.title}">
            <a href="ninjago.html">${prod.category}</a>
            <h3>${prod.title}</h3>
            <span class="price">Kr. ${prod.price},-</span>
            <section>
                <button onclick="addToCart(${prod.prodid})">Legg i handlekurv</button>
                <span class="stockAmount">Lager: ${prod.storage} stk.</span>
            </section>
            </article>`);
        } else {
            return (listHTML += `<article class="product-card">
            <img src="images/PROD_${prod.imagefile}" alt="Produktbilde av ${prod.title}">
            <a href="ninjago.html">${prod.category}</a>
            <h3>${prod.title}</h3>
            <span class="price">Kr. ${prod.price},-</span>
            <section>
                <button disabled>Legg i handlekurv</button>
                <span class="stockAmount">Lager: Ingen.</span>
            </section>
            </article>`);
        }
    });

    document.querySelector('main').innerHTML = listHTML;
}

function addToCart(prodid) {
    let product = products.find((e) => e.prodid === prodid);
    let productInCart = cart.find((e) => e.prodid === prodid);

    if (product.storage < 1) {
        return;
    }

    if (productInCart) {
        changeQuantityInCart(prodid, 1);
    } else {
        cart.push({
            prodid: product.prodid,
            title: product.title,
            price: product.price,
            quantity: 1
        });
        updateStorage(prodid, -1);
    }

    renderCart();
    renderProducts();

    if (document.querySelector('#cart-view').classList.contains('hidden')) {
        document.querySelector('#cart-view').classList.remove('hidden');
    }
}

function changeQuantityInCart(prodid, amount) {
    let productInCart = cart.find((e) => e.prodid === prodid);

    if(productInCart.quantity < 1) {
        return;
    }

    productInCart.quantity += amount;    
    updateStorage(prodid, -amount);

    if(productInCart.quantity < 1) {
        deleteProduct(prodid);
    }

    renderCart();
    renderProducts();
}

function deleteProduct(prodid) {
    let productInCart = cart.find((e) => e.prodid === prodid);

    document
        .querySelector('#cart-view ul li:nth-child(' + cart.findIndex((e) => e.prodid === prodid) + 1 + ')')
        .classList.add('hidden');
    setTimeout(() => {
        cart.splice(
            cart.findIndex((e) => e.prodid === prodid),
            1
        );
        renderCart();
    }, 500);

    updateStorage(prodid, productInCart.quantity);
    renderProducts();
}

function updateStorage(prodid, amount) {
    let product = products.find((e) => e.prodid === prodid);
    product.storage += amount;
}

function renderCart() {
    let listHTML = '';
    let totalPrice = 0;

    cart.map((prod) => {
        totalPrice += prod.price * prod.quantity;
        return (listHTML += `<li class="cart-product">
            <span class="title">${prod.title}</span>
            <span class="price">${prod.price},-</span>
            <button class="quantity-button" onclick="changeQuantityInCart(${prod.prodid}, -1)">-</button>
            <input type="text" value="${prod.quantity}">
            <button class="quantity-button" onclick="addToCart(${prod.prodid})">+</button>
            <button class="delete" onclick="deleteProduct(${prod.prodid})">X</button>
        </li>`);
    });

    document.querySelector('#cart-view > ul').innerHTML = listHTML;
    document.querySelector('#cart .label').innerHTML = cart.length;
    document.querySelector('#total').innerHTML = totalPrice;
}

function toggleCart() {
    document.getElementById('cart-view').classList.toggle('hidden');
}

renderProducts();
