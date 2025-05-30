// Elements
const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const sideNav = document.querySelector("#sidenav");
const pictureFrame = document.querySelector("#picture-frame");
const nextImgBtn = document.querySelector("#next-img");
const prevImgBtn = document.querySelector("#prev-img");
const desktopImg = document.querySelector("#desktop-img");
const cartPlus = document.querySelector("#cart-plus");
const cartMinus = document.querySelector("#cart-minus");
const quantityEl = document.querySelector("#quantity");
const cartQuantityEl = document.querySelector("#cart-quantity");
const addToCartBtn = document.querySelector("#add-to-cart");

const thumbnails = document.querySelectorAll(".thumbnail");


// Variables

let index = 0;
let quantity = 0;
let cartQuantity = 0;

const pictureArr = ['images/image-product-1.jpg', 'images/image-product-2.jpg', 'images/image-product-3.jpg', 'images/image-product-4.jpg'];
const thumbArr = ['images/image-product-1-thumbnail.jpg', 'images/image-product-2-thumbnail.jpg', 'images/image-product-3-thumbnail.jpg', 'images/image-product-4-thumbnail.jpg'];

// Function Calls

loadFirstPicture();
loadDesktopHero();

// Event Listeners

openMenu.addEventListener("click", () =>{
    sideNav.classList.add("nav-active");
})

closeMenu.addEventListener("click", () => {
    sideNav.classList.remove("nav-active");
})


cartMinus.addEventListener("click", subtractQuantity);
cartPlus.addEventListener("click", addQuantity);

thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", changeDesktopMainImage)
})

thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        for (let x of thumbnails) {
            x.style.outline = "none";
            x.style.opacity = "";
        }
        thumb.style.outline = "3px solid #FF7E1B"
        thumb.style.opacity = "0.7";
    })
})


nextImgBtn.addEventListener("click", loadNextImage)
prevImgBtn.addEventListener("click", loadPreviousImage)


addToCartBtn.addEventListener("click", () => {
    addToCart();
})

// Functions

function loadFirstPicture() {
    pictureFrame.innerHTML += `
    <img class="product" src=${pictureArr[index]} alt="sneakers">`
}

function loadNextImage() {
    
    if (index < pictureArr.length - 1) {
        index++;
    } else {
        index = 0;
    }
    
    
    pictureFrame.innerHTML = `
    <img class="product" src=${pictureArr[index]} alt="sneakers">`
}

function loadPreviousImage() {
    if (index > 0) {
        index--;
    } else {
        index = pictureArr.length - 1;
    }

    pictureFrame.innerHTML = `
    <img class="product" src=${pictureArr[index]} alt="sneakers">`
}

function loadDesktopHero() {
    desktopImg.innerHTML = `
    <img class="desktop-main" src=${pictureArr[index]} alt="sneakers">`
}


function changeDesktopMainImage(e) {
    desktopImg.innerHTML = 
    `<img class="desktop-main" src='${pictureArr[e.target.dataset.val - 1]}' alt="sneakers">`
}

function addQuantity() {
  quantity++;
  quantityEl.textContent = quantity;
}

function subtractQuantity() {
    if (quantity > 0) {
        quantity--;
        quantityEl.textContent = quantity;
    } else {
        return;
    }
}


// Finish addToCart function

function addToCart() {
    if (quantity == 0) {
        return;
    }
    
    cartQuantity += quantity;
    quantity = 0;

    quantityEl.textContent = quantity;
    cartQuantityEl.textContent = cartQuantity;
}



function showCart() {
    if (cartQuantity == 0) {

    }
}


