let ordersGridHTML = "";

function renderOrdersGridHTML(){
    orders.forEach((order)=>{
        ordersGridHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${order.orderDate}</div>
                        </div>
                        <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${((order.orderTotal) / 100).toFixed(2)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.orderId}</div>
                    </div>
                </div>
                <div class="order-details-grid js-order-details-grid-${order.orderId}">

                </div>
            </div>
        `;
    });
    document.querySelector(".orders-grid").innerHTML = ordersGridHTML;

    orders.forEach((order)=>{
        let orderDetailsGridHTML = "";
        order.orderItem.forEach((orderItem)=>{
            const productInfo = products.find((product) => {
                return product.id === orderItem.productId;
            });

            orderDetailsGridHTML += `
                <div class="product-image-container">
                    <img src="${productInfo.image}">
                </div>
                <div class="product-details">
                    <div class="product-name">
                        ${productInfo.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${orderItem.deliveryDate}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${orderItem.quantity}
                    </div>
                </div>
                <div class="product-actions">
                    <a href="tracking.html">
                        <button class="track-package-button button-secondary" data-order-id=${order.orderId} data-order-id-product-id=${orderItem.productId}>
                            Track package
                        </button>
                    </a>
                </div>
            `;
        });
        document.querySelector(`.js-order-details-grid-${order.orderId}`).innerHTML = orderDetailsGridHTML;
    });

    document.querySelector(".cart-quantity").innerText = countCart();
}
renderOrdersGridHTML();

function trackPackageButton(){
    const trackingButtons = document.querySelectorAll(".track-package-button");
    trackingButtons.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const order = orders.find((order) => {
                return order.orderId === button.dataset.orderId;
            });

            const product = order.orderItem.find((orderItem)=>{
                return orderItem.productId === button.dataset.orderIdProductId;
            })
            localStorage.removeItem('tracking');
            localStorage.setItem('tracking', JSON.stringify(product));
        });
    });
}
trackPackageButton();