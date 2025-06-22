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

// Set selected as a (green color) to selected.
function setSelected(inputs) {
    inputs.forEach((input)=>{
        if (input.value != "") {
            input.style = "border: 3px solid green;"
            console.log(input.value);
        }
        
        if (input.value == "0") {
            input.style = "border: none;"
        }
    })    
}

function visibleOnlyOne(inputs) {
    inputs.forEach((input)=>{
        if (input.value == "" || input.value == "0") {
            let minusImgaeButton = input.previousElementSibling;
            let plusImageButton = input.nextElementSibling;
            input.style = "opacity: 0.5; pointer-events: none;"
            minusImgaeButton.style = "opacity: 0.5; pointer-events: none;"
            plusImageButton.style = "opacity: 0.5; pointer-events: none;"
        }
    })
}

function visibleAll(inputs) {
    inputs.forEach((input)=>{
        let minusImgaeButton = input.previousElementSibling;
            let plusImageButton = input.nextElementSibling;
            input.style = "opacity: 1; pointer-events: auto;"
            minusImgaeButton.style = "opacity: 1; pointer-events: auto;"
            plusImageButton.style = "opacity: 1; pointer-events: auto;"
    })
}

// All Selectors
let quantity_selection = document.querySelectorAll(".quantity-selection");
let smalls = document.querySelectorAll(".small");
let mediums = document.querySelectorAll(".medium");
let larges = document.querySelectorAll(".large");
let xl_larges = document.querySelectorAll(".XL-Large");
let meal_deals_modal = document.querySelector(".meal-deals-modal");
let cancel_models = document.querySelectorAll(".cancel");
let meal_deals_modal_nextStep = document.querySelector("#meal-deals-modal-next-step");
let customize_pizza_modal =document.querySelector(".customize-pizza-modal");
let customizePizzaModalNextStep = document.querySelector("#customize-pizza-modal-next-step");
let addToBucketModal = document.querySelector(".add-to-bucket-modal");
let add_to_bucket_modal_conf_btn_back = document.querySelector("#add-to-bucket-modal-conf-btn-back");
let customize_pizza_modal_conf_btn_back = document.querySelector("#customize-pizza-modal-conf-btn-back");

// Qunantity Set to input type number box
let inputBoxes = document.querySelectorAll(".items-quan input");
let emptyInputs = 0;

inputBoxes.forEach((inputBox)=>{
    let minusImgaeButton = inputBox.previousElementSibling;
    let plusImageButton = inputBox.nextElementSibling;
    minusImgaeButton.addEventListener("click",()=>{
        if (parseInt(inputBox.value) > 0){
            let tempqun = parseInt(inputBox.value);
            tempqun--;
            inputBox.value = `${tempqun}`;
        }

        if(inputBox.value == "0") {
            visibleAll(inputBoxes);
        }
        
    })
    plusImageButton.addEventListener("click",(e)=>{
        if(parseInt(inputBox.value) < 10) {
            let tempqun = parseInt(inputBox.value);
            tempqun++;
            inputBox.value = `${tempqun}`;
            visibleOnlyOne(inputBoxes);
        }
        else if (inputBox.value == "") {
            inputBox.value = "1";
            visibleOnlyOne(inputBoxes);
        }
        visibleOnlyOne(inputBoxes);
    })

    inputBox.addEventListener("keypress",(e)=>{
        if (e.key === "Enter") {
            if (parseInt(inputBox.value) > 10) {
                inputBox.value = "10";
            }
            else if (parseInt(inputBox.value) < 0) {
                inputBox.value = "";
            }
        }
    })

})


// Cancels the full flow. 
// This applies to all cancel buttons in the process.
cancel_models.forEach((cancel_model)=>{
    cancel_model.addEventListener("click",()=>{
    meal_deals_modal.classList.remove("modal-active");
    customize_pizza_modal.classList.remove("customize-pizza-modal-active");
    addToBucketModal.classList.remove("add-to-bucket-modal-active");
})
})


// Take from "meal deals modal" to "Customize Pizza" modal
meal_deals_modal_nextStep.addEventListener("click",()=>{
    let flag = false
    inputBoxes.forEach((inputBox)=>{
        if (inputBox.value == "" || inputBox.value == "0") {
            if (flag == false) {
                inputBox.style = "border: 3px solid red;"
            }
        }
        else {
            customize_pizza_modal.classList.add("customize-pizza-modal-active");
            meal_deals_modal.classList.remove("modal-active");
            inputBoxes.forEach((inputBox)=>{
                inputBox.style = "border: 0;"
            })
            flag = true;
        }
    })
    if (flag == true) {
        setSelected(inputBoxes);
    }
})

// This is the Add Toppings modal (also known as the "Customize Pizza" modal).
// After this, it navigates to the "Add to Bucket" modal.
// Then, it removes itself from the screen.
customizePizzaModalNextStep.addEventListener("click",()=>{
    addToBucketModal.classList.add("add-to-bucket-modal-active");
    customize_pizza_modal.classList.remove("customize-pizza-modal-active");
})

// Take back from "add to bucket Modal" to "Customize Pizza" modal
add_to_bucket_modal_conf_btn_back.addEventListener("click",()=>{
    addToBucketModal.classList.remove("add-to-bucket-modal-active");
    customize_pizza_modal.classList.add("customize-pizza-modal-active");
})

// Take back from "Customize Pizza" modal to "meal deals modal"
customize_pizza_modal_conf_btn_back.addEventListener("click",()=>{
    meal_deals_modal.classList.add("modal-active"); 
    customize_pizza_modal.classList.remove("customize-pizza-modal-active");
    visibleOnlyOne(inputBoxes);
})


smalls.forEach((small)=>{
    small.addEventListener("click",()=>{
        small.classList.toggle("select");
        meal_deals_modal.classList.add("modal-active");        
    })
})


mediums.forEach((medium)=>{
    medium.addEventListener("click",()=>{
        medium.classList.toggle("select");
        meal_deals_modal.classList.add("modal-active"); 
    })
})

larges.forEach((large)=>{
    large.addEventListener("click",()=>{
        large.classList.toggle("select");
        meal_deals_modal.classList.add("modal-active"); 
    })
})

xl_larges.forEach((xl_large)=>{
    xl_large.addEventListener("click",()=>{
        xl_large.classList.toggle("select");
        meal_deals_modal.classList.add("modal-active"); 
    })
})







// Add to Bucket

function addItemToBucket() {
    
}

let add_to_bucket_modal_next_ADD = document.querySelector("#add-to-bucket-modal-next-ADD");

add_to_bucket_modal_next_ADD.addEventListener("click",()=>{
    addToBucketModal.classList.remove("add-to-bucket-modal-active");

})







