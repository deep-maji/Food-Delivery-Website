// hem-Menu
let responsive_menu_nav_btn = document.querySelector(".responsive-menu-nav-links");
let hum_menu = document.querySelector(".off-screen-menu");

responsive_menu_nav_btn.addEventListener("click",()=>{
    hum_menu.classList.toggle("active");
})



