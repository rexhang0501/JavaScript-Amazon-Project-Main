let cart = [];

if(JSON.parse(localStorage.getItem('cart'))){
    cart = JSON.parse(localStorage.getItem('cart'));
}

function countCart(){
    let cartTotal = 0;
    cart.forEach((item)=>{
        cartTotal = cartTotal + item.quantity;
    });
    return cartTotal;
}