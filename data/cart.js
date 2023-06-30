let cart = [];

function countCart(){
    let cartTotal = 0;
    cart.forEach((item)=>{
        cartTotal = cartTotal + item.quantity;
    });
    return cartTotal;
}