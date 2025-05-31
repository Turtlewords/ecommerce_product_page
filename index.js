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
const cartBtn = document.querySelector("#cart-container");
const cart = document.querySelector("#cart");
let cartContent = document.querySelector("#cart-content");
const deleteBtn = document.querySelector("#delete-btn");
const lightBox = document.querySelector("#lightbox");
const closeLightBoxBtn = document.querySelector("#close-lightbox");
const lightBoxImg = document.querySelector("#lightbox-img");
const lightBoxMain = document.querySelector("#lightbox-main");
const lightBoxMainContainer = document.querySelector("#lightbox-main-container");
const prevImgLightBtn = document.querySelector("#prev-img-light");
const nextImgLightBtn = document.querySelector("#next-img-light");

const thumbnails = document.querySelectorAll(".thumbnail");
const lightThumbnails = document.querySelectorAll(".light-thumbnail");


// Variables

let showPrice = 125;
let index = 0;
let quantity = 0;
let cartQuantity = 0;
let total = 0;
let thumbIndex = 0;
let lightThumbIndex = 0;
let lightboxShowing = false;

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

lightThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", changeLightboxMainImage)
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

lightThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
        for (let x of lightThumbnails) {
            x.style.outline = "none";
            x.style.opacity = "";
        }
        thumb.style.outline = "3px solid #FF7E1B"
        thumb.style.opacity = "0.7";
    })
})

// Mobile Controls

nextImgBtn.addEventListener("click", () => {
    loadNextImage(pictureFrame)
});
prevImgBtn.addEventListener("click", () => {
    loadPreviousImage(pictureFrame)
});

// Lightbox Controls

nextImgLightBtn.addEventListener("click", () => {
    loadNextImage(lightBoxMainContainer)
});
prevImgLightBtn.addEventListener("click", () => {
    loadPreviousImage(lightBoxMainContainer)
});

addToCartBtn.addEventListener("click", () => {
    addToCart();
})

cartBtn.addEventListener("click", showCart);

document.body.addEventListener("click", (e) => {
    if (e.target.id == "delete-btn") {
        deleteCartItems();
    }
})


desktopImg.addEventListener("click", () => {
    lightBox.style.display = "flex";
    lightboxShowing = true;
})

closeLightBoxBtn.addEventListener("click", () => {
    lightBox.style.display = "none";
    lightboxShowing = false;
})



// Functions

function loadFirstPicture() {
    pictureFrame.innerHTML += `
    <img class="product" src=${pictureArr[index]} alt="sneakers">`
}


function loadNextImage(el) {
    
    if (index < pictureArr.length - 1) {
        index++;
    } else {
        index = 0;
    }
    
    el.innerHTML = `
    <img class="${lightboxShowing ? "lightbox-main" : "product"}" src=${pictureArr[index]} alt="sneakers">`
}


function loadPreviousImage(el) {
    if (index > 0) {
        index--;
    } else {
        index = pictureArr.length - 1;
    }

    el.innerHTML = `
    <img class="${lightboxShowing ? "lightbox-main" : "product"}" src=${pictureArr[index]} alt="sneakers">`
}

function loadDesktopHero() {
    desktopImg.innerHTML = `
    <img class="desktop-main" src=${pictureArr[index]} alt="sneakers">`
}


function changeDesktopMainImage(e) {
    thumbIndex = e.target.dataset.val - 1;
    desktopImg.innerHTML = 
    `<img class="desktop-main" src='${pictureArr[e.target.dataset.val - 1]}' alt="sneakers">`
}

function changeLightboxMainImage(e) {
    lightThumbIndex = e.target.dataset.val - 1;
    lightBoxMainContainer.innerHTML = 
    `<img class="lightbox-main" src='${pictureArr[e.target.dataset.val - 1]}' alt="sneakers">`
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

function addToCart() {
    if (quantity == 0) {
        return;
    }
    
    cartQuantity += quantity;
    quantity = 0;

    quantityEl.textContent = quantity;
    cartQuantityEl.textContent = cartQuantity;

    if (cart.style.display != "none") {
        updateCart()
    }
}


function showCart() {
    if (cart.style.display == "block") {
        cart.style.display = "none";
    } else {
        if (cartQuantity == 0) {
        cart.style.display = "block";
    } else {
        cart.style.display = "block";
        cartContent.innerHTML = `
        <div class="non-empty-cart" aria-live="polite">
            <div class="cart-items">
                <img class="cart-product-img" src="${thumbArr[thumbIndex]}" alt="thumbnail of shoes">
                <div class="cart-info">
                    <span class="gray">Fall Limited Edition Sneakers</span>
                    <span id="cost-span" class="gray">$125 x ${cartQuantity} <span id="total-cost">$${cartQuantity * 125}</span>
                </div>
                <img id="delete-btn" src="images/icon-delete.svg" alt="delete icon">
            </div>
            <button id="checkout-btn">Checkout</button>
        </div>`
    }
    }

}

function updateCart() {
    cartContent.innerHTML = `
    <div class="non-empty-cart" aria-live="polite">
        <div class="cart-items">
            <img class="cart-product-img" src="${thumbArr[thumbIndex]}" alt="thumbnail of shoes">
            <div class="cart-info">
                <span class="gray">Fall Limited Edition Sneakers</span>
                <span id="cost-span" class="gray">$125 x ${cartQuantity} <span id="total-cost">$${cartQuantity * 125}</span>
            </div>
            <img id="delete-btn" src="images/icon-delete.svg" alt="delete icon">
        </div>
        <button id="checkout-btn">Checkout</button>
    </div>`
}

function deleteCartItems() {

    cartQuantity = 0;
    quantity = 0;
    quantityEl.textContent = 0;
    cartQuantityEl.textContent = "";
    cartContent.innerHTML = `
    <div class="empty-cart">
        <p>Your cart is empty</p>
    </div>`
}



