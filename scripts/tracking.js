let tracking = {};

if(JSON.parse(localStorage.getItem('tracking'))){
    tracking = JSON.parse(localStorage.getItem('tracking'));
}

const productInfo = products.find((product) => {
    return product.id === tracking.productId;
});

document.querySelector(".delivery-date").innerHTML = "Arriving on " + tracking.deliveryDate;
document.querySelector(".js-product-name").innerHTML = productInfo.name;
document.querySelector(".js-product-quantity").innerHTML = "Quantity: " + tracking.quantity;
document.querySelector(".js-product-photo").src = productInfo.image;

