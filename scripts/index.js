let productsGridHTML = "";

products.forEach((product) => {
    productsGridHTML += `
        <div class="product-container">
        <div class="product-image-container">
        <img class="product-image"
            src=${product.image}>
        </div>

        <div class="product-name limit-text-to-2-lines">
            ${product.name}
        </div>

        <div class="product-rating-container">
        <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${product.rating.count}
        </div>
        </div>

        <div class="product-price">
            $${((product.priceCents) / 100).toFixed(2)}
        </div>

        <div class="product-quantity-container">
        <select class="quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
        </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart" id="added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
            Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
        </button>
    </div>
    `;
});

document.querySelector(".products-grid").innerHTML = productsGridHTML;

document.querySelector(".cart-quantity").innerText = countCart();

document.querySelectorAll(".add-to-cart-button")
    .forEach((button)=>{
        let myTimeOut;
        button.addEventListener("click",()=>{
            let matchingItem;
            const itemQuantity = document.querySelector(`.quantity-selector-${button.dataset.productId}`).value;

            cart.forEach((item)=>{
                if(item.productId === button.dataset.productId){
                    matchingItem = item;
                }
            });

            if(matchingItem){
                matchingItem.quantity = Number(matchingItem.quantity) + Number(itemQuantity);
            } else {
                cart.push({
                    productId: button.dataset.productId,
                    quantity: Number(itemQuantity),
                    deliveryDate: ""
                });
            }

            console.log(cart);
            document.querySelector(".cart-quantity").innerText = countCart();
            
            document.getElementById(`added-to-cart-${button.dataset.productId}`).classList.add("added-to-cart-after");

            if(myTimeOut){
                clearTimeout(myTimeOut);
            }

            myTimeOut = setTimeout(()=>{
                document.getElementById(`added-to-cart-${button.dataset.productId}`).classList.remove("added-to-cart-after");
            }, 1500);

            localStorage.setItem('cart', JSON.stringify(cart));
        });
});