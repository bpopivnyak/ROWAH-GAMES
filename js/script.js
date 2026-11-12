const games = document.querySelector('#games')
const SUPABASE_API_URL = 'https://leyboxifijmwfjcqjukz.supabase.co/rest/v1/games'
const SUPABASE_ANON_KEY = 'sb_publishable_OqaR7Y8iJFURzTJGk0ODCg_6pBxrvSO'

let products = []
let cart = []

function saveToCart(){
    localStorage.setItem(cart, JSON.stringify())
}

function loadCart(){
    
    if(saveToCart){

    }
}

function addToCart(productId){
    const cartItem = cart.find(item => item.find === productId);
    if (cartItem){
        cartItem.quantity += 1
    } else {
        const item = {productId: 1, quantity: 1};
        cart.push(item);
    }
    console.log('Поточний кошик:', cart);
}

function createProductCard(product){
    return `
  <div class="card">
    <img src="${product.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${product.name}</h5>
      <p class="card-text">${product.description}</p>
      <p class="card-text"><small class="text-body-secondary">${product.price}</small></p>
      <a href="#" class="btn btn-primary" onclick="addToCart(${product.id})">В кошик!</a>
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
    fetchGames().then(()=> ());
});