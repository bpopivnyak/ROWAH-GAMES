const cartContainer = document.querySelector('#cartItems')

function displayCart(){
    cartContainer.innerHTML = ''

    if (cart.length === 0){
        cartContainer.innerHTML = "Ваш кошик порожній!"
        return;
    }
}