import { dataBase } from './JavaScriptDataBase.js';

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
    let total = SubTotal - parseFloat(discounts.lastElementChild.innerText.slice(1)) + parseFloat(delivery_fee.lastElementChild.innerText);    
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
let quantity_selection = document.querySelector(".quantity-selection");
let small = document.querySelector(".small");
let medium = document.querySelector(".medium");
let large = document.querySelector(".large");
let xl_large = document.querySelector(".XL-Large");
let meal_deals_modal = document.querySelector(".meal-deals-modal");
let cancel_models = document.querySelectorAll(".cancel");
let meal_deals_modal_nextStep = document.querySelector("#meal-deals-modal-next-step");
let customize_pizza_modal =document.querySelector(".customize-pizza-modal");
let customizePizzaModalNextStep = document.querySelector("#customize-pizza-modal-next-step");
let addToBucketModal = document.querySelector(".add-to-bucket-modal");
let add_to_bucket_modal_conf_btn_back = document.querySelector("#add-to-bucket-modal-conf-btn-back");
let customize_pizza_modal_conf_btn_back = document.querySelector("#customize-pizza-modal-conf-btn-back");
let select_size_modal = document.querySelector(".select-size-modal");
let select_size_modal_next_step = document.querySelector("#select-size-modal-next-step");
let select_size_modal_conf_btn_back = document.querySelector("#select-size-modal-conf-btn-back");
let add_to_my_bucket_btns = document.querySelectorAll(".add-to-my-bucket-btn");

// Qunantity Set to input type number box
let inputBoxes = document.querySelectorAll(".items-quan input");

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
        }
        else if (inputBox.value == "") {
            inputBox.value = "1";
            visibleOnlyOne(inputBoxes);
        }
    })

    inputBox.addEventListener("keypress",(e)=>{
        if (e.key === "Enter") {
            if (parseInt(inputBox.value) > 1) {
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
        select_size_modal.classList.remove("select-size-modal-active");
    })
})


// Take from "meal deals modal" to "Customize Pizza" modal
meal_deals_modal_nextStep.addEventListener("click",()=>{
    let flag = false
    inputBoxes.forEach((inputBox)=>{
        if (inputBox.value == "" || inputBox.value == "0") {
            if (flag == false) {
                inputBox.style = "border: 3px solid #FC8A06;"
            }
        }
        else {
            // customize_pizza_modal.classList.add("customize-pizza-modal-active");
            select_size_modal.classList.add("select-size-modal-active");
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

select_size_modal_conf_btn_back.addEventListener("click",()=>{
    select_size_modal.classList.remove("select-size-modal-active");
    meal_deals_modal.classList.add("modal-active");
    visibleOnlyOne(inputBoxes);
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
    select_size_modal.classList.add("select-size-modal-active");
    customize_pizza_modal.classList.remove("customize-pizza-modal-active");
})

add_to_my_bucket_btns.forEach((add_to_my_bucket_btn)=>{
    add_to_my_bucket_btn.addEventListener("click",()=>{
        meal_deals_modal.classList.add("modal-active");
    })
})

// Modal 1.1
const selectSizeButtons = document.querySelectorAll(".quantity-selection div");
let selectedFlag = false;

function selectSizeButtonOnlyOne(selectSizeButtons) {
    
    selectSizeButtons.forEach((selectSizeButton)=>{
        if (selectSizeButton.className.includes("select")) {
            selectedFlag = true;
        }
        else if(selectSizeButton.className.includes("not-selected") == false && selectedFlag == true) {
            selectedFlag = false;
        }
    })
    console.log(selectedFlag);
}

function warningBorder(inputs) {
    inputs.forEach((input)=>{
        input.classList.add("warning-border");
    })    
}

function warningClear(inputs) {
    inputs.forEach((input)=>{
        input.classList.remove("warning-border");
    })
}

small.addEventListener("click",()=>{
    small.classList.toggle("select");
    medium.classList.toggle("not-selected"); 
    large.classList.toggle("not-selected");
    selectSizeButtonOnlyOne(selectSizeButtons);
})


medium.addEventListener("click",()=>{
    medium.classList.toggle("select");
    small.classList.toggle("not-selected");
    large.classList.toggle("not-selected");
    selectSizeButtonOnlyOne(selectSizeButtons);
})

large.addEventListener("click",()=>{
    large.classList.toggle("select");
    small.classList.toggle("not-selected");
    medium.classList.toggle("not-selected");
    selectSizeButtonOnlyOne(selectSizeButtons);
})


select_size_modal_next_step.addEventListener("click",()=>{
    
    if (selectedFlag == true) {
        warningClear(selectSizeButtons);
        select_size_modal.classList.remove("select-size-modal-active");
        customize_pizza_modal.classList.add("customize-pizza-modal-active");
    }
    else {
        console.log(selectedFlag);
        warningBorder(selectSizeButtons);
    }
})


// Add to Bucket

function getSelectedItem(inputBoxes) {
    let flag = false;
    let selectedItem = -1;
    inputBoxes.forEach((inputBox)=>{
        if (inputBox.value != "") {
            if (flag == false || inputBox.value != "0") {
                selectedItem = inputBox;
                flag = true;
            }
        }
    })
    return selectedItem;
}

function getSize() {
    let selectSizeButtons = document.querySelectorAll(".quantity-selection div");
    let flag = false;
    let size;
    selectSizeButtons.forEach((selectSizeButton)=>{
        if (selectSizeButton.className.includes("select")) {
            if (flag == false) {
                size = selectSizeButton;
                flag = true;
            }
        }
    })
    return size;
}


function getSelectedItemName(inputBoxes) {
    let itemName = getSelectedItem(inputBoxes);
    return itemName.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.innerHTML;
}

function getQuantity(inputBoxes) {
    let quan = getSelectedItem(inputBoxes);
    return quan.value;
}


function addItemToBucket() {

    let itemName = getSelectedItemName(inputBoxes);
    let itemQuantity = getQuantity(inputBoxes);
    
    let itemSize;
    let itemSizeClassName = getSize();
    if (itemSizeClassName.className.includes("small")) {
        itemSize = "small";
    }
    else if (itemSizeClassName.className.includes("medium")) {
        itemSize = "medium";
    }
    else {
        itemSize = "large";
    }

    const NonVeg = dataBase.pizza.nonVegPizza;
    const name = NonVeg[itemName].name;
    const price = NonVeg[itemName][itemSize].price;
    const size = NonVeg[itemName][itemSize].size;

    const itemElementHTML = `
    <div class="quantity"><h3>${itemQuantity}x</h3></div>
        <div class="checkout-items-info">
            <p class="item-price">£${price}</p>
            <p><b>${size}” ${name}</b></p>
            <p>No Mushrooms + green + peppers</p>
        </div>
        <div class="checkout-items-remove">
            <img class="remove-btn" src="/Food-Delivery-Website/Ordering-page/Remove (1).png" alt="">
        </div>
    `;

    const wrapper = document.createElement("div");
    wrapper.classList.add("checkout-items"); // optional wrapper class
    wrapper.innerHTML = itemElementHTML;

    // Append to a parent container
    document.querySelector("#bucket-items").appendChild(wrapper);

}

let add_to_bucket_modal_next_ADD = document.querySelector("#add-to-bucket-modal-next-ADD");

add_to_bucket_modal_next_ADD.addEventListener("click",()=>{
    addToBucketModal.classList.remove("add-to-bucket-modal-active");
    addItemToBucket();
})

