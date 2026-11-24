const games = document.querySelector('#games')
const SUPABASE_API_URL = 'https://leyboxifijmwfjcqjukz.supabase.co/rest/v1/games'
const SUPABASE_ANON_KEY = 'sb_publishable_OqaR7Y8iJFURzTJGk0ODCg_6pBxrvSO'

const searchInput = document.querySelector('.input-field')

let products = []
let cart = []

loadCart()

function saveToCart(){
    localStorage.setItem('cart', JSON.stringify(cart))
}

function loadCart(){
    const data = localStorage.getItem('cart')
    if(data){
        cart = JSON.parse(data)
    } else{
        cart = []
    }
}



function addToCart(productId){
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem){
        cartItem.quantity += 1
    } else {
        const item = {productId: productId, quantity: 1};
        cart.push(item);
    }
    saveToCart();
}

function createProductCard(product){
    return `
    <div class="col">
  <div class="card">
    <img src="${product.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text"><small class="text-body-secondary">${product.price}₴</small></p>
      <a href="#" class="btn btn-primary" onclick="addToCart(${product.id})">
      <i class="bi bi-cart-plus"></i>
      В кошик!</a>
    </div>
  </div>
  </div>
    `

}

function renderProducts(products){
    if(games){
        games.innerHTML = ''
        products.forEach(product => {
        games.innerHTML +=  createProductCard(product)
    })
    }
}

function renderCart(){
    console.log("cart", cart)
    const cartContainer = document.querySelector("#cartItems");
    if(cartContainer){
        cartContainer.innerHTML = "";
        cart.forEach(cartItem => {
            const product = products.find(p => p.id === cartItem.productId)
            if (product){
                cartContainer.innerHTML += `
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${product.image}" class="img-fluid rounded-start" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">${product.price}$ x ${cartItem.quantity}</p>
                        </div>
                        </div>
                    </div>
                </div>
                `
            }
        })
    }

}

async function fetchGames() {
    try{
        const response = await fetch(SUPABASE_API_URL, {

            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        products = data || [];
        console.log('Завантажені товари:', products);
        renderProducts(products)
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGames().then(()=> renderCart());
});