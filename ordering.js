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



/*

order-food-container

*/

// All Selectors
let quantity_selection = document.querySelectorAll(".quantity-selection");
let smalls = document.querySelectorAll(".small");
let mediums = document.querySelectorAll(".medium");
let larges = document.querySelectorAll(".large");
let xl_larges = document.querySelectorAll(".XL-Large");

let bucket_items = document.querySelectorAll("#bucket-items");

// smalls.forEach((small)=>{
//     small.addEventListener("click",()=>{
//         let samllItemSize = 12;
//         let price = small.children[0].innerText.slice(1);
//         let itemName = small.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText;
//         let itemdescription =small.parentElement.previousElementSibling.firstElementChild.lastElementChild.innerText;

//     })
// })


smalls.forEach((small)=>{
    small.addEventListener("click",()=>{
        small.classList.toggle("select");
    })
})

mediums.forEach((medium)=>{
    medium.addEventListener("click",()=>{
        medium.classList.toggle("select");
    })
})

larges.forEach((large)=>{
    large.addEventListener("click",()=>{
        large.classList.toggle("select");
    })
})

xl_larges.forEach((xl_large)=>{
    xl_large.addEventListener("click",()=>{
        xl_large.classList.toggle("select")
    })
})




