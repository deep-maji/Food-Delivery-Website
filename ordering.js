/*

order-food-container

*/

// All Selectors


/*
my-bucket
*/

// All selectors
let checkout_items_removes = document.querySelectorAll(".checkout-items-remove");
let item_prices = document.querySelectorAll(".item-price");
let sub_total = document.querySelector("#sub-total");
let payment_amount = document.querySelector("#payment-amount");
let discounts = document.querySelector("#discounts");
let delivery_fee = document.querySelector("#delivery-fee");

// All Functions
// Its calculate subtotal
function calSubTotalPrice() {
    let sum = 0;
    item_prices = document.querySelectorAll(".item-price");
    item_prices.forEach((item_price)=>{
        let quantity = parseInt(item_price.parentElement.parentElement.firstElementChild.innerText[0]);
        for (let i = 0; i < quantity; i++) {
            sum = sum + parseFloat(item_price.innerText.slice(1));
        }
    })
    return sum.toFixed(2);
}

// Its calculate total
function CalculateTotal() {
    let SubTotal = calSubTotalPrice();
    total = SubTotal - parseFloat(discounts.lastElementChild.innerText.slice(1)) + parseFloat(delivery_fee.lastElementChild.innerText);    
    return total;
}

// Its Show sub-total
function ShowSubTotal(SubTotal) {
    sub_total.lastElementChild.innerText = "";
    sub_total.lastElementChild.innerText = "£" + SubTotal;    
}

// Its Show total
function ShowTotal(total) {
    payment_amount.lastElementChild.innerText = "";
    payment_amount.lastElementChild.innerText = "£" + total;
}

// Calculate cart amount when page load
window.addEventListener("load",()=>{
    ShowSubTotal(calSubTotalPrice());
    ShowTotal(CalculateTotal());
})

// Delete Element
checkout_items_removes.forEach((checkout_items_remove)=>{
    checkout_items_remove.addEventListener("click",()=>{
        let delete_element = checkout_items_remove.parentElement;
        if (parseInt(delete_element.firstElementChild.innerText[0]) > 1) {
            let tempValue = parseInt(delete_element.firstElementChild.innerText[0]);
            tempValue--;            
            delete_element.firstElementChild.innerHTML = `<h3>${tempValue}x</h3>`; 
            console.log(delete_element.firstElementChild.innerHTML);
            ShowSubTotal(calSubTotalPrice());
            ShowTotal(CalculateTotal());
        }else {
            delete_element.remove();
            ShowSubTotal(calSubTotalPrice());
            ShowTotal(CalculateTotal());
        }        

    });
})
