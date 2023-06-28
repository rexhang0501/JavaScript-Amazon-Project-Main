const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday", "Sunday"];

function deliveryDate(deliveryDays) {
    const date = new Date();
    date.setDate(date.getDate() + deliveryDays);
    formattedDate = `${days[date.getDay()]}, ` + `${months[date.getMonth()]} ` + `${date.getDate()}`;
    return formattedDate;
}

const slowDelivery = deliveryDate(7);
const normalDelivery = deliveryDate(3);
const fastDelivery = deliveryDate(0);

let cartItemContainerHTML = "";

if(JSON.parse(localStorage.getItem('cart'))){
    cart = JSON.parse(localStorage.getItem('cart'));
}

cart.forEach((item)=>{
    const productInfo = products.find((product) => {
        return product.id === item.productId;
    });

    cartItemContainerHTML += `
        <div class="cart-item-container">
            <div class="delivery-date js-delivery-date-${item.productId}">
                
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                    src=${productInfo.image}>

                <div class="cart-item-details">
                    <div class="product-name">
                        ${productInfo.name}
                    </div>
                    <div class="product-price">
                        $${((productInfo.priceCents) / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                        <span>
                            Quantity: <span class="quantity-label">${item.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                            Update
                        </span>
                        <span class="delete-quantity-link link-primary">
                            Delete
                        </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>

                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-${item.productId}" data-product-id="${item.productId}" value="${slowDelivery}">
                        <div>
                            <div class="delivery-option-date">
                                ${slowDelivery}
                            </div>
                            <div class="delivery-option-price">
                                FREE Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input"
                            name="delivery-option-${item.productId}" data-product-id="${item.productId}" value="${normalDelivery}">
                        <div>
                            <div class="delivery-option-date">
                                ${normalDelivery}
                            </div>
                            <div class="delivery-option-price">
                                $4.99 - Shipping
                            </div>
                        </div>
                    </div>
                    <div class="delivery-option">
                        <input type="radio" class="delivery-option-input"
                            name="delivery-option-${item.productId}" data-product-id="${item.productId}" value="${fastDelivery}">
                        <div>
                            <div class="delivery-option-date">
                                ${fastDelivery}
                            </div>
                            <div class="delivery-option-price">
                                $9.99 - Shipping
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
});

document.querySelector(".order-summary").innerHTML = cartItemContainerHTML;
document.querySelector(".checkout-header-middle-section").innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cart.length} items</a>)`;

const radioButtons = document.querySelectorAll(".delivery-option-input");
radioButtons.forEach((button)=>{
    button.addEventListener("change", ()=>{
        const deliveryDate = document.querySelector(`.js-delivery-date-${button.dataset.productId}`);
        deliveryDate.innerHTML = "Delivery date: " + button.value;
    });

    if(button.checked === true){
        document.querySelector(`.js-delivery-date-${button.dataset.productId}`).innerHTML = "Delivery date: " + button.value;
    }
});




