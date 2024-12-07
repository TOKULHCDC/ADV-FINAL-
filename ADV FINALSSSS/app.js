let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
});
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Pizza',
        image: 'https://cdn.britannica.com/08/177308-050-94D9D6BE/Food-Pizza-Basil-Tomato.jpg', 
        price: 250
    },
    {
        id: 2,
        name: 'Salad',
        image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?cs=srgb&dl=appetizer-cucumber-cuisine-1059905.jpg&fm=jpg',
        price: 125
    },
    {
        id: 3,
        name: 'Soup',
        image: 'https://i1.wp.com/www.thegarlicdiaries.com/wp-content/uploads/2016/10/IMG_3309.jpg',
        price: 230
    },
    {
        id: 4,
        name: 'Salmon Salad',
        image: 'https://i2.wp.com/www.primaverakitchen.com/wp-content/uploads/2019/05/Easy-Salmon-Salad-Recipe-Primavera-Kitchen-1.jpg',
        price: 430
    },
    {
        id: 5,
        name: 'Chicken Wings',
        image: 'https://www.thespruceeats.com/thmb/y6gT4wgjN5E4l-LNRGM8mrrpHPs=/4602x3068/filters:fill(auto,1)/traditional-chicken-wings-912937-hero-01-6c1a003373a54538a732abc0005145d8.jpg',
        price: 135
    },
    {
        id: 6,
        name: 'Pulled Pork',
        image: 'https://tse4.mm.bing.net/th?id=OIP.VcBlKZhNdShcfM_yswHRVgHaLH&pid=Api&P=0&h=220',
        price: 200
    }
];

let listCards = [];

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        listCards = JSON.parse(savedCart);
        reloadCard(); 
    }
}

function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(listCards));
}

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="${value.image ? value.image : 'path/to/default/image.jpg'}" alt="${value.name}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Cart</button>`;
        list.appendChild(newDiv);
    });

    loadCartFromStorage(); 
}

initApp();

function addToCard(key) {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    } else {
        listCards[key].quantity++;  
    }
    reloadCard();
    saveCartToStorage(); 
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity; 
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="${value.image ? value.image : 'path/to/default/image.jpg'}" alt="${value.name}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
    saveCartToStorage();
}

function checkItNow() {
    if (listCards.length === 0 || listCards.every(item => item == null)) {
        alert("Your cart is empty. Please add items to your cart first!");
    } else {
       
        let completedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        
        completedOrders.push({
            date: new Date().toLocaleString(), 
            items: listCards.filter(item => item != null), 
        });

       
        localStorage.setItem('orders', JSON.stringify(completedOrders));

       
        alert("Your order is done!");
        listCards = [];
        reloadCard();
        saveCartToStorage();
    }
}
